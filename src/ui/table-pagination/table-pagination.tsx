"use client";

import cn from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./table-pagination.module.scss";

const DEFAULT_WINDOW = 6;

export interface TablePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  /** Сколько номеров страниц показывать в «окне» */
  maxVisible?: number;
  ariaNavLabel: string;
  ariaPrevLabel: string;
  ariaNextLabel: string;
  getPageAriaLabel: (n: number) => string;
  className?: string;
}

function getVisiblePageNumbers(
  current: number,
  total: number,
  max: number,
): number[] {
  if (total < 1) return [];
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const half = Math.floor(max / 2);
  let start = current - half;
  if (start < 1) start = 1;
  let end = start + max - 1;
  if (end > total) {
    end = total;
    start = Math.max(1, end - max + 1);
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
  const pageNumbers = getVisiblePageNumbers(page, totalPages, maxVisible);

  return (
    <nav
      className={cn(styles.root, className)}
      aria-label={ariaNavLabel}
    >
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
        {pageNumbers.map((n) => (
          <button
            key={n}
            type="button"
            className={cn(
              styles.pageNum,
              n === page && styles.pageNumActive,
            )}
            disabled={isLoading}
            aria-label={getPageAriaLabel(n)}
            aria-current={n === page ? "page" : undefined}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        ))}
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
