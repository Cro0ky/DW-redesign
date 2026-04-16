import type { ReactNode } from "react";

export interface ISelectItem {
  title: string;
  value: string;
}

export interface ISelectProps {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: ReactNode;
  placeholder?: string;
  items?: ISelectItem[];
  onChangeValue?: (item: ISelectItem) => void;
  selectedValue?: ISelectItem | null;
}
