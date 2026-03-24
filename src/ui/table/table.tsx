"use client";

import cn from "classnames";
import { useCallback, useState } from "react";

import type { FilterConfig, FilterValues, TableProps } from "@/ui";
import { TableBody, TableHead } from "@/ui/table/components";

import { TableFilter } from "./components/table-filter/table-filter";
import styles from "./table.module.scss";

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  headerActions,
  filters = [],
  filterValues: controlledFilterValues,
  onFilterChange,
  className,
}: TableProps<T>) {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({});
  const filterValues = controlledFilterValues ?? internalFilters;
  const setFilterValues = useCallback(
    (values: FilterValues) => {
      if (onFilterChange) {
        onFilterChange(values);
      } else {
        setInternalFilters(values);
      }
    },
    [onFilterChange],
  );

  const handleFilterChange = useCallback(
    (key: string, value: FilterValues[string]) => {
      setFilterValues({ ...filterValues, [key]: value });
    },
    [filterValues, setFilterValues],
  );

  const getRowKey = useCallback(
    (row: T, index: number): string | number => {
      if (rowKey) {
        if (typeof rowKey === "function") return rowKey(row);
        return String(row[rowKey] ?? index);
      }
      return index;
    },
    [rowKey],
  );

  const filteredData = applyFilters(data, filters, filterValues);

  return (
    <div className={cn(styles.wrapper, className)}>
      {(headerActions || filters.length > 0) && (
        <div className={styles.toolbar}>
          {headerActions && (
            <div className={styles.headerActions}>{headerActions}</div>
          )}
          {filters.length > 0 && (
            <div className={styles.filters}>
              {filters.map((filter) => (
                <div key={filter.columnKey} className={styles.filterItem}>
                  <TableFilter
                    config={filter}
                    value={filterValues[filter.columnKey]}
                    onChange={(v) => handleFilterChange(filter.columnKey, v)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <TableHead columns={columns} />
          <TableBody
            data={filteredData}
            columns={columns}
            getRowKey={getRowKey}
          />
        </table>
      </div>
    </div>
  );
}

function applyFilters<T>(
  data: T[],
  filters: FilterConfig[],
  values: FilterValues,
): T[] {
  if (filters.length === 0) return data;

  return data.filter((row) => {
    for (const filter of filters) {
      const val = values[filter.columnKey];
      if (
        val === undefined ||
        val === "" ||
        (Array.isArray(val) && val.length === 0)
      )
        continue;

      const rowVal = (row as Record<string, unknown>)[filter.columnKey];

      if (filter.type === "text") {
        const str = String(val).toLowerCase();
        if (!String(rowVal).toLowerCase().includes(str)) return false;
      } else if (filter.type === "select") {
        if (String(rowVal) !== String(val)) return false;
      } else if (filter.type === "multiselect") {
        const arr = val as (string | number)[];
        if (!arr.includes(rowVal as string | number)) return false;
      } else if (filter.type === "date") {
        const rowDate = rowVal
          ? new Date(rowVal as string).toISOString().slice(0, 10)
          : "";
        if (rowDate !== val) return false;
      } else if (filter.type === "daterange") {
        const [from, to] = val as [string?, string?];
        const rowDate = rowVal
          ? new Date(rowVal as string).toISOString().slice(0, 10)
          : "";
        if (from && rowDate < from) return false;
        if (to && rowDate > to) return false;
      }
    }
    return true;
  });
}
