import type { FilterConfig, FilterValues } from "@/types/table.types";

export function applyFilters<T>(
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
