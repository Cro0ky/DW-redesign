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

  // Открытие / снятие фокуса без вызова onClose: когда сверху другая МО,
  // isOpen становится false — только прячем оверлей, стек в сторе не трогаем.
  useEffect(() => {
    if (isOpen) {
      const id = setTimeout(() => {
        setIsClosing(false);
        setTimeout(() => setIsAnimating(true), 30);
      }, 0);
      return () => clearTimeout(id);
    }

    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }
    setIsClosing(false);
    setIsAnimating(false);
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timeRef.current) {
        clearTimeout(timeRef.current);
        timeRef.current = null;
      }
    };
  }, [isOpen, close]);

  return {
    isClosing,
    isAnimating,
    close,
  };
}
