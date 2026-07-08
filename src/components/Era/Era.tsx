// import React from "react";
import { TriangleCorner } from "../TriangleCorner/TriangleCorner";
import styles from "./era.module.scss";
import clsx from "clsx";

import { GRID_VERTICAL_SPACING } from "../../constants/variables";

/**
 * Props del componente Era.
 *
 * @property title - Nombre de la era o evento (ej. "The Legend of Zelda").
 * @property color - Esquema de color de la tarjeta: `"golden"` para juegos principales,
 *   `"silver"` para eventos históricos, `"zeldaColor"` para variantes especiales.
 * @property backgroundImage - Nombre base de la imagen PNG en `/public/` (sin extensión).
 *   También se usa como `id` del elemento DOM.
 * @property backgroundPosition - Desplazamiento opcional de la imagen de fondo dentro de la tarjeta.
 * @property show - Si `true`, la era se muestra visible (opacity 1); si `false`, permanece oculta
 *   hasta que una animación la revele.
 * @property position - Posición absoluta de la era dentro del canvas (`left`, `top`).
 * @property event - Número de evento (fila) opcional en el sistema de grid.
 */
interface EraProps {
  title: string;
  color: "golden" | "silver" | "zeldaColor";
  backgroundImage: string;
  backgroundPosition?: { left: string | number; top: string | number };
  show: boolean;
  position?: { left: number | string; top: number | string };
  event?: number;
}

/**
 * Componente que renderiza una "era" (evento o juego) en la timeline.
 *
 * Cada era es una tarjeta con bordes decorativos, esquinas triangulares estilo Zelda,
 * una imagen de fondo y un título. La visibilidad se controla a través de la prop `show`
 * y las animaciones de clip-path en `App.tsx`.
 */
export const Era = ({
  title,
  color,
  backgroundImage,
  backgroundPosition,
  show,
  position,
  event,
}: EraProps) => {
  const showDebugInfo = (window as any).DEBUG_MODE;
  const topVal =
    typeof position?.top === "number"
      ? position.top
      : typeof position?.top === "string"
        ? parseFloat(position.top)
        : 0;
  const estimatedEvent = Math.round(topVal / GRID_VERTICAL_SPACING);

  return (
    <div
      id={backgroundImage}
      className={clsx(styles.externalBorder1, styles[color])}
      style={{
        opacity: show ? 1 : 0,
        visibility: show ? "visible" : "hidden",
        ...position,
      }}
    >
      {showDebugInfo && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: "rgba(0, 0, 0, 0.85)",
            color: "#00ffcc",
            border: "1px solid #00ffcc",
            padding: "2px 6px",
            fontSize: "11px",
            borderRadius: "4px",
            zIndex: 100,
            fontFamily: "monospace",
            pointerEvents: "none",
          }}
        >
          {event !== undefined ? `E: ${event}` : `E (est): ${estimatedEvent}`}
        </div>
      )}
      {/* <div className={clsx(styles.externalBorder0)}> */}
      <div className={clsx(styles.eraContainer, styles[color])}>
        <TriangleCorner position={0} color={color} />
        <TriangleCorner position={1} color={color} />
        <TriangleCorner position={2} color={color} />
        <TriangleCorner position={3} color={color} />
        {/* <div className={styles.innerContainer}> */}
        <img
          src={backgroundImage + ".png"}
          className={styles.backgroundImgEra}
          style={backgroundPosition ?? {}}
        />
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
    // </div>
    // </div>
  );
};
