import { keepPreviousData, useQuery } from "@tanstack/react-query";
import cn from "classnames";
import { RefreshCw, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useIsHydrated } from "@/lib/hooks/use-is-hydrated";
import { queryKeys } from "@/lib/query/query-keys";
import type { ISessionListItem } from "@/types/session.types";
import type { TableColumn } from "@/types/table.types";
import { GameSide } from "@/types/types";
import { Button } from "@/ui";

import tableStyles from "../matches-info.module.scss";
import { fetchSessionsPage } from "../matches-session-fetch";

const PAGE_SIZE = 20;

type MatchesTableRow = ISessionListItem & {
  rowIndex: number;
  statusLabel: string;
  modeLabel: string;
  opponentRole: string;
  opponentDisplay: string;
  connectAction: string;
  settingsAction: string;
};

function translateCode(
  t: ReturnType<typeof useTranslations>,
  prefix: string,
  code: string,
) {
  const key = `${prefix}.${code}`;
  const out = t(key);
  return out === key ? code : out;
}

function opponentRoleLabel(
  t: ReturnType<typeof useTranslations>,
  availableSide: string,
) {
  const side = availableSide?.toUpperCase?.() ?? "";
  if (side === GameSide.NATO) return t("matches.side_opponent.russia");
  if (side === GameSide.RUSSIA) return t("matches.side_opponent.nato");
  return availableSide || "—";
}

export const useMatchesInfo = () => {
  const t = useTranslations();
  const isHydrated = useIsHydrated();

  const [page, setPage] = useState(1);

  const {
    data,
    isFetching,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: queryKeys.sessions.list(page, PAGE_SIZE),
    queryFn: async () => {
      const result = await fetchSessionsPage(page, PAGE_SIZE);
      if (!result) throw new Error("sessions fetch failed");
      return result;
    },
    enabled: isHydrated,
    placeholderData: keepPreviousData,
  });

  const count = data?.count ?? 0;
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count],
  );

  // Страница из стейта может оказаться больше числа страниц после смены данных — поджимаем.
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

  const formatGameSubType = useCallback(
    (code: string) => translateCode(t, "matches.game_sub_type", code),
    [t],
  );
  const formatGameType = useCallback(
    (code: string) => translateCode(t, "matches.game_type", code),
    [t],
  );

  const displayRows: MatchesTableRow[] = useMemo(() => {
    const list = data?.results ?? [];
    return list.map((row, idx) => ({
      ...row,
      rowIndex: (currentPage - 1) * PAGE_SIZE + idx + 1,
      statusLabel: formatGameSubType(row.game_sub_type),
      modeLabel: formatGameType(row.game_type),
      opponentRole: opponentRoleLabel(t, row.available_game_side),
      opponentDisplay:
        row.opponent_name && String(row.opponent_name).trim()
          ? row.opponent_name
          : "—",
      connectAction: "",
      settingsAction: "",
    }));
  }, [data?.results, currentPage, formatGameSubType, formatGameType, t]);

  const columns: TableColumn<MatchesTableRow>[] = useMemo(
    () => [
      {
        key: "rowIndex",
        header: t("matches.columns.index"),
      },
      {
        key: "name",
        header: t("matches.columns.game_name"),
      },
      {
        key: "statusLabel",
        header: t("matches.columns.game_status"),
      },
      {
        key: "modeLabel",
        header: t("matches.columns.game_mode"),
        align: "center",
      },
      {
        key: "opponentDisplay",
        header: t("matches.columns.opponent"),
      },
      {
        key: "opponentRole",
        header: t("matches.columns.opponent_role"),
      },
      {
        key: "tick_time",
        header: t("matches.columns.tick_time"),
        width: "96px",
      },
      {
        key: "connectAction",
        header: (
          <Button
            type="button"
            variant="filled"
            className={tableStyles.headerCta}
          >
            {t("matches.actions.create_game")}
          </Button>
        ),
        render: () => (
          <Button
            type="button"
            color="white"
            variant="outline"
            className={tableStyles.rowCta}
          >
            {t("matches.actions.connect")}
          </Button>
        ),
      },
      {
        key: "settingsAction",
        header: (
          <Button
            type="button"
            color="white"
            variant="outline"
            withoutBorder
            className={tableStyles.iconBtn}
            aria-label={t("matches.actions.refresh_aria")}
            disabled={loading}
            onClick={() => void refetch()}
            iconLeft={
              <RefreshCw
                className={cn(
                  tableStyles.headerRefreshIcon,
                  loading && tableStyles.headerRefreshIconSpin,
                )}
                strokeWidth={2}
                aria-hidden
              />
            }
          />
        ),
        width: "52px",
        render: () => (
          <Button
            type="button"
            color="white"
            variant="outline"
            withoutBorder
            className={tableStyles.iconBtn}
            aria-label={t("matches.actions.settings_aria")}
            iconLeft={<Settings strokeWidth={2} aria-hidden />}
          />
        ),
      },
    ],
    [t, loading, refetch],
  );

  return {
    isHydrated,
    error,
    count,
    loading,
    page: currentPage,
    totalPages,
    displayRows,
    columns,
    goToPage,
    refetch,
    pageSize: PAGE_SIZE,
  };
};
