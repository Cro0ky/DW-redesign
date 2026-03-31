import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { ISessionHistoryItem } from "@/types/history.types";
import type { TableColumn } from "@/types/table.types";
import { Tooltip } from "@/ui";
import { getUserUuid } from "@/utils/getUserUuid";

const PAGE_SIZE = 20;

export const useHistoryInfo = () => {
  const t = useTranslations();

  const user = getUserUuid();
  const userId = user?.user_id ?? "";

  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: queryKeys.sessionHistory(userId, page),
    queryFn: () => userService.getSessionHistory(userId, page),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });

  const rows = data?.results ?? [];
  const count = data?.count ?? 0;
  const nextUrl = data?.next ?? null;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count],
  );

  const goToPage = useCallback(
    (n: number) => {
      const safe = Math.min(Math.max(1, n), totalPages);
      setPage(safe);
    },
    [totalPages, setPage],
  );

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const columns: TableColumn<ISessionHistoryItem>[] = useMemo(
    () => [
      {
        key: "created_at",
        header: t("history.columns.created_at"),
        width: "110px",
      },
      {
        key: "name",
        header: t("history.columns.name"),
        width: "250px",
        render: (row) => <Tooltip content={row.name}>{row.name}</Tooltip>,
      },
      {
        key: "opponent_name",
        header: t("history.columns.opponent"),
        width: "300px",
        render: (row) => (
          <Tooltip content={row.opponent_name}>{row.opponent_name}</Tooltip>
        ),
      },
      {
        key: "game_type",
        header: t("history.columns.game_type"),
        width: "150px",
        render: (row) => <>{t(`game_type.${row.game_type}`)}</>,
      },
      {
        key: "game_sub_type",
        header: t("history.columns.game_sub_type"),
        width: "120px",
        render: (row) => <>{t(`sub_type.${row.game_sub_type}`)}</>,
      },
      {
        key: "status",
        header: t("history.columns.status"),
        width: "230px",
        render: (row) => <>{t(`status.${row.status}`)}</>,
      },
      {
        key: "rating",
        header: t("history.columns.rating"),
        width: "80px",
      },
    ],
    [t],
  );

  return {
    isLoading,
    isError,
    count,
    page,
    totalPages,
    nextUrl,
    rows,
    columns,
    goToPage,
  };
};
