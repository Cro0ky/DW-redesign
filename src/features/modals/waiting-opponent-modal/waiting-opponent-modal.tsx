"use client";

import { Undo2 } from "lucide-react";

import { EModalName, Modal } from "@/ui";
import { useWaitingOpponentModal } from "./hooks/use-waiting-opponent-modal";
import { ConnectionTimer } from "@/ui/connection-timer/connection-timer";
import styles from "./waiting-opponent-modal.module.scss";
export const WaitingOpponentModal = () => {
  const { handleClose } = useWaitingOpponentModal();
  return (
    <Modal
      onClose={handleClose}
      size={"l"}
      name={EModalName.WAITING_OPPONENT_MODAL}
      buttons={[
        {
          children: "УДАЛИТЬ КОМНАТУ",
          onClick: handleClose,
          iconLeft: <Undo2 />,
          fullWidth: true,
          variant: "outline",
          color: "red",
        },
      ]}
      children={
        <div className={styles.wrapper}>
          <ConnectionTimer>
            <ConnectionTimer.Stopwatch />
          </ConnectionTimer>
        </div>
      }
    />
  );
};
