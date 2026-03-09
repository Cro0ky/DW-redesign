"use client";

import cn from "classnames";
import { forwardRef, type MouseEvent } from "react";

import { IButtonProps } from "@/ui";

import styles from "./button.module.scss";

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (props, ref) => {
    const {
      children,
      color = "white",
      variant = "filled",
      iconLeft,
      iconRight,
      fullWidth = false,
      withoutBorder = false,
      isLoading = false,
      disabled,
      className,
      onClick,
      ...otherProps
    } = props;

    const buttonStyles = cn(
      styles.button,
      className,
      styles[`${variant}_${color}`],
      {
        [styles.fullWidth]: fullWidth,
        [styles.withoutBorder]: withoutBorder,
      },
    );

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(event);
      }
    };

    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || isLoading}
        onClick={handleClick}
        {...otherProps}
      >
        {iconLeft && <div className={cn(styles.iconWrapper)}>{iconLeft}</div>}
        {children && children}
        {iconRight && <div className={cn(styles.iconWrapper)}>{iconRight}</div>}
      </button>
    );
  },
);

Button.displayName = "Button";
