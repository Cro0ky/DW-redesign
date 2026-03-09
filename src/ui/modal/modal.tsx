import { FC } from "react";

import { IModalProps, Portal } from "@/ui";

import { ModalWrapper } from "./components/modal-wrapper/modal-wrapper";

export const Modal: FC<IModalProps> = ({
  size = "s",
  buttons,
  title,
  children,
  zIndex = 100,
  name,
  onClose = () => {},
}) => {
  const handleClose = () => {
    onClose?.();
  };

  const activeModal = { name: "" };
  // const isOpen = activeModal?.name === name;

  // const { isAnimating, isClosing, isMounted } = useModal({
  //   animationDelay: ANIMATION_DELAY,
  //   isOpen,
  //   onClose: handleClose,
  // });

  return (
    <Portal>
      <ModalWrapper
      // name={name}
      // isClosing={isClosing}
      // isAnimating={isAnimating}
      // zIndex={zIndex}
      // size={size}
      // onClose={() => {
      //   handleClose();
      //   onClose();
      // }}
      >
        {/*{!!title && <span className={styles.title}>{title}</span>}*/}
        {/*{!!children && <div className={styles.content}>{children}</div>}*/}
        {/*<div className={styles.btns}>*/}
        {/*  {buttons?.length*/}
        {/*    ? buttons.map((props, index) => <Button key={index} {...props} />)*/}
        {/*    : null}*/}
        {/*</div>*/}
      </ModalWrapper>
    </Portal>
  );
};
