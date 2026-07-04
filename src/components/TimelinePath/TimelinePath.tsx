import { useLayoutEffect, useState, useRef } from "react";
import styles from "./timelinePath.module.scss";
import clsx from "clsx";
import { parseTransformMatrix } from "../../utils/transformUtils";
import {
  CONNECTION_OFFSET_X,
  CONNECTION_OFFSET_Y,
  GRID_VERTICAL_SPACING,
} from "../../constants/variables";

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
  id?: string;
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
  const connectionId = id || (from && to ? `${from}_${to}` : undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [styleOverride, setStyleOverride] = useState<React.CSSProperties>({});
  const [bentData, setBentData] = useState<{
    isBent: boolean;
    pathD?: string;
    textX?: number;
    textY?: number;
    isFromUpper?: boolean;
  }>({ isBent: false });

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

    const lastValues = { top: 0, height: 0, left: 0, width: 0, transform: "", isBent: false };

    const updateLayout = (fromEl: HTMLElement, toEl: HTMLElement) => {
      const fromPos = getVisualPosition(fromEl);
      const toPos = getVisualPosition(toEl);

      const isBent = Math.abs(fromPos.left - toPos.left) > 100;

      if (isBent) {
        const isFromUpper = fromPos.top < toPos.top;

        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        let midX = 0;
        let midY1 = 0;

        if (isFromUpper) {
          // Case A: Forward in time (timeline flows top-to-bottom)
          // Starts at bottom center of fromEl
          startX = fromPos.left + fromPos.width / 2 - 200 + CONNECTION_OFFSET_X;
          startY = fromPos.top + fromPos.height;

          // Ends at top center of toEl
          endX = toPos.left + toPos.width / 2 - 200 + CONNECTION_OFFSET_X;
          endY = toPos.top;

          // midX matches destination X to keep bounding box and alignment consistent
          midX = endX;

          // midY1 goes down by half the gap under the upper element (fromEl)
          const cardHeight = fromPos.height || 142;
          const gap = GRID_VERTICAL_SPACING - cardHeight;
          midY1 = startY + gap / 2;
        } else {
          // Case B: Backward in time (timeline flows bottom-to-top/time travel)
          // Starts at side of fromEl facing the gap
          startY = fromPos.top + fromPos.height / 2;
          if (fromPos.left < toPos.left) {
            startX = fromPos.left + fromPos.width;
            midX = (fromPos.left + fromPos.width + toPos.left) / 2;
          } else {
            startX = fromPos.left;
            midX = (toPos.left + toPos.width + fromPos.left) / 2;
          }

          // Ends at top center of toEl
          endX = toPos.left + toPos.width / 2 - 200 + CONNECTION_OFFSET_X;
          endY = toPos.top;

          // midY1 goes up by half the gap above the upper element (toEl)
          const cardHeight = toPos.height || 142;
          const gap = GRID_VERTICAL_SPACING - cardHeight;
          midY1 = endY - gap / 2;
        }

        const minX = Math.min(startX, midX, endX) - 2;
        const maxX = Math.max(startX, midX, endX) + 2;
        const minY = Math.min(startY, midY1, endY) - 2;
        const maxY = Math.max(startY, midY1, endY) + 2;

        const width = maxX - minX;
        const height = maxY - minY;

        if (
          !lastValues.isBent ||
          Math.abs(lastValues.left - minX) > 0.1 ||
          Math.abs(lastValues.top - minY) > 0.1 ||
          Math.abs(lastValues.width - width) > 0.1 ||
          Math.abs(lastValues.height - height) > 0.1
        ) {
          lastValues.isBent = true;
          lastValues.left = minX;
          lastValues.top = minY;
          lastValues.width = width;
          lastValues.height = height;
          lastValues.transform = "";

          const localStartX = startX - minX;
          const localStartY = startY - minY;
          const localMidY1 = midY1 - minY;
          const localMidX = midX - minX;
          const localEndX = endX - minX;
          const localEndY = endY - minY;

          let pathD = "";
          if (isFromUpper) {
            pathD = `M ${localStartX} ${localStartY} L ${localStartX} ${localMidY1} L ${localEndX} ${localMidY1} L ${localEndX} ${localEndY}`;
          } else {
            pathD = `M ${localStartX} ${localStartY} L ${localMidX} ${localStartY} L ${localMidX} ${localMidY1} L ${localEndX} ${localMidY1} L ${localEndX} ${localEndY}`;
          }

          const textX = isFromUpper
            ? (localStartX + localEndX) / 2
            : localMidX + 20;
          const textY = isFromUpper
            ? localMidY1 - 20
            : (localStartY + localMidY1) / 2;

          setBentData({
            isBent: true,
            pathD,
            textX,
            textY,
            isFromUpper,
          });

          setStyleOverride({
            position: "absolute",
            left: minX,
            top: minY,
            width,
            height,
            transform: "",
          });
        }
      } else {
        if (lastValues.isBent) {
          lastValues.isBent = false;
          lastValues.left = 0;
          lastValues.top = 0;
          lastValues.width = 0;
          lastValues.height = 0;
          lastValues.transform = "";
          setBentData({ isBent: false });
        }

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

  if (bentData.isBent) {
    return (
      <div
        ref={containerRef}
        id={connectionId}
        className={clsx(styles.container, styles.vertical)}
        style={containerStyle}
      >
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
          }}
        >
          <path
            d={bentData.pathD}
            fill="none"
            stroke="var(--vertical-line-color)"
            strokeWidth="var(--vertical-line-thickness)"
          />
        </svg>
        {text && (
          <h1
            className={styles.text}
            style={{
              position: "absolute",
              left: bentData.textX,
              top: bentData.textY,
              transform: bentData.isFromUpper ? "translate(-50%, -50%)" : "translateY(-50%)",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {text}
          </h1>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={connectionId}
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

