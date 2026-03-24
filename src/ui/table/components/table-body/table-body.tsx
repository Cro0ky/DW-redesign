import type { ReactNode } from "react";

import type { TableColumn } from "@/ui";

import styles from "./table-body.module.scss";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey: (row: T, index: number) => string | number;
}

export function TableBody<T extends Record<string, unknown>>({
  data,
  columns,
  getRowKey,
}: TableBodyProps<T>) {
  return (
    <tbody className={styles.body}>
      {data.map((row, index) => (
        <tr key={getRowKey(row, index)} className={styles.row}>
          {columns.map((col) => {
            const value = row[col.key];
            const content = col.render
              ? col.render(row, value)
              : (value as ReactNode);

            return (
              <td
                key={col.key}
                className={styles.cell}
                style={{
                  width: col.width,
                  textAlign: col.align ?? "left",
                }}
              >
                {content}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
