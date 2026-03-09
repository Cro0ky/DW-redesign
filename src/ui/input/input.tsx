"use client";

import cn from "classnames";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

import type { IInputProps } from "@/ui";

import styles from "./input.module.scss";

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      label,
      error,
      fullWidth = true,
      withoutBorder = false,
      iconLeft,
      iconRight,
      className,
      disabled,
      type,
      ...otherProps
    },
    ref,
  ) => {
    const [localType, setLocalType] = useState(type);
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
              {...otherProps}
            />
          </div>
          {(iconRight || type === "password") && (
            <div className={styles.iconWrapper}>
              {type === "password" ? (
                localType !== "password" ? (
                  <Eye onClick={() => setLocalType("password")} />
                ) : (
                  <EyeOff onClick={() => setLocalType("text")} />
                )
              ) : (
                iconRight
              )}
            </div>
          )}
        </div>
        {error && (
          <span className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
