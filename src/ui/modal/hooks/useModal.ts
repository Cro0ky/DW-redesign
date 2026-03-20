"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface IUseModalProps {
  animationDelay?: number;
  isOpen?: boolean;
  onClose?: () => void;
}

export function useModal({ animationDelay, isOpen, onClose }: IUseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Функции для взаимодействия с модальным окном

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Логика закрытия с анимацией
  const close = useCallback(() => {
    if (onCloseRef.current) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onCloseRef.current?.();
        setIsClosing(false);
        setIsAnimating(false);
      }, animationDelay);
    }
  }, [animationDelay]);

  // Логика открытия (установка анимации)
  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => {
        setIsClosing(false);
        setTimeout(() => setIsAnimating(true), 30);
      }, 0);
      return () => clearTimeout(id);
    } else if (!isOpen) {
      const id = setTimeout(() => {
        setIsAnimating(false);
        close();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [isOpen, close]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return {
    isClosing,
    isAnimating,
    close,
  };
}
