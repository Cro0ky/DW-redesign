"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import cn from "classnames";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

import type { FilterConfig, FilterValues, TableColumn, TableProps } from "@/ui";

import { TablePagination } from "@/ui";
import bodyStyles from "./components/table-body/table-body.module.scss";
import { TableFilter } from "./components/table-filter/table-filter";
import headStyles from "./components/table-head/table-head.module.scss";
import styles from "./table.module.scss";

function tableColumnsToColumnDefs<T extends Record<string, unknown>>(
  columns: TableColumn<T>[],
): ColumnDef<T>[] {
  return columns.map((col) => ({
    id: col.key,
    accessorKey: col.key,
    header: col.header,
    enableSorting: col.sortable ?? false,
    meta: {
      width: col.width,
      align: col.align,
    },
    cell: ({ row, getValue }) => {
      const value = getValue();
      return col.render
        ? col.render(row.original, value)
        : (value as ReactNode);
    },
  }));
}

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
          <thead className={headStyles.head}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    | { width?: string; align?: "left" | "center" | "right" }
                    | undefined;
                  const canSort = header.column.getCanSort();
                  return (
                    <th
                      key={header.id}
                      className={headStyles.cell}
                      style={{
                        width: meta?.width,
                        textAlign: meta?.align ?? "left",
                      }}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          className={styles.sortButton}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <span className={styles.sortIcon} aria-hidden>
                            {header.column.getIsSorted() === "asc"
                              ? "↑"
                              : header.column.getIsSorted() === "desc"
                                ? "↓"
                                : ""}
                          </span>
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className={bodyStyles.body}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={bodyStyles.row}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as
                    | { width?: string; align?: "left" | "center" | "right" }
                    | undefined;
                  return (
                    <td
                      key={cell.id}
                      className={bodyStyles.cell}
                      style={{
                        maxWidth: meta?.width,
                        textAlign: meta?.align ?? "left",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
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
