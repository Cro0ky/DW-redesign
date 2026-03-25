"use client";

import { useTranslations } from "next-intl";

import { Table } from "@/ui";

import styles from "./history-info.module.scss";
import { useHistoryInfo } from "./hooks/use-history-info";

export const HistoryInfo = () => {
  const t = useTranslations();

  const {
    isHydrated,
    sessionId,
    error,
    count,
    loading,
    page,
    totalPages,
    rows,
    columns,
    goToPage,
  } = useHistoryInfo();

  if (!isHydrated) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>{t("history.loading")}</div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>{t("history.empty")}</div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{t("history.load_error")}</div>;
  }

  const tableLoading = loading && rows.length > 0;

  return (
    <div className={styles.root}>
      {loading && rows.length === 0 ? (
        <div className={styles.empty}>{t("history.loading")}</div>
      ) : !loading && rows.length === 0 ? (
        <div className={styles.empty}>{t("history.empty")}</div>
      ) : (
        <Table
          data={rows}
          columns={columns}
          rowKey="id"
          isLoading={tableLoading}
          loadingLabel={t("history.loading")}
          paginationMeta={t("history.pagination.total", { count })}
          pagination={{
            page,
            totalPages,
            onPageChange: goToPage,
            isLoading: loading,
            ariaNavLabel: t("history.pagination.nav_label"),
            ariaPrevLabel: t("history.pagination.prev"),
            ariaNextLabel: t("history.pagination.next"),
            getPageAriaLabel: (n) => t("history.pagination.page_n", { n }),
            className: styles.pagination,
          }}
        />
      )}
    </div>
  );
};
