"use client";

import { FC } from "react";

import { useModalStore } from "@/store/modal/modal.store";
import { Button, IModalProps, Portal } from "@/ui";
import { useModal } from "@/ui/modal/hooks/useModal";

import { ModalWrapper } from "./components/modal-wrapper/modal-wrapper";
import styles from "./modal.module.scss";

const ANIMATION_DELAY = 200;

export const Modal: FC<IModalProps> = ({
  size = "s",
  buttons,
  title,
  subtitle,
  children,
  zIndex = 100,
  name,
  onClose = () => {},
}) => {
  const handleClose = () => {
    onClose?.();
  };

  const { activeModal } = useModalStore();
  const isOpen = activeModal?.name === name;

  const { isAnimating, isClosing } = useModal({
    animationDelay: ANIMATION_DELAY,
    isOpen,
    onClose: handleClose,
  });

  return (
    <Portal>
      <ModalWrapper
        name={name}
        isClosing={isClosing}
        isAnimating={isAnimating}
        zIndex={zIndex}
        size={size}
        onClose={() => {
          handleClose();
          onClose();
        }}
      >
        {(!!title || !!subtitle) && (
          <div className={styles.head}>
            {!!title && <span className={styles.title}>{title}</span>}
            {!!subtitle && <span className={styles.subtitle}>{subtitle}</span>}
          </div>
        )}

        {!!children && <div className={styles.content}>{children}</div>}

        {buttons?.length && (
          <div className={styles.btns}>
            {buttons.map((props, index) => (
              <Button key={index} {...props} />
            ))}
          </div>
        )}
      </ModalWrapper>
    </Portal>
  );
};
