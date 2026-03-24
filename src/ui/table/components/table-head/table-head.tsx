import type { TableColumn } from "@/ui";

import styles from "./table-head.module.scss";

interface TableHeadProps<T> {
  columns: TableColumn<T>[];
}

export function TableHead<T>({ columns }: TableHeadProps<T>) {
  return (
    <thead className={styles.head}>
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            className={styles.cell}
            style={{
              width: col.width,
              textAlign: col.align ?? "left",
            }}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
