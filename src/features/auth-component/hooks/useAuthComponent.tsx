import { useCallback, useState } from "react";

import { CnFlag, EnFlag, RuFlag } from "@/assets/svg";
import { TAuthStep } from "@/features/auth-component/auth-component";
import { Login, Registration } from "@/features/auth-component/components";

export const useAuthComponent = () => {
  const [step, setStep] = useState<TAuthStep>("login");

  const handleChangeStep = useCallback((newStep: TAuthStep) => {
    setStep(newStep);
  }, []);

  const getCurrentForm = useCallback(() => {
    switch (step) {
      case "login":
        return <Login onStepChange={handleChangeStep} />;
      case "registration":
        return <Registration onStepChange={handleChangeStep} />;
      case "recover_password":
        return <div />;
    }
  }, [step, handleChangeStep]);

  const LANGUAGES = [
    {
      title: "ru",
      value: "ru",
      icon: <RuFlag />,
    },
    {
      title: "en",
      value: "en",
      icon: <EnFlag />,
    },
    {
      title: "cn",
      value: "cn",
      icon: <CnFlag />,
    },
  ];
  return { getCurrentForm, handleChangeStep, step, LANGUAGES };
};
