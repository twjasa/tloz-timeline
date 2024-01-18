// import React from "react";
import { TriangleCorner } from '../TriangleCorner/TriangleCorner';
import styles from './era.module.scss';
import clsx from 'clsx';
interface EraProps {
  title: string;
  color: 'golden' | 'silver' | 'zeldaColor';
  backgroundImage: string;
  backgroundPosition?: { left: string | number; top: string | number };
  show: boolean;
  position?: { left: number | string; top: number | string };
}

export const Era = ({
  title,
  color,
  backgroundImage,
  backgroundPosition,
  show,
  position,
}: EraProps) => {
  return (
    <div
      id={backgroundImage}
      className={clsx(styles.externalBorder1, styles[color])}
      style={{ opacity: show ? 1 : 0, ...position }}
    >
      <div className={clsx(styles.externalBorder0)}>
        <div className={clsx(styles.eraContainer, styles[color])}>
          <TriangleCorner position={0} color={color} />
          <TriangleCorner position={1} color={color} />
          <TriangleCorner position={2} color={color} />
          <TriangleCorner position={3} color={color} />
          <div className={styles.innerContainer}>
            <img
              src={backgroundImage + '.png'}
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
