import { ReactNode } from "react";

import { Size } from "@/types/types";
import { EModalName } from "@/ui";

export type TModalVariant = "default";

export interface IBaseModalProps {
  variant?: TModalVariant;
  children?: ReactNode;
  onClose?: () => void;
  zIndex?: number;
  name: EModalName;
  size?: Size;
}

export interface ModalWrapperProps extends IBaseModalProps {
  isAnimating: boolean;
  isClosing: boolean;
  isCloseOnBackground?: boolean;
}
