import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import type { IRankingRow } from "@/types/ranking.types";
import type { TableColumn } from "@/types/table.types";

import {
  fetchRankingPage,
  initialLeadersRankingState,
  leadersRankingReducer,
} from "../leaders-ranking-fetch";
import { Tooltip } from "@/ui";

const PAGE_SIZE = 50;

function translateRank(t: ReturnType<typeof useTranslations>, code: string) {
  const key = `ranks.${code}`;
  const out = t(`leaders.${key}`);
  return out === key ? code : out;
}

export const useLeadersInfo = () => {
  const t = useTranslations();

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setIsHydrated(true));
  }, []);

  const [page, setPage] = useState(1);
  const [state, dispatch] = useReducer(
    leadersRankingReducer,
    initialLeadersRankingState,
  );

  const { rows, count, myPosition, loading, error } = state;

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

  const load = useCallback(async () => {
    if (!isHydrated) return;
    dispatch({ type: "fetch_start" });
    const data = await fetchRankingPage(page, PAGE_SIZE);
    if (data) {
      dispatch({ type: "fetch_ok", data });
    } else {
      dispatch({ type: "fetch_err" });
    }
  }, [isHydrated, page]);

  useEffect(() => {
    void load();
  }, [load]);

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
    page,
    totalPages,
    rows,
    columns,
    goToPage,
  };
};
