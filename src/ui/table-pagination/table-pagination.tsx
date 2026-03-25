"use client";

import cn from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./table-pagination.module.scss";

const DEFAULT_WINDOW = 6;

type PaginationItem =
  | { kind: "page"; n: number }
  | { kind: "ellipsis"; key: string };

function buildPaginationItems(
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

export interface TablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  maxVisible?: number;
  ariaNavLabel: string;
  ariaPrevLabel: string;
  ariaNextLabel: string;
  getPageAriaLabel: (n: number) => string;
  className?: string;
}

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
  maxVisible = DEFAULT_WINDOW,
  ariaNavLabel,
  ariaPrevLabel,
  ariaNextLabel,
  getPageAriaLabel,
  className,
}: TablePaginationProps) {
  const items = buildPaginationItems(page, totalPages, maxVisible);

  return (
    <nav className={cn(styles.root, className)} aria-label={ariaNavLabel}>
      <div className={styles.bar}>
        <button
          type="button"
          className={styles.pageArrow}
          disabled={isLoading || page <= 1}
          aria-label={ariaPrevLabel}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className={styles.pageArrowIcon} strokeWidth={2.5} />
        </button>
        {items.map((item) =>
          item.kind === "ellipsis" ? (
            <span key={item.key} className={styles.ellipsis} aria-hidden>
              …
            </span>
          ) : (
            <button
              key={item.n}
              type="button"
              className={cn(
                styles.pageNum,
                item.n === page && styles.pageNumActive,
              )}
              disabled={isLoading}
              aria-label={getPageAriaLabel(item.n)}
              aria-current={item.n === page ? "page" : undefined}
              onClick={() => onPageChange(item.n)}
            >
              {item.n}
            </button>
          ),
        )}
        <button
          type="button"
          className={styles.pageArrow}
          disabled={isLoading || page >= totalPages}
          aria-label={ariaNextLabel}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className={styles.pageArrowIcon} strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
