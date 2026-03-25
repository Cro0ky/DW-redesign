import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import type { ISessionHistoryItem } from "@/types/history.types";
import type { TableColumn } from "@/types/table.types";
import { getUserUuid } from "@/utils/getUserUuid";

import {
  fetchSessionHistoryPage,
  historySessionReducer,
  initialHistorySessionState,
} from "../history-session-fetch";

const PAGE_SIZE = 20;

function translateOrRaw(
  t: ReturnType<typeof useTranslations>,
  prefix: "game_type" | "status" | "sub_type",
  code: string,
): string {
  const key = `${prefix}.${code}`;
  const out = t(key as never);
  return out === key ? code : out;
}

export const useHistoryInfo = () => {
  const t = useTranslations("history");

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const user = isHydrated ? getUserUuid() : null;
  const sessionId = user?.user_id ?? "";

  const [page, setPage] = useState(1);
  const [state, dispatch] = useReducer(
    historySessionReducer,
    initialHistorySessionState,
  );

  const { rows, count, nextUrl, loading, error } = state;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count],
  );

  const goToPage = useCallback(
    (n: number) => {
      const safe = Math.min(Math.max(1, n), totalPages);
      setPage(safe);
    },
    [totalPages],
  );

  const load = useCallback(async () => {
    if (!isHydrated) return;

    if (!sessionId) {
      dispatch({ type: "no_session" });
      return;
    }

    dispatch({ type: "fetch_start" });
    const data = await fetchSessionHistoryPage(sessionId, page);

    if (data) {
      dispatch({ type: "fetch_ok", data });
    } else {
      dispatch({ type: "fetch_err" });
    }
  }, [isHydrated, sessionId, page]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const columns: TableColumn<ISessionHistoryItem>[] = useMemo(
    () => [
      {
        key: "created_at",
        header: t("columns.created_at"),
        width: "110px",
      },
      {
        key: "name",
        header: t("columns.name"),
        width: "250px",
      },
      {
        key: "opponent_name",
        header: t("columns.opponent"),
        width: "300px",
        render: (row) => <>{row.opponent_name}</>,
      },
      {
        key: "game_type",
        header: t("columns.game_type"),
        width: "150px",
        render: (row) => translateOrRaw(t, "game_type", String(row.game_type)),
      },
      {
        key: "turns_count",
        header: t("columns.turns_count"),
        width: "72px",
      },
      {
        key: "sub_turn_duration",
        header: t("columns.sub_turn_duration"),
        width: "84px",
      },
      {
        key: "game_sub_type",
        header: t("columns.game_sub_type"),
        width: "120px",
        render: (row) =>
          translateOrRaw(t, "sub_type", String(row.game_sub_type)),
      },
      {
        key: "status",
        header: t("columns.status"),
        width: "230px",
        render: (row) => translateOrRaw(t, "status", String(row.status)),
      },
      {
        key: "rating",
        header: t("columns.rating"),
        width: "80px",
      },
    ],
    [t],
  );
  return {
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
    goToPage,
  };
};
