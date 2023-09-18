// import React from "react";
import { TriangleCorner } from "../TriangleCorner/TriangleCorner";
import styles from "./era.module.scss";

export const Era = ({ title }: { title: string }) => {
  return (
    <div className={styles.externalBorder1}>
      <div className={styles.externalBorder0}>
        <div className={styles.eraContainer}>
          <TriangleCorner position={0} />
          <TriangleCorner position={1} />
          <TriangleCorner position={2} />
          <TriangleCorner position={3} />
          <div className={styles.innerContainer}>
            <img src="link_impa.png" className={styles.backgroundImgEra} />
            {/* <div className="mask3" /> */}
            {/* <div className="mask4" /> */}
            <h1 className={styles.title}>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
