import { FC, ReactNode } from "react";
import styles from "./select-head.module.scss";
import { ISelectItem } from "@/ui";
import { ChevronDown } from "lucide-react";
import cn from "classnames";

interface ISelectHeadProps {
  onClick?: () => void;
  selectedValue?: ISelectItem | null;
  placeholder?: string;
  disabled?: boolean;
  isOpen?: boolean;
  iconLeft?: ReactNode;
}

export const SelectHead: FC<ISelectHeadProps> = ({
  onClick,
  selectedValue,
  placeholder,
  isOpen,
  iconLeft,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) onClick?.();
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.disabled]: disabled,
      })}
      onClick={() => handleClick()}
    >
      <div className={styles.text}>
        {iconLeft && iconLeft}
        {selectedValue?.title ? selectedValue?.title : placeholder}
      </div>

      <ChevronDown
        size={18}
        className={cn(styles.icon, {
          [styles.active]: isOpen,
        })}
      />
    </div>
  );
};
