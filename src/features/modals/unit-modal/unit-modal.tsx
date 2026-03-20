"use client";

import { EModalName, Modal } from "@/ui";
import { useModalStore } from "@/store/modal/modal.store";

export const UnitModal = () => {
  const { activeModal, closeModal } = useModalStore();
  const props =
    activeModal?.name === EModalName.UNIT_MODAL ? activeModal.props : undefined;

  const { category, topic } = props ?? {};

  return (
    <Modal
      name={EModalName.UNIT_MODAL}
      onClose={() => closeModal(EModalName.UNIT_MODAL)}
    >
      {category}
      {topic}
    </Modal>
  );
};
