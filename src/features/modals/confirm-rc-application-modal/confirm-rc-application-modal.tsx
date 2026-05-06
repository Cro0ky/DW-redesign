"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import { userService } from "@/lib/api/services/user/user.service";
import { useModalStore } from "@/store/modal/modal.store";
import { useUserStore } from "@/store";
import { EModalName, Modal } from "@/ui";

function getErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const msg = (error as { message: unknown }).message;
    if (typeof msg === "string" && msg.trim()) return msg;
  }
  return fallback;
}

export const ConfirmRcApplicationModal = () => {
  const { closeModal, activeModal } = useModalStore();
  const { setRCStatus } = useUserStore();
  const [isSending, setIsSending] = useState(false);

  const isConfirmModal =
    activeModal?.name === EModalName.CONFIRM_RC_APPLICATION_MODAL;

  const props = isConfirmModal ? activeModal.props : undefined;

  const handleSendRCApplication = async () => {
    if (!props || isSending) return;
    setIsSending(true);
    try {
      const res = await userService.sendRCApplication(props);
      setRCStatus(res.status);
      closeModal(EModalName.CONFIRM_RC_APPLICATION_MODAL);
      toast.success("Заявка успешно отправлена");
    } catch (e) {
      toast.error(
        getErrorMessage(e, "Не удалось отправить заявку. Попробуйте позже."),
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal
      size={"s"}
      name={EModalName.CONFIRM_RC_APPLICATION_MODAL}
      title={"Отправить заявку"}
      subtitle={"Вы уверены, что хотите отправить заявку"}
      buttons={[
        {
          onClick: () => closeModal(EModalName.CONFIRM_RC_APPLICATION_MODAL),
          children: "Отмена",
          variant: "outline",
          color: "red",
          disabled: isSending,
        },
        {
          onClick: () => void handleSendRCApplication(),
          children: "Подтвердить",
          variant: "outline",
          isLoading: isSending,
        },
      ]}
    />
  );
};
