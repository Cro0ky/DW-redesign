import { ReactNode } from "react";

import { Size } from "@/types/types";
import { IButtonProps } from "@/ui";
import {
  TBaseTitle,
  TBaseTopic,
} from "@/types/knowledge-base-info.types";

export enum EModalName {
  CREATE_GAME_MODAL = "CREATE_GAME_MODAL",
  UNIT_MODAL = "UNIT_MODAL",
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

/** Маппинг пропсов для каждого модального окна */
export interface IModalParamsMap {
  [EModalName.CREATE_GAME_MODAL]: undefined;
  [EModalName.UNIT_MODAL]: { category: TBaseTitle; topic: TBaseTopic };
}

/** Дискриминированное объединение для типизации openModal */
export type IActiveModal = {
  [K in EModalName]: { name: K; props?: IModalParamsMap[K] };
}[EModalName];

export interface ModalState {
  activeModal: IActiveModal | null;
  openedModals: IActiveModal[];
  openModal: (modal: IActiveModal) => void;
  closeModal: (name: EModalName) => void;
}
