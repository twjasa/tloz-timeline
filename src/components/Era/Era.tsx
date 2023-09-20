// import React from "react";
import { TriangleCorner } from "../TriangleCorner/TriangleCorner";
import styles from "./era.module.scss";
import clsx from "clsx";
interface EraProps {
  title: string;
  color: "golden" | "silver" | "zeldaColor";
  backgroundImage: string;
  backgroundPosition?: { left: string | number; top: string | number };
}

export const Era = ({
  title,
  color,
  backgroundImage,
  backgroundPosition,
}: EraProps) => {
  return (
    <div className={clsx(styles.externalBorder1, styles[color])}>
      <div className={clsx(styles.externalBorder0)}>
        <div className={clsx(styles.eraContainer, styles[color])}>
          <TriangleCorner position={0} color={color} />
          <TriangleCorner position={1} color={color} />
          <TriangleCorner position={2} color={color} />
          <TriangleCorner position={3} color={color} />
          <div className={styles.innerContainer}>
            <img
              src={backgroundImage}
              className={styles.backgroundImgEra}
              style={backgroundPosition ?? {}}
            />
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
