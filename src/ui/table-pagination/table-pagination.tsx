"use client";

import cn from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./table-pagination.module.scss";
import { buildPaginationItems } from "./utils/build-pagination-items";
import { TablePaginationProps } from "@/types/table-pagination.types";

const DEFAULT_WINDOW = 6;

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
