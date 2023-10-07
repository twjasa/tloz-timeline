// import React from "react";
import styles from "./timelinePath.module.scss";

interface TimelinePathProps {
  text: string;
  id: string;
  show: boolean;
}

export const TimelinePath = ({ text, id, show }: TimelinePathProps) => {
  return (
    <div id={id} className={styles.container} style={{ opacity: show ? 1 : 0 }}>
      <div className={styles.line} />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};
