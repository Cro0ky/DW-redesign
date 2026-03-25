import type { TableColumn } from "@/types/table.types";
import type { ISessionHistoryItem } from "@/types/history.types";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/features/history-info/history-info.module.scss";
import { useTranslations } from "next-intl";
import { getUserUuid } from "@/utils/getUserUuid";
import { userService } from "@/lib/api/services/user/user.service";

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
  const [rows, setRows] = useState<ISessionHistoryItem[]>([]);
  const [count, setCount] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleChangePage = (variant: "increment" | "decrement") => {
    setPage((prev) =>
      variant === "increment" ? prev + 1 : Math.max(1, prev - 1),
    );
  };

  const load = useCallback(async () => {
    if (!isHydrated) return;
    if (!sessionId) {
      setLoading(false);
      setRows([]);
      setCount(0);
      setNextUrl(null);
      return;
    }
    setLoading(true);
    setError(false);
    try {
      const data = await userService.getSessionHistory(sessionId, page);
      setRows(data.results);
      setCount(data.count);
      setNextUrl(data.next);
    } catch {
      setError(true);
      setRows([]);
      setCount(0);
      setNextUrl(null);
    } finally {
      setLoading(false);
    }
  }, [isHydrated, sessionId, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

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
    handleChangePage,
  };
};
