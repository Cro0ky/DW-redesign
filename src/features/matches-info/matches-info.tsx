"use client";

import { useTranslations } from "next-intl";

import { Table } from "@/ui";

import { useMatchesInfo } from "./hooks/use-matches-info";
import styles from "./matches-info.module.scss";

export const MatchesInfo = () => {
  const t = useTranslations();

  const {
    isLoading,
    isError,
    displayRows,
    columns,
    count,
    page,
    totalPages,
    goToPage,
  } = useMatchesInfo();

  if (isLoading) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>{t("matches.loading")}</div>
      </div>
    );
  }

  if (isError) {
    return <div className={styles.error}>{t("matches.load_error")}</div>;
  }

  const tableLoading = isLoading && displayRows.length > 0;

  const paginationMeta = (
    <span className={styles.metaRow}>
      <span className={styles.meta}>
        {t("matches.pagination.total", { count })}
      </span>
    </span>
  );

  return (
    <div className={styles.root}>
      {isLoading && displayRows.length === 0 ? (
        <div className={styles.empty}>{t("matches.loading")}</div>
      ) : (
        <Table
          data={displayRows}
          columns={columns}
          rowKey="id"
          className={styles.tableHost}
          isLoading={tableLoading}
          loadingLabel={t("matches.loading")}
          paginationMeta={paginationMeta}
          pagination={{
            page,
            totalPages,
            onPageChange: goToPage,
            isLoading,
            ariaNavLabel: t("matches.pagination.nav_label"),
            ariaPrevLabel: t("matches.pagination.prev"),
            ariaNextLabel: t("matches.pagination.next"),
            getPageAriaLabel: (n: number) =>
              t("matches.pagination.page_n", { n }),
            className: styles.pagination,
          }}
        />
      )}
    </div>
  );
};
