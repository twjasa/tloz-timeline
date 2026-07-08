import { useMemo } from "react";
import styles from "./triangleCorner.module.scss";
import clsx from "clsx";

/**
 * Props del componente TriangleCorner.
 *
 * @property position - Esquina del borde donde se coloca el triángulo:
 *   `0` = superior-izquierda, `1` = superior-derecha,
 *   `2` = inferior-derecha, `3` = inferior-izquierda.
 * @property color - Esquema de color que debe coincidir con el de la era padre.
 */
interface TriangleCornerProps {
  position: number;
  color: "golden" | "silver" | "zeldaColor";
}

/**
 * Componente decorativo que renderiza una esquina triangular estilo Zelda.
 *
 * Se coloca en las cuatro esquinas de cada tarjeta de era. El triángulo se rota
 * según la `position` (0°, 90°, 180°, 270°) y se compone de múltiples capas
 * (triángulo sólido, triángulo vacío, y líneas decorativas) para crear el efecto
 * ornamental inspirado en la estética de la saga.
 */
export const TriangleCorner = ({ position, color }: TriangleCornerProps) => {
  const injectStyle = useMemo(() => {
    const borderSize = styles.borderSize;
    // const offset = parseInt(borderSize) * -3;
    const offset = `-${parseInt(borderSize) - 1}px`;
    if (position === 0) {
      return {
        left: offset,
        top: offset,
        transform: "rotate(0deg)",
      };
    }
    if (position === 1) {
      return {
        right: offset,
        top: offset,
        transform: "rotate(90deg)",
      };
    }
    if (position === 2) {
      return {
        right: offset,
        bottom: offset,
        transform: "rotate(180deg)",
      };
    }
    if (position === 3) {
      return {
        left: offset,
        bottom: offset,
        transform: "rotate(270deg)",
      };
    }
  }, [position]);
  return (
    <div id={`triangle-${position}`}>
      <div
        className={clsx(styles.triangleContainer, styles[color])}
        style={injectStyle}
      />
      <div
        className={clsx(styles.emptyTriangle, "noiseBackground")}
        style={injectStyle}
      />
      {/* <div
        className={clsx(styles.line0, "noiseBackground")}
        style={injectStyle}
      /> */}
      {/* <div className={clsx(styles.line1, styles[color])} style={injectStyle} /> */}
      {/* <div
        className={clsx(styles.line2, "noiseBackground")}
        style={injectStyle}
      /> */}
      {/* <div className={clsx(styles.line3, styles[color])} style={injectStyle} /> */}
    </div>
  );
};
