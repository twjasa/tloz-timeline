// import React from "react";
import styles from "./triangleCornerStyle.module.scss";

interface TriangleCornerProps {
  position: number;
}

export const TriangleCorner = ({ position }: TriangleCornerProps) => {
  return (
    <>
      <div className={styles.triangleContainer} />
      <div className={styles.emptyTriangle} />
      <div className={styles.line0} />
      <div className={styles.line1} />
      <div className={styles.line2} />
      <div className={styles.line3} />
    </>
  );
};
