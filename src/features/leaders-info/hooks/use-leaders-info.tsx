import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { useIsHydrated } from "@/lib/hooks/use-is-hydrated";
import { queryKeys } from "@/lib/query/query-keys";
import type { IRankingRow } from "@/types/ranking.types";
import type { TableColumn } from "@/types/table.types";
import { Tooltip } from "@/ui";

import { fetchRankingPage } from "../leaders-ranking-fetch";

const PAGE_SIZE = 50;

function translateRank(t: ReturnType<typeof useTranslations>, code: string) {
  const key = `ranks.${code}`;
  const out = t(key);
  return out === key ? code : out;
}

export const useLeadersInfo = () => {
  const t = useTranslations();
  const isHydrated = useIsHydrated();

  const [page, setPage] = useState(1);

  const { data, isFetching, isPending, isError } = useQuery({
    queryKey: queryKeys.ranking.list(page, PAGE_SIZE),
    queryFn: async () => {
      const result = await fetchRankingPage(page, PAGE_SIZE);
      if (!result) throw new Error("ranking fetch failed");
      return result;
    },
    enabled: isHydrated,
    placeholderData: keepPreviousData,
  });

  const rows = data?.results ?? [];
  const count = data?.count ?? 0;
  const myPosition = data?.my_position ?? null;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count],
  );

  useEffect(() => {
    queueMicrotask(() => {
      setPage((p) => Math.min(p, totalPages));
    });
  }, [totalPages]);

  const goToPage = (n: number) => {
    setPage(Math.min(Math.max(1, n), totalPages));
  };

  const currentPage = Math.min(page, totalPages);
  const loading = isFetching || isPending;
  const error = isError;

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
        render: (row) => <>{translateRank(t, String(row.rank))}</>,
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
    isHydrated,
    error,
    count,
    myPosition,
    loading,
    page: currentPage,
    totalPages,
    rows,
    columns,
    goToPage,
  };
};
