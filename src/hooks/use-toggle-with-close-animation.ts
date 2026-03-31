"use client";

import { RefObject, useCallback, useRef, useState } from "react";

import { useOutsideClick } from "./use-outside-click";

interface IUseToggleWithCloseAnimationOptions {
  defaultOpen?: boolean;
  closeOnOutsideClick?: boolean;
}

interface IUseToggleWithCloseAnimationReturn {
  ref: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  isClosing: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  onAnimationEnd: () => void;
}

export const useToggleWithCloseAnimation = (
  options: IUseToggleWithCloseAnimationOptions = {},
): IUseToggleWithCloseAnimationReturn => {
  const { defaultOpen = false, closeOnOutsideClick = true } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isClosing, setIsClosing] = useState(false);

  const close = useCallback(() => {
    if (!isOpen) return;
    isClosingRef.current = true;
    setIsClosing(true);
  }, [isOpen]);

  const onAnimationEnd = useCallback(() => {
    if (isClosingRef.current) {
      isClosingRef.current = false;
      setIsOpen(false);
      setIsClosing(false);
    }
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  useOutsideClick({
    ref,
    handler: close,
    enabled: closeOnOutsideClick && isOpen,
  });

  return {
    ref,
    isOpen,
    isClosing,
    open,
    close,
    toggle,
    onAnimationEnd,
  };
};
