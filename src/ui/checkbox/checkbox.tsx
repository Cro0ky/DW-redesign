"use client";

import cn from "classnames";
import { useId } from "react";

import type { CheckboxProps } from "@/ui";

import styles from "./checkbox.module.scss";

export function Checkbox({
  variant = "default",
  title,
  caption,
  checked,
  onChange,
  disabled,
  className,
  id: idProp,
  name,
}: CheckboxProps) {
  const uid = useId();
  const id = idProp ?? uid;

  if (variant === "tumbler") {
    return (
      <label
        className={cn(styles.tumblerLabel, className, {
          [styles.tumblerChecked]: checked,
          [styles.tumblerDisabled]: disabled,
        })}
      >
        {!!title ? (
          <div className={styles.text}>
            <span className={styles.title}>{title}</span>
            {caption ? <span className={styles.caption}>{caption}</span> : null}
          </div>
        ) : null}
        <input
          id={id}
          name={name}
          type="checkbox"
          className={styles.tumblerInput}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.tumblerTrack} aria-hidden="true" />
      </label>
    );
  }

  return (
    <div className={cn(className)}>
      <div className={styles.text}>
        <label className={styles.title} htmlFor={id}>
          {title}
        </label>
        {caption ? <span className={styles.caption}>{caption}</span> : null}
      </div>
      <input
        id={id}
        name={name}
        type="checkbox"
        className={cn(styles.checkbox, styles.controlDefault)}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
}
