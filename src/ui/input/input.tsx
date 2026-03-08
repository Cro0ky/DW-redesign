"use client";

import cn from "classnames";
import { forwardRef } from "react";

import styles from "./input.module.scss";
import type { IInputProps } from "@/ui";

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
      ...otherProps
    },
    ref,
  ) => {
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
              className={styles.input}
              disabled={disabled}
              aria-invalid={!!error}
              {...otherProps}
            />
          </div>
          {iconRight && <div className={styles.iconWrapper}>{iconRight}</div>}
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
