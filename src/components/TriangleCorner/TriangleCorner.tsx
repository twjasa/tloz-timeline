import { useMemo } from "react";
import styles from "./triangleCorner.module.scss";

interface TriangleCornerProps {
  position: number;
}

export const TriangleCorner = ({ position }: TriangleCornerProps) => {
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
      <div className={styles.triangleContainer} style={injectStyle} />
      <div className={styles.emptyTriangle} style={injectStyle} />
      <div className={styles.line0} style={injectStyle} />
      <div className={styles.line1} style={injectStyle} />
      <div className={styles.line2} style={injectStyle} />
      <div className={styles.line3} style={injectStyle} />
    </div>
  );
};
