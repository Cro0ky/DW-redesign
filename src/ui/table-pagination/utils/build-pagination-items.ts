import { PaginationItem } from "@/types/table-pagination.types";

export function buildPaginationItems(
  current: number,
  total: number,
  maxVisible: number,
): PaginationItem[] {
  if (total < 1) return [];
  if (total === 1) return [{ kind: "page", n: 1 }];

  const pages = new Set<number>([1, total]);

  const innerLeft = Math.max(2, current - Math.floor(maxVisible / 2));
  const innerRight = Math.min(total - 1, innerLeft + maxVisible - 1);
  const from = Math.max(2, innerRight - maxVisible + 1);

  for (let p = from; p <= innerRight; p++) {
    pages.add(p);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const items: PaginationItem[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i];
    if (i > 0 && n - sorted[i - 1] > 1) {
      items.push({
        kind: "ellipsis",
        key: `gap-${sorted[i - 1]}-${n}`,
      });
    }
    items.push({ kind: "page", n });
  }

  return items;
}
