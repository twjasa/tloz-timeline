// import React from "react";
import styles from "./era.module.css";

export const Era = ({ title }: { title: string }) => {
  return (
    <div className={styles.externalBorder1}>
      <div className={styles.externalBorder0}>
        <div className={styles.eraContainer}>
          <div className={styles.triangleContainer} />
          <div className={styles.emptyTriangle} />
          <div className={styles.line0} />
          <div className={styles.line1} />
          <div className={styles.line2} />
          <div className={styles.line3} />
          <div className={styles.innerContainer} style={{ overflow: "hidden" }}>
            <img
              src="/src/assets/link_impa.png"
              className={styles.backgroundImgEra}
            />
            {/* <div className="mask3" /> */}
            {/* <div className="mask4" /> */}
            <h1 className="title">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
