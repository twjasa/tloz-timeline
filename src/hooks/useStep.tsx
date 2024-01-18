import { useState } from 'react';

function useStep(maxStep = 0, minStep = 0) {
  const [step, setStep] = useState(0);

  const incrementStep = async () => {
    await setStep((prevStep) => Math.min(prevStep + 1, maxStep));
  };

  const decrementStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, minStep));
  };

  return { step, incrementStep, decrementStep };
}

export default useStep;
