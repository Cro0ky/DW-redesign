"use client";

import { useModalStore } from "@/store/modal/modal.store";
import { EModalName, Modal } from "@/ui";

export const CreateGameModal = () => {
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
          children: "ЗАКРЫТЬ",
          onClick: handleCloseModal,
        },
      ]}
    >
      ASDASDASD
    </Modal>
  );
};
