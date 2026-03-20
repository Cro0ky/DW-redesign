import { ReactNode } from "react";

import { Size } from "@/types/types";
import { IButtonProps } from "@/ui";

export enum EModalName {
  CREATE_GAME_MODAL = "CREATE_GAME_MODAL",
}

export interface IBaseModalProps {
  children?: ReactNode;
  onClose?: () => void;
  zIndex?: number;
  name: EModalName;
  size?: Size;
}

export interface IModalProps extends IBaseModalProps {
  title?: string;
  subtitle?: string;
  buttons?: IButtonProps[];
}

// interface для типизации пропсов МО
export interface IModalParams {}

export interface IActiveModal {
  name: EModalName;
  props?: IModalParams | null;
}

export interface ModalState {
  activeModal: IActiveModal | null;
  openedModals: IActiveModal[];
  openModal: (modal: IActiveModal) => void;
  closeModal: (name: EModalName) => void;
}
