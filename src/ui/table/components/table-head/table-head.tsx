import { flexRender, HeaderGroup, RowData } from "@tanstack/react-table";

import styles from "./table-head.module.scss";

export function TableHead<TData extends RowData>({
  headerGroups,
}: {
  headerGroups: HeaderGroup<TData>[];
}) {
  return (
    <thead className={styles.head}>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const meta = header.column.columnDef.meta as
              | { width?: string; align?: "left" | "center" | "right" }
              | undefined;
            const canSort = header.column.getCanSort();
            return (
              <th
                key={header.id}
                className={styles.cell}
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
  );
}
