"use client";

import {
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { Loader2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import type { FilterValues, TableProps } from "@/ui";

import { TablePagination } from "@/ui";
import { TableFilter } from "./components/table-filter/table-filter";
import styles from "./table.module.scss";
import { tableColumnsToColumnDefs } from "./utils/table-columns-to-column-defs";
import { applyFilters } from "@/ui/table/utils/apply-filters";
import { TableBody } from "@/ui/table/components/table-body/table-body";
import { TableHead } from "./components";

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  headerActions,
  filters = [],
  filterValues: controlledFilterValues,
  onFilterChange,
  className,
  isLoading = false,
  loadingLabel,
  paginationMeta,
  pagination,
}: TableProps<T>) {
  const [internalFilters, setInternalFilters] = useState<FilterValues>({});
  const [sorting, setSorting] = useState<SortingState>([]);

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

  const filteredData = useMemo(
    () => applyFilters(data, filters, filterValues),
    [data, filters, filterValues],
  );

  const columnDefs = useMemo(
    () => tableColumnsToColumnDefs(columns),
    [columns],
  );

  const table = useReactTable({
    data: filteredData,
    columns: columnDefs,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (originalRow, index) => {
      if (rowKey) {
        if (typeof rowKey === "function") {
          return String(rowKey(originalRow));
        }
        return String(originalRow[rowKey as keyof T] ?? index);
      }
      return String(index);
    },
  });

  const showPaginationBar = pagination != null || paginationMeta != null;

  return (
    <div
      className={cn(styles.wrapper, className)}
      aria-busy={isLoading ? true : undefined}
    >
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
          <TableHead headerGroups={table.getHeaderGroups()} />
          <TableBody rows={table.getRowModel().rows} />
        </table>
      </div>
      {isLoading ? (
        <div
          className={styles.loadingOverlay}
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2
            className={styles.loadingSpinner}
            strokeWidth={2.5}
            aria-hidden
          />
          {loadingLabel ? (
            <span className={styles.srOnly}>{loadingLabel}</span>
          ) : null}
        </div>
      ) : null}
      {showPaginationBar ? (
        <div
          className={cn(
            styles.topBar,
            !paginationMeta && styles.topBarPagerEnd,
          )}
        >
          {paginationMeta != null ? (
            <div className={styles.paginationMeta}>{paginationMeta}</div>
          ) : null}
          {pagination != null ? <TablePagination {...pagination} /> : null}
        </div>
      ) : null}
    </div>
  );
}
