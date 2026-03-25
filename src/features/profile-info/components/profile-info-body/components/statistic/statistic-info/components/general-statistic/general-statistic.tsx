"use client";

import { useTranslations } from "next-intl";

import { useStatisticInfo } from "@/features";
import { useStatisticStore } from "@/store";
import { mapRatingsToChartData, RatingChart } from "@/ui";

import { StatisticBlock } from "..";
import styles from "./general-statistic.module.scss";

export const GeneralStatistic = () => {
  const { STATISTIC_BLOCKS } = useStatisticInfo();
  const t = useTranslations();
  const last20Ratings = useStatisticStore(
    (s) => s.statistic?.rating_statistic?.last_20_ratings,
  );
  const chartData =
    last20Ratings?.length &&
    last20Ratings.some((v) => Number.isFinite(Number(v)))
      ? mapRatingsToChartData(last20Ratings)
      : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {STATISTIC_BLOCKS?.map((item) => (
          <StatisticBlock {...item} key={item.subtitle} />
        ))}
      </div>
      {chartData.length > 0 && (
        <RatingChart
          data={chartData}
          title={t("statistic.rating_chart_title")}
        />
      )}
    </div>
  );
};
