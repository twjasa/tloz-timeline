/**
 * Configuración global de la aplicación TLoZ Timeline.
 *
 * Centraliza todas las constantes de layout, animación y comportamiento
 * para facilitar ajustes y mantener consistencia en toda la app.
 */

// ─── Layout: Dimensiones de las Eras ────────────────────────────────────────
/** Altura total de una era incluyendo bordes (px). */
export const ERA_HEIGHT = 166;

/** Ancho total de una era incluyendo bordes (px). */
export const ERA_WIDTH = 542;

// ─── Layout: Viewport de referencia ─────────────────────────────────────────
/** Ancho del viewport de desarrollo usado para calcular posiciones fijas (px). */
export const REFERENCE_VIEWPORT_WIDTH = 2560;

/** Alto del viewport de desarrollo usado para calcular posiciones fijas (px). */
export const REFERENCE_VIEWPORT_HEIGHT = 1271;

// ─── Centrado: Padding al centrar la vista ──────────────────────────────────
/** Padding (px) que se aplica en cada borde al centrar la vista con centerWindow. */
export const CENTER_PADDING = {
  top: 20,
  right: 100,
  bottom: 100,
  left: 100,
};

// ─── Animaciones ────────────────────────────────────────────────────────────
/** Duración (ms) de la animación de zoom/centrado al cambiar de paso. */
export const ZOOM_DURATION = 2000;

/** Duración (ms) de las animaciones de clip-path al revelar eras/conexiones. */
export const CLIP_PATH_DURATION = 1000;

/** Delay (ms) antes de iniciar cada animación de clip-path. */
export const CLIP_PATH_DELAY = 100;

/** Easing por defecto para las animaciones de centrado. */
export const CENTER_EASING = "easeOutCubic" as const;

/** Easing por defecto para las animaciones de clip-path y movimiento. */
export const ANIMATION_EASING = "easeOutSine" as const;