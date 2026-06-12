/**
 * Parsea una cadena de transformación CSS y extrae los valores de traslación y escala.
 *
 * Soporta dos formatos:
 * - `matrix(a, b, c, d, tx, ty)` — extrae translateX (tx), translateY (ty) y
 *   calcula la escala a partir de los componentes a y b.
 * - Funciones individuales (`translate()`, `translateX()`, `translateY()`, `scale()`)
 *
 * @param transform - Cadena CSS de la propiedad `transform` (ej. `"matrix(1, 0, 0, 1, 100, 200)"`)
 * @returns Objeto con `translateX`, `translateY` y `scale`. Devuelve `{0, 0, 1}` si la cadena es vacía o `"none"`.
 */
export const parseTransformMatrix = (transform: string): { translateX: number; translateY: number; scale: number; } => {
  if (!transform || transform === 'none') {
    return { translateX: 0, translateY: 0, scale: 1 };
  }

  // Handle matrix transform
  if (transform.includes('matrix')) {
    const matrix = transform.match(/matrix\(([^)]+)\)/);
    if (matrix) {
      const values = matrix[1].split(',').map(v => parseFloat(v.trim()));
      if (values.length >= 6) {
        return {
          translateX: values[4],
          translateY: values[5],
          scale: Math.sqrt(values[0] * values[0] + values[1] * values[1])
        };
      }
    }
  }

  // Handle individual transform functions
  let translateX = 0, translateY = 0, scale = 1;

  // Parse translate
  const translateMatch = transform.match(/translate\(([^)]+)\)/);
  if (translateMatch) {
    const translateValues = translateMatch[1].split(',').map(v => parseFloat(v.trim()));
    translateX = translateValues[0] || 0;
    translateY = translateValues[1] || 0;
  }

  // Parse translateX
  const translateXMatch = transform.match(/translateX\(([^)]+)\)/);
  if (translateXMatch) {
    translateX = parseFloat(translateXMatch[1]);
  }

  // Parse translateY
  const translateYMatch = transform.match(/translateY\(([^)]+)\)/);
  if (translateYMatch) {
    translateY = parseFloat(translateYMatch[1]);
  }

  // Parse scale
  const scaleMatch = transform.match(/scale\(([^)]+)\)/);
  if (scaleMatch) {
    scale = parseFloat(scaleMatch[1]);
  }

  return { translateX, translateY, scale };
}; 