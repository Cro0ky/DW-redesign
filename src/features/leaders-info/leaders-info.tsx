"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { LeadersBanner } from "@/features";
import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import { useUserStore } from "@/store";
import { Table } from "@/ui";
import { getUserUuid } from "@/utils/getUserUuid";

import { useLeadersInfo } from "./hooks/use-leaders-info";
import styles from "./leaders-info.module.scss";

export const LeadersInfo = () => {
  const t = useTranslations();

  const {
    isHydrated,
    error,
    count,
    myPosition,
    loading,
    page,
    totalPages,
    rows,
    columns,
    goToPage,
  } = useLeadersInfo();

  const { username, rank, experience } = useUserStore();
  const userId = getUserUuid();
  const statisticUid = userId?.user_id ?? "";

  const { data: statistic } = useQuery({
    queryKey: queryKeys.user.statistic(statisticUid),
    queryFn: () => userService.getStatistic(statisticUid),
    enabled: !!statisticUid && isHydrated,
  });

  const me = [
    myPosition,
    `${username} (Вы)`,
    t(`ranks.${rank}`),
    experience,
    `${statistic?.rating_statistic.total_wins_percentage ?? "—"}%`,
  ];

  if (!isHydrated) {
    return (
      <div className={styles.root}>
        <div className={styles.empty}>{t("leaders.loading")}</div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{t("leaders.load_error")}</div>;
  }

  const tableLoading = loading && rows.length > 0;

  const paginationMeta = (
    <span className={styles.metaRow}>
      <span className={styles.meta}>
        {t("leaders.pagination.total", { count })}
      </span>
    </span>
  );

  return (
    <div className={styles.root}>
      <LeadersBanner />
      {loading && rows.length === 0 ? (
        <div className={styles.empty}>{t("leaders.loading")}</div>
      ) : !loading && rows.length === 0 ? (
        <div className={styles.empty}>{t("leaders.empty")}</div>
      ) : (
        <Table
          data={rows}
          columns={columns}
          rowKey="id"
          isLoading={tableLoading}
          loadingLabel={t("leaders.loading")}
          paginationMeta={paginationMeta}
          pagination={{
            page,
            totalPages,
            onPageChange: goToPage,
            isLoading: loading,
            ariaNavLabel: t("leaders.pagination.nav_label"),
            ariaPrevLabel: t("leaders.pagination.prev"),
            ariaNextLabel: t("leaders.pagination.next"),
            getPageAriaLabel: (n: number) =>
              t("leaders.pagination.page_n", { n }),
            className: styles.pagination,
          }}
        />
      )}

      <div className={styles.myPosition}>
        {me.map((i, index) => (
          <span className={styles.myPosition_item} key={index}>
            {i}
          </span>
        ))}
      </div>
    </div>
  );
};
