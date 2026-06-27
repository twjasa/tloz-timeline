import { useLayoutEffect, useState, useRef } from "react";
import styles from "./timelinePath.module.scss";
import clsx from "clsx";
import { parseTransformMatrix } from "../../utils/transformUtils";
import { CONNECTION_OFFSET_X, CONNECTION_OFFSET_Y } from "../../constants/variables";

/**
 * Props del componente TimelinePath.
 *
 * @property text - Etiqueta de tiempo que aparece junto a la línea (ej. "7 years", "Centuries later").
 * @property id - Identificador único del elemento DOM, usado para animaciones de clip-path.
 * @property show - Si `true`, la conexión se muestra visible; si `false`, permanece oculta.
 * @property position - Posición absoluta dentro del canvas (`left`, `top`).
 * @property orientation - Orientación de la línea de conexión: `"vertical"` (por defecto) u `"horizontal"`.
 * @property length - Longitud de la línea (ancho o alto según orientación).
 * @property from - ID de la Era de origen.
 * @property to - ID de la Era de destino.
 */
interface TimelinePathProps {
  text: string;
  id: string;
  show: boolean;
  position?: { left: number | string; top: number | string };
  orientation?: "horizontal" | "vertical";
  length?: number | string;
  from?: string;
  to?: string;
}

/**
 * Componente que renderiza una línea de conexión entre eras en la timeline.
 *
 * Dibuja una línea vertical u horizontal con una etiqueta de texto que indica
 * la relación temporal entre dos eventos/juegos (ej. "Centuries later", "7 years").
 */
export const TimelinePath = ({
  text,
  id,
  show,
  position,
  orientation = "vertical",
  length,
  from,
  to,
}: TimelinePathProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [styleOverride, setStyleOverride] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (!from || !to) return;

    let observer: MutationObserver | null = null;
    let rafId: number | null = null;
    let retryCount = 0;
    const maxRetries = 50; // retry for up to ~800ms

    const getVisualPosition = (el: HTMLElement) => {
      const baseTop = el.offsetTop;
      const baseLeft = el.offsetLeft;
      const transform = el.style.transform || window.getComputedStyle(el).transform;
      const parsed = parseTransformMatrix(transform);
      return {
        top: baseTop + parsed.translateY,
        left: baseLeft + parsed.translateX,
        width: el.offsetWidth,
        height: el.offsetHeight,
        transform: el.style.transform || transform,
      };
    };

    const lastValues = { top: 0, height: 0, left: 0, width: 0, transform: "" };

    const updateLayout = (fromEl: HTMLElement, toEl: HTMLElement) => {
      const fromPos = getVisualPosition(fromEl);
      const toPos = getVisualPosition(toEl);

      if (orientation === "vertical") {
        const baseTop = fromEl.offsetTop + fromEl.offsetHeight;
        const baseLeft = fromEl.offsetLeft + fromEl.offsetWidth / 2 - 200 + CONNECTION_OFFSET_X;
        
        const visualTop = fromPos.top + fromPos.height;
        const visualHeight = toPos.top - visualTop;


        if (
          Math.abs(lastValues.top - baseTop) > 0.1 ||
          Math.abs(lastValues.height - visualHeight) > 0.1 ||
          Math.abs(lastValues.left - baseLeft) > 0.1 ||
          lastValues.transform !== fromPos.transform
        ) {
          lastValues.top = baseTop;
          lastValues.height = visualHeight;
          lastValues.left = baseLeft;
          lastValues.transform = fromPos.transform;

          setStyleOverride({
            position: "absolute",
            top: baseTop,
            left: baseLeft,
            height: visualHeight,
            transform: fromPos.transform,
          });
        }
      } else {
        const baseLeft = fromEl.offsetLeft + fromEl.offsetWidth;
        const baseTop = fromEl.offsetTop + fromEl.offsetHeight / 2 + CONNECTION_OFFSET_Y;
        
        const visualLeft = fromPos.left + fromPos.width;
        const visualWidth = toPos.left - visualLeft;


        if (
          Math.abs(lastValues.left - baseLeft) > 0.1 ||
          Math.abs(lastValues.width - visualWidth) > 0.1 ||
          Math.abs(lastValues.top - baseTop) > 0.1 ||
          lastValues.transform !== fromPos.transform
        ) {
          lastValues.left = baseLeft;
          lastValues.width = visualWidth;
          lastValues.top = baseTop;
          lastValues.transform = fromPos.transform;

          setStyleOverride({
            position: "absolute",
            left: baseLeft,
            top: baseTop,
            width: visualWidth,
            transform: fromPos.transform,
          });
        }
      }
    };

    const trySetup = () => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);

      if (!fromEl || !toEl) {
        if (retryCount < maxRetries) {
          retryCount++;
          rafId = requestAnimationFrame(trySetup);
        }
        return;
      }

      updateLayout(fromEl, toEl);

      observer = new MutationObserver(() => {
        updateLayout(fromEl, toEl);
      });

      observer.observe(fromEl, { attributes: true, attributeFilter: ["style", "class"] });
      observer.observe(toEl, { attributes: true, attributeFilter: ["style", "class"] });

      const handleResize = () => updateLayout(fromEl, toEl);
      window.addEventListener("resize", handleResize);

      (trySetup as any).cleanupResize = () => {
        window.removeEventListener("resize", handleResize);
      };
    };

    trySetup();

    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if ((trySetup as any).cleanupResize) {
        (trySetup as any).cleanupResize();
      }
    };
  }, [from, to, orientation]);

  const containerStyle = {
    opacity: show ? 1 : 0,
    visibility: (show ? "visible" : "hidden") as "visible" | "hidden",
    ...position,
    ...styleOverride,
    ...(orientation === "horizontal" && length && !from ? { width: length, justifyContent: "flex-start" } : {}),
    ...(orientation === "vertical" && length && !from ? { height: length } : {}),
  };

  const lineStyle = {
    ...(orientation === "horizontal" && (length || from) ? { width: "100%", height: "var(--horizontal-line-thickness)" } : {}),
    ...(orientation === "vertical" && (length || from) ? { height: "100%", width: "var(--vertical-line-thickness)" } : {}),
  };

  return (
    <div
      ref={containerRef}
      id={id}
      className={clsx(styles.container, styles[orientation])}
      style={containerStyle}
    >
      <div
        className={
          orientation === "horizontal"
            ? styles.horizontalLine
            : styles.verticalLine
        }
        style={lineStyle}
      />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};

