import { useState } from 'react';

/**
 * Hook para navegar entre pasos de la timeline.
 *
 * Mantiene un estado numérico `step` que se puede incrementar o decrementar
 * dentro de un rango definido por `minStep` y `maxStep`.
 *
 * @param maxStep - Valor máximo permitido para el paso (inclusive). Por defecto `0`.
 * @param minStep - Valor mínimo permitido para el paso (inclusive). Por defecto `0`.
 * @returns Objeto con:
 *   - `step`: El paso actual.
 *   - `incrementStep`: Función async que avanza al siguiente paso (sin exceder `maxStep`).
 *   - `decrementStep`: Función que retrocede al paso anterior (sin bajar de `minStep`).
 */
function useStep(maxStep = 0, minStep = 0) {
  const [step, setStep] = useState(0);

  const incrementStep = async () => {
    await setStep((prevStep) => Math.min(prevStep + 1, maxStep));
  };

  const decrementStep = async () => {
    await setStep((prevStep) => Math.max(prevStep - 1, minStep));
  };

  return { step, incrementStep, decrementStep };
}

export default useStep;
