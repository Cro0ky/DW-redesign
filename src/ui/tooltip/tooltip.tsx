"use client";

import cn from "classnames";
import {
  cloneElement,
  type FocusEvent,
  Fragment,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import type { TooltipProps } from "@/types/tooltip.types";

import styles from "./tooltip.module.scss";

const GAP = 8;
const PAD = 12;

function isDomTrigger(node: ReactElement): boolean {
  return node.type !== Fragment;
}

export function Tooltip({
  content,
  children,
  delayMs = 180,
  disabled = false,
  className,
  contentClassName,
  fullWidth = false,
}: TooltipProps) {
  const tooltipId = useId();
  const anchorRef = useRef<HTMLSpanElement>(null);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const clearShowTimer = () => {
    if (showTimerRef.current != null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  };

  const close = useCallback(() => {
    clearShowTimer();
    setOpen(false);
    setPos(null);
  }, []);

  const openDelayed = useCallback(() => {
    if (disabled) return;
    clearShowTimer();
    showTimerRef.current = setTimeout(() => {
      showTimerRef.current = null;
      setOpen(true);
    }, delayMs);
  }, [disabled, delayMs]);

  useLayoutEffect(() => {
    if (!open || disabled) return;

    const sync = () => {
      const el = anchorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      setPos({
        left: Math.min(Math.max(cx, PAD), window.innerWidth - PAD),
        top: r.top - GAP,
      });
    };

    sync();
    window.addEventListener("scroll", sync, true);
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync, true);
      window.removeEventListener("resize", sync);
    };
  }, [open, disabled]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => () => clearShowTimer(), []);

  const describedBy = open && !disabled ? tooltipId : undefined;

  let trigger: ReactNode;
  if (isValidElement(children) && isDomTrigger(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    const p = child.props;
    trigger = cloneElement(child, {
      "aria-describedby":
        describedBy != null
          ? [p["aria-describedby"], describedBy].filter(Boolean).join(" ")
          : p["aria-describedby"],
      onMouseEnter: (e: MouseEvent) =>
        (p.onMouseEnter as ((ev: MouseEvent) => void) | undefined)?.(e),
      onMouseLeave: (e: MouseEvent) =>
        (p.onMouseLeave as ((ev: MouseEvent) => void) | undefined)?.(e),
      onFocus: (e: FocusEvent) => {
        (p.onFocus as ((ev: FocusEvent) => void) | undefined)?.(e);
        openDelayed();
      },
      onBlur: (e: FocusEvent) => {
        (p.onBlur as ((ev: FocusEvent) => void) | undefined)?.(e);
        close();
      },
    });
  } else {
    trigger = (
      <span
        className={styles.fallbackTrigger}
        tabIndex={0}
        aria-describedby={describedBy}
        onFocus={openDelayed}
        onBlur={close}
      >
        {children}
      </span>
    );
  }

  const layer =
    open &&
    !disabled &&
    pos &&
    typeof document !== "undefined" &&
    createPortal(
      <span
        id={tooltipId}
        role="tooltip"
        className={cn(styles.tooltip, contentClassName)}
        style={{
          left: pos.left,
          top: pos.top,
          transform: "translate(-50%, -100%)",
        }}
      >
        {content}
      </span>,
      document.body,
    );

  return (
    <span
      ref={anchorRef}
      className={cn(
        styles.anchor,
        fullWidth && styles.anchorFullWidth,
        className,
      )}
      onMouseEnter={openDelayed}
      onMouseLeave={close}
    >
      {trigger}
      {layer}
    </span>
  );
}
