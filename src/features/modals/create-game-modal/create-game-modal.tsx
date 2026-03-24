"use client";

import { useTranslations } from "next-intl";

import { useModalStore } from "@/store/modal/modal.store";
import { EModalName, Modal } from "@/ui";

export const CreateGameModal = () => {
  const t = useTranslations();
  const { closeModal } = useModalStore();

  const handleCloseModal = () => {
    closeModal(EModalName.CREATE_GAME_MODAL);
  };

  return (
    <Modal
      onClose={handleCloseModal}
      name={EModalName.CREATE_GAME_MODAL}
      buttons={[
        {
          children: t("modals.create_game_close"),
          onClick: handleCloseModal,
        },
      ]}
    >
      ASDASDASD
    </Modal>
  );
};
