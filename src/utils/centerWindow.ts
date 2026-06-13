/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseTransformMatrix } from './transformUtils';

/**
 * Funciones de easing disponibles para las animaciones de centrado.
 * El parámetro `t` va de 0 a 1 y devuelve un valor interpolado.
 */
const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
};

type EasingName = keyof typeof easings;

/**
 * Centra y ajusta el zoom del canvas `<main>` para que todo su contenido sea visible.
 *
 * Calcula el bounding box de todos los hijos del contenedor (incluyendo
 * sus transformaciones CSS), determina la escala y posición óptimas para
 * enmarcar el contenido en la ventana, y anima suavemente la transición
 * usando `requestAnimationFrame` con easing personalizado.
 *
 * @param panzoomRef - Ref al objeto panzoom que controla el canvas.
 * @param duration - Duración de la animación en milisegundos. Por defecto `500`.
 * @param easingName - Nombre de la función de easing a usar. Por defecto `"easeInOutQuad"`.
 * @param padding - Padding en píxeles para cada borde `{ top, right, bottom, left }`.
 * @param signal - AbortSignal para cancelar la animación.
 * @param pendingMakeSpace - Datos de makeSpace pendiente para pre-calcular posiciones finales.
 * @returns Promesa que se resuelve cuando la animación termina.
 */
export const centerWindow = async (
  panzoomRef: any,
  duration: number = 500,
  easingName: EasingName = "easeInOutQuad",
  padding: { top: number; right: number; bottom: number; left: number } = { top: 0, right: 0, bottom: 0, left: 0 },
  signal?: AbortSignal,
  pendingMakeSpace?: { x: number; y: number; height?: number | string; ids: string[]; }[]
) => {
  const panzoomWindow = document.querySelector("main");
  if (!panzoomWindow || !panzoomRef.current) return;

  const children = Array.from(panzoomWindow.children) as HTMLElement[];
  if (children.length === 0) return;

  // Pre-calcular los offsets de makeSpace por ID para O(1) lookup
  const makeSpaceOffsets = new Map<string, { x: number; y: number }>();
  if (pendingMakeSpace) {
    for (const space of pendingMakeSpace) {
      for (const id of space.ids) {
        // Normalizar: quitar '#' si existe para comparar con el id del DOM
        const cleanId = id.startsWith('#') ? id.slice(1) : id;
        makeSpaceOffsets.set(cleanId, { x: space.x, y: space.y });
      }
    }
  }

  let minLeft = Infinity,
    minTop = Infinity,
    maxRight = -Infinity,
    maxBottom = -Infinity;

  for (const child of children) {
    // Get the base position using offsetLeft/offsetTop
    const baseLeft = child.offsetLeft + panzoomWindow.scrollLeft;
    const baseTop = child.offsetTop + panzoomWindow.scrollTop;

    // Get computed styles to extract transform values
    const computedStyle = window.getComputedStyle(child);
    const transform = computedStyle.transform;
    const { translateX, translateY, scale } = parseTransformMatrix(transform);

    // Si hay un offset de makeSpace pendiente, anime.js REEMPLAZARÁ el transform actual
    // con este nuevo valor (no se suman).
    const msOffset = makeSpaceOffsets.get(child.id);
    const finalTranslateX = msOffset ? msOffset.x : translateX;
    const finalTranslateY = msOffset ? msOffset.y : translateY;

    // Apply transform to the base position
    const left = baseLeft + finalTranslateX;
    const top = baseTop + finalTranslateY;
    const right = left + (child.offsetWidth * scale);
    const bottom = top + (child.offsetHeight * scale);

    minLeft = Math.min(minLeft, left);
    minTop = Math.min(minTop, top);
    maxRight = Math.max(maxRight, right);
    maxBottom = Math.max(maxBottom, bottom);
  }

  const contentWidth = maxRight - minLeft;
  const contentHeight = maxBottom - minTop;

  const containerWidth = panzoomWindow.clientWidth;
  const containerHeight = panzoomWindow.clientHeight;

  const targetScale = Math.min(
    (containerWidth - padding.left - padding.right) / contentWidth,
    (containerHeight - padding.top - padding.bottom) / contentHeight
  );

  const contentCenterX = minLeft + contentWidth / 2;
  const contentCenterY = minTop + contentHeight / 2;

  const viewportCenterX = padding.left + (containerWidth - padding.left - padding.right) / 2;
  const viewportCenterY = padding.top + (containerHeight - padding.top - padding.bottom) / 2;

  const targetX = viewportCenterX - contentCenterX * targetScale;
  const targetY = viewportCenterY - contentCenterY * targetScale;

  const panzoom = panzoomRef.current;
  const transform = panzoom.getTransform();

  const startScale = transform.scale;
  const startX = transform.x;
  const startY = transform.y;

  const easingFn = easings[easingName] || easings.linear;
  const startTime = performance.now();

  return new Promise<void>((resolve) => {
    let cancelled = false;

    const jumpToEnd = () => {
      cancelled = true;
      panzoom.zoomAbs(0, 0, targetScale);
      panzoom.moveTo(targetX, targetY);
      resolve();
    };

    if (signal) {
      if (signal.aborted) {
        jumpToEnd();
        return;
      }
      signal.addEventListener('abort', jumpToEnd, { once: true });
    }

    function animate(currentTime: number) {
      if (cancelled) return;

      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easingFn(t);

      const currentScale = startScale + (targetScale - startScale) * easedT;
      const currentX = startX + (targetX - startX) * easedT;
      const currentY = startY + (targetY - startY) * easedT;

      panzoom.zoomAbs(0, 0, currentScale);
      panzoom.moveTo(currentX, currentY);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        if (signal) signal.removeEventListener('abort', jumpToEnd);
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
};
