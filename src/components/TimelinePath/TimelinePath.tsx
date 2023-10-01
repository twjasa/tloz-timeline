// import React from "react";
import styles from "./timelinePath.module.scss";

interface TimelinePathProps {
  text: string;
  id: string;
}

export const TimelinePath = ({ text, id }: TimelinePathProps) => {
  return (
    <div id={id} className={styles.container}>
      <div className={styles.line} />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};
