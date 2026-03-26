import { ReactNode } from "react";

import { TBaseTitle, TBaseTopic } from "@/types/knowledge-base-info.types";
import { Size } from "@/types/types";
import { IButtonProps } from "@/ui";
import { TModalVariant } from "@/types/modal.types";

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
  variant?: TModalVariant;
}

/** Маппинг пропсов для каждого модального окна */
export interface IModalParamsMap {
  [EModalName.CREATE_GAME_MODAL]: undefined;
  [EModalName.UNIT_MODAL]: {
    topic: TBaseTopic;
    description: string;
    category: TBaseTitle;
    peculiarities?: string[];
    data?: {
      tick_time?: number;
      tick_activate?: number;
      unloading_tick?: number;
      moving_tick?: number;
      launch_tick?: number;
      reload_tick?: number;
      pre_activate_tick?: number;
      infantry_tick?: number;
      station_tick?: number;
      six_ticks?: number;
      eighteen_ticks?: number;
      photo_tick?: number;
    };
  };
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
