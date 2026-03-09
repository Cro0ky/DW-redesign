import { ReactNode } from "react";

import { Size } from "@/types/types";
import { IButtonProps } from "@/ui";

export enum EModalName {}

export interface IBaseModalProps {
  children?: ReactNode;
  onClose?: () => void;
  zIndex?: number;
  name: EModalName;
  size?: Size;
}

export interface IModalProps extends IBaseModalProps {
  title?: string;
  buttons?: IButtonProps[];
}
