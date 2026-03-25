import type { ReactNode } from "react";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Текст или разметка подсказки */
  content: ReactNode;
  children: ReactNode;
  /** @deprecated Подсказка всегда показывается над триггером (через portal) */
  side?: TooltipSide;
  /** Задержка перед показом, мс */
  delayMs?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  /** Ширина обёртки 100% (для fullWidth-кнопок и блоков) */
  fullWidth?: boolean;
}
