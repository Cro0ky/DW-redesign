import cn from "classnames";
import { RefreshCw, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import type { ISessionListItem } from "@/types/session.types";
import type { TableColumn } from "@/types/table.types";
import { GameSide } from "@/types/types";
import { Button } from "@/ui";

import tableStyles from "../matches-info.module.scss";
import {
  fetchSessionsPage,
  initialMatchesSessionState,
  matchesSessionReducer,
} from "../matches-session-fetch";

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

  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setIsHydrated(true));
  }, []);

  const [page, setPage] = useState(1);
  const [state, dispatch] = useReducer(
    matchesSessionReducer,
    initialMatchesSessionState,
  );

  const { rows, count, loading, error } = state;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(count / PAGE_SIZE)),
    [count],
  );

  const currentPage = Math.min(page, totalPages);

  const goToPage = useCallback(
    (n: number) => {
      setPage(Math.min(Math.max(1, n), totalPages));
    },
    [totalPages],
  );

  const load = useCallback(async () => {
    if (!isHydrated) return;
    dispatch({ type: "fetch_start" });
    const data = await fetchSessionsPage(currentPage, PAGE_SIZE);
    if (data) {
      dispatch({ type: "fetch_ok", data });
    } else {
      dispatch({ type: "fetch_err" });
    }
  }, [isHydrated, currentPage]);

  useEffect(() => {
    void load();
  }, [load]);

  const formatGameSubType = useCallback(
    (code: string) => translateCode(t, "matches.game_sub_type", code),
    [t],
  );

  const formatGameType = useCallback(
    (code: string) => translateCode(t, "matches.game_type", code),
    [t],
  );

  const displayRows: MatchesTableRow[] = useMemo(
    () =>
      rows.map((row, idx) => ({
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
      })),
    [rows, currentPage, formatGameSubType, formatGameType, t],
  );

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
            onClick={() => void load()}
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
    [t, loading, load],
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
    refetch: load,
    pageSize: PAGE_SIZE,
  };
};
