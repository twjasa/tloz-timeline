// import React from "react";
import styles from "./timelinePath.module.scss";

/**
 * Props del componente TimelinePath.
 *
 * @property text - Etiqueta de tiempo que aparece junto a la línea (ej. "7 years", "Centuries later").
 * @property id - Identificador único del elemento DOM, usado para animaciones de clip-path.
 * @property show - Si `true`, la conexión se muestra visible; si `false`, permanece oculta.
 * @property position - Posición absoluta dentro del canvas (`left`, `top`).
 * @property orientation - Orientación de la línea de conexión: `"vertical"` (por defecto) u `"horizontal"`.
 */
interface TimelinePathProps {
  text: string;
  id: string;
  show: boolean;
  position?: { left: number | string; top: number | string };
  orientation?: "horizontal" | "vertical";
  length?: number | string;
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
}: TimelinePathProps) => {
  const containerStyle = {
    opacity: show ? 1 : 0,
    ...position,
    ...(orientation === "horizontal" && length ? { width: length, justifyContent: "flex-start" } : {}),
    ...(orientation === "vertical" && length ? { height: length } : {}),
  };

  const lineStyle = {
    ...(orientation === "horizontal" && length ? { width: "100%", height: "var(--horizontal-line-thickness)" } : {}),
    ...(orientation === "vertical" && length ? { height: "100%", width: "var(--vertical-line-thickness)" } : {}),
  };

  return (
    <div
      id={id}
      className={styles.container}
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
