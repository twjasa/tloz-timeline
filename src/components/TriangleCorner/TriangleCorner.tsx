import { useMemo } from "react";
import styles from "./triangleCorner.module.scss";
import clsx from "clsx";

interface TriangleCornerProps {
  position: number;
  color: "golden" | "silver" | "zeldaColor";
}

export const TriangleCorner = ({ position, color }: TriangleCornerProps) => {
  const injectStyle = useMemo(() => {
    const borderSize = styles.boderSize;
    const offset = parseInt(borderSize) * -3;
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
      <div
        className={clsx(styles.line0, "noiseBackground")}
        style={injectStyle}
      />
      <div className={clsx(styles.line1, styles[color])} style={injectStyle} />
      <div
        className={clsx(styles.line2, "noiseBackground")}
        style={injectStyle}
      />
      <div className={clsx(styles.line3, styles[color])} style={injectStyle} />
    </div>
  );
};
