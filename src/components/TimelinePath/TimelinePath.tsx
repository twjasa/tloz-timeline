// import React from "react";
import styles from "./timelinePath.module.scss";

interface TimelinePathProps {
  text: string;
}

export const TimelinePath = ({ text }: TimelinePathProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.line} />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};
