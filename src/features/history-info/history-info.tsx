"use client";

import { useTranslations } from "next-intl";

import type { ISessionHistoryItem } from "@/types/history.types";
import { Button, Table } from "@/ui";

import styles from "./history-info.module.scss";
import { useHistoryInfo } from "./hooks/use-history-info";

export const HistoryInfo = () => {
  const t = useTranslations("history");

  const {
    isHydrated,
    sessionId,
    error,
    count,
    loading,
    page,
    totalPages,
    nextUrl,
    rows,
    columns,
    handleChangePage,
  } = useHistoryInfo();

  if (!isHydrated) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>{t("loading")}</div>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>{t("empty")}</div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{t("load_error")}</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <span className={styles.meta}>{t("pagination.total", { count })}</span>
        <div className={styles.pagination}>
          <span className={styles.pageLabel}>
            {t("pagination.page", { current: page, total: totalPages })}
          </span>
          <Button
            type="button"
            color="gray"
            disabled={loading || page <= 1}
            onClick={() => handleChangePage("decrement")}
          >
            {t("pagination.prev")}
          </Button>
          <Button
            type="button"
            color="gray"
            disabled={loading || !nextUrl}
            onClick={() => handleChangePage("increment")}
          >
            {t("pagination.next")}
          </Button>
        </div>
      </div>

      {loading && rows.length === 0 ? (
        <div className={styles.empty}>{t("loading")}</div>
      ) : !loading && rows.length === 0 ? (
        <div className={styles.empty}>{t("empty")}</div>
      ) : (
        <Table<ISessionHistoryItem> data={rows} columns={columns} rowKey="id" />
      )}
    </div>
  );
};
