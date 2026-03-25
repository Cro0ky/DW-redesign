import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

import type { TableColumn } from "@/types/table.types";

export function tableColumnsToColumnDefs<T extends Record<string, unknown>>(
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
