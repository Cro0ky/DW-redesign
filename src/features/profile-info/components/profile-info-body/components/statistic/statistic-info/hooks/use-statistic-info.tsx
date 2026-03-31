"use client";

import { useQuery } from "@tanstack/react-query";
import { List, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/routing";
import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import { getUserUuid } from "@/utils/getUserUuid";

import { IStatisticBlockProps } from "../components";

export const useStatisticInfo = () => {
  const t = useTranslations();
  const userId = getUserUuid()?.user_id ?? "";
  const router = useRouter();

  const statisticQuery = useQuery({
    queryKey: queryKeys.userStatistic(userId),
    queryFn: () => userService.getStatistic(userId),
    enabled: Boolean(userId),
  });

  const ranksQuery = useQuery({
    queryKey: queryKeys.userRanks(userId),
    queryFn: () => userService.getRanks(userId),
    enabled: Boolean(userId),
  });

  const statistic = statisticQuery.data ?? null;
  const ranks = ranksQuery.data ?? null;
  const last20Ratings = statistic?.rating_statistic?.last_20_ratings;

  const getBlocks = (): IStatisticBlockProps[] | undefined => {
    if (!statistic || !ranks) return;

    const { rating_statistic } = statistic;
    const { user_rank, experience, position } = ranks;
    if (rating_statistic)
      return [
        {
          counter: position,
          subtitle: t("statistic.place"),
          params: [
            {
              value: String(experience),
              title: t("statistic.rating_points"),
            },
            {
              value: user_rank,
              title: t("statistic.rank"),
            },
          ],
          button: {
            children: t("statistic.leaders_button"),
            iconLeft: <Trophy />,
            onClick: () => router.push("/leaders"),
          },
        },
        {
          counter: rating_statistic.matches_rf + rating_statistic.matches_nato,
          subtitle: t("statistic.matches"),
          circleColor: "yellow",
          params: [
            {
              value: String(statistic?.rating_statistic.matches_rf),
              title: t("statistic.for_russia"),
            },
            {
              value: String(statistic?.rating_statistic.matches_nato),
              title: t("statistic.for_nato"),
            },
          ],
          button: {
            children: t("statistic.match_history"),
            iconLeft: <List />,
            onClick: () => router.push("/history"),
          },
        },

        {
          counter: rating_statistic.total_wins_percentage,
          isPercent: true,
          circleColor: "green",
          subtitle: t("statistic.win_percentage"),
          params: [
            {
              value: String(rating_statistic.win_percentage_rf) + "%",
              title: t("statistic.for_russia"),
            },
            {
              value: String(rating_statistic.win_percentage_nato) + "%",
              title: t("statistic.for_nato"),
            },

            {
              value: String(rating_statistic.win_percentage_major) + "%",
              title: t("statistic.win_major"),
            },
            {
              value: String(rating_statistic.win_percentage_minor) + "%",
              title: t("statistic.win_minor"),
            },
          ],
        },
      ];
  };

  const STATISTIC_BLOCKS = getBlocks();

  return { STATISTIC_BLOCKS, last20Ratings };
};
