"use client";

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
  if (config.type === "text") {
    return (
      <input
        type="text"
        className={styles.textInput}
        placeholder={config.placeholder}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (config.type === "select") {
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
        <option value="">{config.placeholder ?? "Все"}</option>
        {config.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  if (config.type === "multiselect") {
    const arr = (Array.isArray(value) ? value : []) as (string | number)[];
    return (
      <select
        className={styles.select}
        multiple
        value={arr.map(String)}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, (o) => o.value);
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
  }

  if (config.type === "date") {
    return (
      <input
        type="date"
        className={styles.dateInput}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value || undefined)}
      />
    );
  }

  if (config.type === "daterange") {
    const range = (value as [string?, string?]) ?? [undefined, undefined];
    return (
      <div className={styles.dateRange}>
        <input
          type="date"
          className={styles.dateInput}
          value={
            range[0] instanceof Date
              ? range[0].toISOString().slice(0, 10)
              : ((range[0] as string) ?? "")
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
            range[1] instanceof Date
              ? range[1].toISOString().slice(0, 10)
              : ((range[1] as string) ?? "")
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
  }

  return null;
};
