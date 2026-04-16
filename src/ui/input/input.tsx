"use client";

import cn from "classnames";
import {
  type ClipboardEvent,
  type ChangeEvent,
  type FocusEvent,
  type InputEvent,
  forwardRef,
  useEffect,
  useState,
} from "react";

import type { IInputProps } from "@/ui";
import { hasInvalidPasswordChars } from "@/lib/validation/password";

import styles from "./input.module.scss";
import { Eye, EyeOff } from "lucide-react";

const NUMBER_FORBIDDEN_INPUT_REGEX = /[eE.,]/;

function toFiniteNumber(
  value: string | number | undefined,
): number | undefined {
  if (value === undefined) return undefined;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const {
    label,
    error,
    hint,
    fullWidth = true,
    withoutBorder = false,
    isShowCounter = false,
    isClearSpaces = false,
    iconLeft,
    iconRight,
    className,
    disabled,
    type,
    value,
    onChange,
    onBeforeInput,
    onPaste,
    min,
    max,
    onBlur,
    defaultValue,
    ...otherProps
  } = props;

  const [localType, setLocalType] = useState(type);
  const [numberDraft, setNumberDraft] = useState<string | null>(null);

  const uncontrolledWithDefault =
    value === undefined && defaultValue !== undefined;

  const isTypeNumber = type === "number";
  const isTypePassword = type === "password";

  useEffect(() => {
    if (isTypeNumber) setNumberDraft(null);
  }, [value, type]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isClearSpaces) {
      const rawValue = event.target.value;
      const cleanedValue = rawValue
        .replace(/^ {2,}(?=\S)/, "")
        .replace(/(?<=\S) {2,}$/, "");

      if (cleanedValue !== rawValue) {
        event.target.value = cleanedValue;
        event.currentTarget.value = cleanedValue;
      }
    }

    if (isTypeNumber) setNumberDraft(event.target.value);
    onChange?.(event);
  };

  const handleBeforeInput = (event: InputEvent<HTMLInputElement>) => {
    onBeforeInput?.(event);
    if (event.defaultPrevented) return;

    const nextChunk = event.data;
    if (!nextChunk) return;

    if (isTypeNumber && NUMBER_FORBIDDEN_INPUT_REGEX.test(nextChunk)) {
      event.preventDefault();
      return;
    }

    if (isTypePassword && hasInvalidPasswordChars(nextChunk)) {
      event.preventDefault();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event);
    if (event.defaultPrevented) return;

    const pastedText = event.clipboardData.getData("text");

    if (isTypeNumber && NUMBER_FORBIDDEN_INPUT_REGEX.test(pastedText)) {
      event.preventDefault();
      return;
    }

    if (isTypePassword && hasInvalidPasswordChars(pastedText)) {
      event.preventDefault();
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (isTypeNumber) {
      const raw = event.currentTarget.value.trim();
      const minValue = toFiniteNumber(min);
      const maxValue = toFiniteNumber(max);

      let nextValue: string;
      const parsed = Number(raw);

      if (!Number.isFinite(parsed)) {
        nextValue = minValue !== undefined ? String(minValue) : "";
      } else {
        const normalized = Math.min(
          maxValue ?? parsed,
          Math.max(minValue ?? parsed, parsed),
        );
        nextValue = String(normalized);
      }

      if (nextValue !== raw) {
        onChange?.({
          ...event,
          target: { ...event.target, value: nextValue },
          currentTarget: { ...event.currentTarget, value: nextValue },
        } as unknown as ChangeEvent<HTMLInputElement>);
      }

      setNumberDraft(nextValue || null);
    }
    onBlur?.(event);
  };

  const inputValue =
    type === "number" && !uncontrolledWithDefault
      ? (numberDraft ?? value ?? "")
      : (value ?? "");

  const renderRightIcon = () => {
    if (isTypePassword) {
      return localType !== "password" ? (
        <Eye onClick={() => setLocalType("password")} />
      ) : (
        <EyeOff onClick={() => setLocalType("text")} />
      );
    } else {
      return iconRight;
    }
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.fullWidth]: fullWidth,
      })}
    >
      {label && <span className={styles.label}>{label}</span>}
      <div
        className={cn(styles.wrapper, className, {
          [styles.withoutBorder]: withoutBorder,
          [styles.hasError]: !!error,
          [styles.disabled]: disabled,
        })}
      >
        {iconLeft && <div className={styles.iconWrapper}>{iconLeft}</div>}
        <div className={styles.inputContainer}>
          <input
            ref={ref}
            type={localType}
            className={styles.input}
            disabled={disabled}
            aria-invalid={!!error}
            onChange={handleChange}
            onBeforeInput={handleBeforeInput}
            onPaste={handlePaste}
            onBlur={handleBlur}
            {...otherProps}
            {...(uncontrolledWithDefault
              ? { defaultValue }
              : { value: inputValue })}
          />
        </div>
        {(iconRight || isTypePassword) && (
          <div className={styles.iconWrapper}>{renderRightIcon()}</div>
        )}
      </div>
      <div className={styles.text}>
        <div>
          {error ? (
            <span className={styles.error} role="alert">
              {error}
            </span>
          ) : (
            hint && (
              <span className={styles.hint} role="alert">
                {hint}
              </span>
            )
          )}
        </div>
        {isShowCounter && String(inputValue).length > 0 && (
          <div className={cn(styles.hint, styles.counter)}>
            {String(inputValue).length}
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";
