import cn from "classnames";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { RefreshCw, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

import { sessionService } from "@/lib/api/services/session/session.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { ISessionListItem } from "@/types/session.types";
import type { TableColumn } from "@/types/table.types";
import { Button, EModalName } from "@/ui";

import tableStyles from "../matches-info.module.scss";
import { useModalStore } from "@/store/modal/modal.store";

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

export const useMatchesInfo = () => {
  const t = useTranslations();
  const { openModal } = useModalStore();

  const [page, setPage] = useState(1);

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: queryKeys.sessions(page, PAGE_SIZE),
    queryFn: () => sessionService.list(page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  const rows = data?.results ?? [];
  const count = data?.count ?? 0;

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

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const displayRows: MatchesTableRow[] = useMemo(
    () =>
      rows.map((row, idx) => ({
        ...row,
        rowIndex: (currentPage - 1) * PAGE_SIZE + idx + 1,
        statusLabel: t(`matches.game_sub_type.${row.game_sub_type}`),
        modeLabel: t(`matches.game_type.${row.game_type}`),
        opponentRole: row.available_game_side
          ? t(`matches.side_opponent.${row.available_game_side.toUpperCase()}`)
          : "-",
        opponentDisplay: String(row.opponent_name).trim() ?? "—",
        connectAction: "",
        settingsAction: "",
      })),
    [rows, currentPage, t],
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
            onClick={() =>
              openModal({ name: EModalName.CREATE_SINGLE_SESSION_MODAL })
            }
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
            disabled={isLoading}
            onClick={() => void refetch()}
            iconLeft={
              <RefreshCw
                className={cn(
                  tableStyles.headerRefreshIcon,
                  isLoading && tableStyles.headerRefreshIconSpin,
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
    [t, isLoading, refetch],
  );

  return {
    isError,
    isLoading,
    count,
    page: currentPage,
    totalPages,
    displayRows,
    columns,
    goToPage,
    refetch,
    pageSize: PAGE_SIZE,
  };
};
