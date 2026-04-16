"use client";

import { FC } from "react";

import { useToggleWithCloseAnimation } from "@/hooks/use-toggle-with-close-animation";
import { ISelectProps } from "@/ui";

import styles from "./select.module.scss";
import { SelectBody, SelectHead } from "./component";

export const Select: FC<ISelectProps> = ({
  label,
  error,
  hint,
  iconLeft,
  placeholder,
  items,
  selectedValue,
  onChangeValue,
}) => {
  const {
    ref: selectRef,
    isOpen,
    isClosing,
    toggle,
    onAnimationEnd,
  } = useToggleWithCloseAnimation();

  const showBody = isOpen || isClosing;
  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div ref={selectRef} className={styles.wrapper}>
        <SelectHead
          onClick={toggle}
          iconLeft={iconLeft}
          isOpen={showBody}
          selectedValue={items?.find(
            ({ value }) => selectedValue?.value === value,
          )}
          placeholder={placeholder}
        />
        {showBody && (
          <SelectBody
            isOpen={isOpen}
            isClosing={isClosing}
            onAnimationEnd={onAnimationEnd}
            onChangeValue={onChangeValue}
            items={items}
          />
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};
