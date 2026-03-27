import cn from "classnames";
import { FC } from "react";

import { ModalWrapperProps } from "@/types/modal.types";

import styles from "./modal-wrapper.module.scss";

export const ModalWrapper: FC<ModalWrapperProps> = ({
  isClosing,
  isAnimating,
  zIndex,
  size,
  onClose,
  variant = "default",
  fullSize = true,
  children,
}) => {
  const mods = {
    [styles.isOpened]: isAnimating && !isClosing,
    [styles.isClosing]: isClosing,
    [styles.content_fullSize]: fullSize,
  };
  return (
    <div
      onClick={onClose}
      style={{ zIndex }}
      className={cn(styles.container, mods, styles[variant])}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          styles.content,
          styles[`bg_${variant}`],
          styles[`size_${size}`],
          mods,
        )}
      >
        {children}
      </div>
    </div>
  );
};
