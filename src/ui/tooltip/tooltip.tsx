"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import cn from "classnames";

import type { TooltipProps } from "@/types/tooltip.types";

import styles from "./tooltip.module.scss";
import { FC } from "react";

export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  delayMs,
  disabled,
  className,
  contentClassName,
  fullWidth,
}) => {
  if (disabled) {
    return (
      <span className={cn(fullWidth && styles.fullWidth, className)}>
        {children}
      </span>
    );
  }

  return (
    <TooltipPrimitive.Root delayDuration={delayMs}>
      <TooltipPrimitive.Trigger asChild>
        <span
          className={cn(
            styles.trigger,
            fullWidth && styles.fullWidth,
            className,
          )}
        >
          {children}
        </span>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={cn(styles.content, contentClassName)}
          side={side}
          sideOffset={6}
          avoidCollisions
          collisionPadding={8}
        >
          {content}
          <TooltipPrimitive.Arrow
            className={styles.arrow}
            width={10}
            height={5}
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};
