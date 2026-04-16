import cn from "classnames";
import { FC, useLayoutEffect, useState, AnimationEvent } from "react";

import styles from "./select-body.module.scss";
import { ISelectItem } from "@/ui";

interface ISelectBodyProps {
  isOpen: boolean;
  isClosing: boolean;
  onAnimationEnd?: () => void;
  onChangeValue?: (item: ISelectItem) => void;
  items?: ISelectItem[];
}

export const SelectBody: FC<ISelectBodyProps> = ({
  isOpen,
  isClosing,
  onAnimationEnd,
  onChangeValue,
  items,
}) => {
  const [entered, setEntered] = useState(false);

  useLayoutEffect(() => {
    if (isClosing) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [isClosing]);

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!isClosing) return;
    onAnimationEnd?.();
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.entered]: entered && isOpen && !isClosing,
        [styles.closing]: isClosing,
      })}
      onAnimationEnd={handleAnimationEnd}
    >
      {items?.map((item) => (
        <div
          className={styles.item}
          key={item.value}
          onClick={() => {
            onChangeValue?.(item);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};
