"use client";

import cn from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";

import styles from "./switcher.module.scss";

interface ISwitcherProps<T> {
  onClick: (value: T) => void;
  items: { title: string; value: T; icon?: ReactNode }[];
  selectedValue: T;
  isFullWidth?: boolean;
  withBorder?: boolean;
}

export const Switcher = <T,>({
  onClick,
  items,
  selectedValue,
  isFullWidth = false,
  withBorder = false,
}: ISwitcherProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const selectedIndex = items.findIndex((item) => item.value === selectedValue);

  useEffect(() => {
    if (containerRef.current && selectedIndex !== -1) {
      const container = containerRef.current;
      const selectedElement = container.children[
        selectedIndex + 1
      ] as HTMLElement;

      if (selectedElement) {
        setIndicatorStyle({
          left: selectedElement.offsetLeft,
          width: selectedElement.offsetWidth,
        });
      }
    }
  }, [selectedIndex, items]);

  return (
    <div
      ref={containerRef}
      className={cn(styles.switcher, {
        [styles.fullWidth]: isFullWidth,
      })}
    >
      <div
        className={cn(styles.indicator, {
          [styles.withBorder]: withBorder && selectedIndex !== -1,
        })}
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
      {items.map(({ value, title, icon }, index) => (
        <div
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            onClick(value);
          }}
          className={cn(styles.switch, {
            [styles.active]: selectedValue === value,
            [styles.fullWidth]: isFullWidth,
          })}
        >
          <div className={styles.iconWrapper}>{icon && icon}</div>
          <span className={styles.title}>{title}</span>
        </div>
      ))}
    </div>
  );
};
