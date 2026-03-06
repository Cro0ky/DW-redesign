import { ButtonHTMLAttributes, ReactNode } from "react";

export type TButtonVariant = "filled" | "outline" | "ghost";
export type TButtonColor = "red" | "white" | "gray";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: TButtonColor;
  variant?: TButtonVariant;
  withoutBorder?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;

  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
