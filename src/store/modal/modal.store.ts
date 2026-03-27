import { create } from "zustand/index";

import { ModalState } from "@/ui";

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openedModals: [],

  resetModals: () =>
    set((state) => {
      return {
        ...state,
        openedModals: [],
      };
    }),

  openModal: (modal) => {
    set((state) => {
      const openedModals = [modal, ...state.openedModals];
      return {
        openedModals,
        activeModal: modal,
      };
    });
  },

  closeModal: (name) => {
    set((state) => {
      const openedModals = state.openedModals.filter((m) => m.name !== name);
      const activeModal = openedModals[0] ?? null;
      return {
        openedModals,
        activeModal,
      };
    });
  },
}));
