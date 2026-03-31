import type { ReactNode } from "react";

export type CheckboxVariant = "default" | "tumbler";

export interface CheckboxProps {
  variant?: CheckboxVariant;
  title?: ReactNode;
  caption?: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  "aria-label"?: string;
}

export type LabeledCheckboxProps = CheckboxProps;
export type LabeledCheckboxVariant = CheckboxVariant;
