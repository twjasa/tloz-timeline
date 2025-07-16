/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseTransformMatrix } from './transformUtils';

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
type PaddingValue = number | `${number}%`;

export const centerWindow = async (
  panzoomRef: any,
  duration: number = 500,
  easingName: EasingName = "easeInOutQuad",
  paddingBottom: PaddingValue = 0,
  paddingTop: PaddingValue = 0
) => {
  const panzoomWindow = document.querySelector("main");
  if (!panzoomWindow || !panzoomRef.current) return;

  const children = Array.from(panzoomWindow.children) as HTMLElement[];
  if (children.length === 0) return;

  // Calcular padding en píxeles (sea número o porcentaje)
  let paddingBottomPx = 0;
  if (typeof paddingBottom === "string" && paddingBottom.endsWith("%")) {
    const percent = parseFloat(paddingBottom);
    paddingBottomPx = (panzoomWindow.clientHeight * percent) / 100;
  } else if (typeof paddingBottom === "number") {
    paddingBottomPx = paddingBottom;
  }

  let paddingTopPx = 0;
  if (typeof paddingTop === "string" && paddingTop.endsWith("%")) {
    const percent = parseFloat(paddingTop);
    paddingTopPx = (panzoomWindow.clientHeight * percent) / 100;
  } else if (typeof paddingTop === "number") {
    paddingTopPx = paddingTop;
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

    // Apply transform to the base position
    const left = baseLeft + translateX;
    const top = baseTop + translateY;
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
    containerWidth / contentWidth,
    (containerHeight - paddingBottomPx - paddingTopPx) / contentHeight
  );

  const contentCenterX = minLeft + contentWidth / 2;
  const contentCenterY = minTop + contentHeight / 2;

  const viewportCenterX = containerWidth / 2;
  const viewportCenterY = paddingTopPx + (containerHeight - paddingBottomPx - paddingTopPx) / 2;

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
    function animate(currentTime: number) {
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
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
};
