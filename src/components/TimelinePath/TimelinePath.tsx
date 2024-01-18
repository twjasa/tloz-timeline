// import React from "react";
import styles from './timelinePath.module.scss';

interface TimelinePathProps {
  text: string;
  id: string;
  show: boolean;
  position?: { left: number | string; top: number | string };
}

export const TimelinePath = ({
  text,
  id,
  show,
  position,
}: TimelinePathProps) => {
  return (
    <div
      id={id}
      className={styles.container}
      style={{ opacity: show ? 1 : 0, ...position }}
    >
      <div className={styles.line} />
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
};
