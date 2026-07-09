import React, { useEffect } from 'react';
import styles from './eraModal.module.scss';
import clsx from 'clsx';
import { TriangleCorner } from '../TriangleCorner/TriangleCorner';

interface EraModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  color: 'golden' | 'silver' | 'zeldaColor';
  backgroundImage: string;
  description: string;
  timeline?: number;
  event?: number;
}

export const EraModal: React.FC<EraModalProps> = ({
  isOpen,
  onClose,
  title,
  color,
  backgroundImage,
  description,
  timeline,
  event,
}) => {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getEraTypeName = (c: string) => {
    switch (c) {
      case 'golden': return 'Juego Principal';
      case 'silver': return 'Evento Histórico';
      default: return 'Especial';
    }
  };

  const getTimelineName = (t?: number) => {
    if (t === undefined) return undefined;
    if (t === 0) return 'Línea de la Unificación / Cronología Unificada';
    if (t === 1) return 'Línea del Héroe Victorioso (Era Adulto)';
    if (t === 2) return 'Línea del Héroe Victorioso (Era Niño)';
    return `Línea Alternativa ${t}`;
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={clsx(styles.externalBorder1, styles[color])}>
        {/* Usamos el contenedor con borde de la misma forma que el diseño original de la Era */}
        <div className={clsx(styles.modalContainer, 'noiseBackground')}>
          <TriangleCorner position={0} color={color} />
          <TriangleCorner position={1} color={color} />
          <TriangleCorner position={2} color={color} />
          <TriangleCorner position={3} color={color} />
          
          <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar modal">
            ✕
          </button>

          <div className={styles.scrollableContent}>
            <h2 className={clsx(styles.title, styles[color])}>{title}</h2>
            
            <div className={styles.imageWrapper}>
              <img
                src={`${backgroundImage}.png`}
                alt={title}
                className={styles.image}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.opacity = '0.3';
                }}
              />
            </div>

            <div className={styles.metaRow}>
              <span className={clsx(styles.badge, styles[color])}>
                {getEraTypeName(color)}
              </span>
              {event !== undefined && (
                <span className={styles.metaInfo}>
                  Evento: #{event}
                </span>
              )}
              {timeline !== undefined && (
                <span className={styles.metaInfo}>
                  {getTimelineName(timeline)}
                </span>
              )}
            </div>

            <p className={styles.description}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
