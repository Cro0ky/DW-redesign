"use client";

import { type RefObject, useEffect, useRef } from "react";

function isOutside(
  target: EventTarget | null,
  ref: RefObject<HTMLElement | null>,
  excludedRefs: RefObject<HTMLElement | null>[],
): boolean {
  if (!(target instanceof Node)) return true;
  if (!ref.current) return true;

  const isInsideRef = ref.current.contains(target);
  const isInsideExcluded = excludedRefs.some((excluded) =>
    excluded.current?.contains(target),
  );

  return !isInsideRef && !isInsideExcluded;
}

interface IUseOutsideClickOptions {
  ref: RefObject<HTMLElement | null>;
  handler: () => void;
  excludedRefs?: RefObject<HTMLElement | null>[];
  enabled?: boolean;
}

export const useOutsideClick = ({
  ref,
  handler,
  excludedRefs = [],
  enabled = true,
}: IUseOutsideClickOptions) => {
  const handlerRef = useRef(handler);
  const excludedRefsRef = useRef(excludedRefs);

  if (!handlerRef.current || !excludedRefsRef.current) return;

  handlerRef.current = handler;
  excludedRefsRef.current = excludedRefs;

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      if (isOutside(event.target, ref, excludedRefsRef.current)) {
        handlerRef.current();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, enabled]);
};
