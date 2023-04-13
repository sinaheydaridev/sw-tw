import { useState } from "react";

type Props = {
  max: number;
  strictPrev?: number;
  initial?: number;
};

const useMultiStep = ({ max, strictPrev, initial = 1 }: Props) => {
  const [step, setStep] = useState(initial);
  const [status, setStatus] = useState("");

  const onNextStep = () => {
    if (step >= max) return;
    if (strictPrev === step) return;
    setStep((prev) => prev + 1);
    setStatus("next");
  };

  const onPrevStep = () => {
    if (step <= 1) return;
    if (strictPrev === step) return;
    setStep((prev) => prev - 1);
    setStatus("prev");
  };

  return {
    step,
    status,
    onNextStep,
    onPrevStep,
  };
};

export default useMultiStep;
