"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import type { FilterConfig, FilterValues } from "@/ui";

import styles from "./table-filter.module.scss";

interface TableFilterProps {
  config: FilterConfig;
  value: FilterValues[string];
  onChange: (value: FilterValues[string]) => void;
}

export const TableFilter: FC<TableFilterProps> = ({
  config,
  value,
  onChange,
}) => {
  const t = useTranslations();

  switch (config.type) {
    case "text":
      return (
        <input
          type="text"
          className={styles.textInput}
          placeholder={config.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "select":
      return (
        <select
          className={styles.select}
          value={(value as string | number) ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange(
              config.options.find((o) => String(o.value) === v)?.value ?? "",
            );
          }}
        >
          <option value="">
            {config.placeholder ?? t("table.filter_all")}
          </option>
          {config.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "multiselect":
      const arr = (Array.isArray(value) ? value : []) as (string | number)[];
      return (
        <select
          className={styles.select}
          multiple
          value={arr.map(String)}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (o) => o.value,
            );
            const vals = config.options
              .filter((o) => selected.includes(String(o.value)))
              .map((o) => o.value);
            onChange(vals);
          }}
        >
          {config.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    case "date":
      return (
        <input
          type="date"
          className={styles.dateInput}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value || undefined)}
        />
      );
    case "daterange":
      const range = (value as [string?, string?]) ?? [undefined, undefined];
      const start = range[0] as string | Date | undefined;
      const end = range[1] as string | Date | undefined;
      return (
        <div className={styles.dateRange}>
          <input
            type="date"
            className={styles.dateInput}
            value={
              start instanceof Date
                ? start.toISOString().slice(0, 10)
                : (start ?? "")
            }
            onChange={(e) =>
              onChange([e.target.value || undefined, range[1]] as [
                string?,
                string?,
              ])
            }
          />
          <span className={styles.separator}>—</span>
          <input
            type="date"
            className={styles.dateInput}
            value={
              end instanceof Date ? end.toISOString().slice(0, 10) : (end ?? "")
            }
            onChange={(e) =>
              onChange([range[0], e.target.value || undefined] as [
                string?,
                string?,
              ])
            }
          />
        </div>
      );
    default:
      return null;
  }
};
