import { ReactNode } from "react";

export type FilterType = "text" | "select" | "multiselect" | "date" | "daterange";

export interface FilterSelectOption {
  value: string | number;
  label: string;
}

export interface BaseFilterConfig {
  columnKey: string;
  placeholder?: string;
}

export interface TextFilterConfig extends BaseFilterConfig {
  type: "text";
}

export interface SelectFilterConfig extends BaseFilterConfig {
  type: "select";
  options: FilterSelectOption[];
}

export interface MultiselectFilterConfig extends BaseFilterConfig {
  type: "multiselect";
  options: FilterSelectOption[];
}

export interface DateFilterConfig extends BaseFilterConfig {
  type: "date";
}

export interface DateRangeFilterConfig extends BaseFilterConfig {
  type: "daterange";
}

export type FilterConfig =
  | TextFilterConfig
  | SelectFilterConfig
  | MultiselectFilterConfig
  | DateFilterConfig
  | DateRangeFilterConfig;

export type FilterValues = Record<
  string,
  string | number | (string | number)[] | [string?, string?] | undefined
>;

export interface TableColumn<T> {
  key: string;
  header: string;
  /** Кастомный рендер ячейки. По умолчанию отображается row[key]. */
  render?: (row: T, value: unknown) => ReactNode;
  /** Ширина колонки (например "120px", "20%") */
  width?: string;
  /** Сортировка по колонке */
  sortable?: boolean;
  /** Выравнивание содержимого */
  align?: "left" | "center" | "right";
}

export interface TableHeaderActionsProps {
  children?: ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  /** Ключ для уникальной идентификации строк (для key) */
  rowKey?: keyof T | ((row: T) => string | number);
  /** Кнопки/действия над заголовком таблицы */
  headerActions?: ReactNode;
  /** Конфигурация фильтров */
  filters?: FilterConfig[];
  /** Текущие значения фильтров (контролируемый режим) */
  filterValues?: FilterValues;
  /** Обработчик изменения фильтров */
  onFilterChange?: (values: FilterValues) => void;
  /** Класс для контейнера */
  className?: string;
}
