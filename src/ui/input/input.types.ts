import type { InputHTMLAttributes, ReactNode } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  withoutBorder?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
