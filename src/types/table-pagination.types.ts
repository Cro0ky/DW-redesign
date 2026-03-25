export type PaginationItem =
  | { kind: "page"; n: number }
  | { kind: "ellipsis"; key: string };

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
