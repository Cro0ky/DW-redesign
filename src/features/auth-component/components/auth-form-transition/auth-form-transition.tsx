"use client";

import cn from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

import type { TAuthStep } from "@/features";

import styles from "./auth-form-transition.module.scss";

interface IAuthFormTransitionProps {
  step: TAuthStep;
  renderForm: (step: TAuthStep) => ReactNode;
}

const TRANSITION_DURATION = 200;

type TPhase = "idle" | "exiting" | "entering";

export const AuthFormTransition = ({
  step,
  renderForm,
}: IAuthFormTransitionProps) => {
  const [displayStep, setDisplayStep] = useState<TAuthStep>(step);
  const [phase, setPhase] = useState<TPhase>("idle");
  const enteringKey = useRef(0);

  useEffect(() => {
    if (step === displayStep) return;
    setPhase("exiting");

    const exitTimer = setTimeout(() => {
      setDisplayStep(step);
      enteringKey.current += 1;
      setPhase("entering");

      const enterTimer = setTimeout(
        () => setPhase("idle"),
        TRANSITION_DURATION,
      );
      return () => clearTimeout(enterTimer);
    }, TRANSITION_DURATION);

    return () => clearTimeout(exitTimer);
  }, [step]);

  return (
    <div
      className={cn(styles.formWrapper, {
        [styles.exiting]: phase === "exiting",
        [styles.entering]: phase === "entering",
      })}
    >
      {renderForm(displayStep)}
    </div>
  );
};
