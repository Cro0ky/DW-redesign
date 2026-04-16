import type { InputHTMLAttributes, ReactNode } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  withoutBorder?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isShowCounter?: boolean;
  isClearSpaces?: boolean;
  min?: number;
  max?: number;
}
