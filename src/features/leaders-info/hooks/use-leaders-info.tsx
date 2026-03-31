import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { IRankingRow } from "@/types/ranking.types";
import type { TableColumn } from "@/types/table.types";
import { Tooltip } from "@/ui";

const PAGE_SIZE = 50;

export const useLeadersInfo = () => {
  const t = useTranslations();

  const [page, setPage] = useState(1);

  const { data, isError, isLoading } = useQuery({
    queryKey: queryKeys.ranking(page, PAGE_SIZE),
    queryFn: () => userService.getRanking(page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  const rows = data?.results ?? [];
  const count = data?.count ?? 0;
  const myPosition = data?.my_position ?? null;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count],
  );

  const goToPage = useCallback(
    (n: number) => {
      setPage(Math.min(Math.max(1, n), totalPages));
    },
    [totalPages],
  );

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const columns: TableColumn<IRankingRow>[] = useMemo(
    () => [
      {
        key: "position",
        header: t("leaders.columns.place"),
        width: "72px",
      },
      {
        key: "username",
        header: t("leaders.columns.username"),
        width: "200px",
        render: (row) => (
          <Tooltip content={row.username}>{row.username}</Tooltip>
        ),
      },
      {
        key: "rank",
        header: t("leaders.columns.rank"),
        width: "160px",
        render: (row) => <>{t(`ranks.${row.rank}`)}</>,
      },
      {
        key: "experience",
        header: t("leaders.columns.experience"),
        width: "120px",
      },
      {
        key: "win_percentage",
        header: t("leaders.columns.win_percentage"),
        width: "110px",
        render: (row) => <>{row.win_percentage}%</>,
      },
    ],
    [t],
  );

  return {
    isLoading,
    isError,
    count,
    myPosition,
    page,
    totalPages,
    rows,
    columns,
    goToPage,
  };
};
