import { flexRender, Row, RowData } from "@tanstack/react-table";

import styles from "./table-body.module.scss";

export function TableBody<TData extends RowData>({
  rows,
}: {
  rows: Row<TData>[];
}) {
  return (
    <tbody className={styles.body}>
      {rows.map((row) => (
        <tr key={row.id} className={styles.row}>
          {row.getVisibleCells().map((cell) => {
            const meta = cell.column.columnDef.meta as
              | { width?: string; align?: "left" | "center" | "right" }
              | undefined;
            return (
              <td
                key={cell.id}
                className={styles.cell}
                style={{
                  maxWidth: meta?.width,
                  textAlign: meta?.align ?? "left",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
