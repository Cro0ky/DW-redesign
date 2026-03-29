"use client";

import { useTranslations } from "next-intl";

import { useStatisticInfo } from "@/features";
import { mapRatingsToChartData, RatingChart } from "@/ui";

import { StatisticBlock } from "..";
import styles from "./general-statistic.module.scss";

export const GeneralStatistic = () => {
  const { STATISTIC_BLOCKS, last20Ratings } = useStatisticInfo();
  const t = useTranslations();
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
      <RatingChart data={chartData} title={t("statistic.rating_chart_title")} />
    </div>
  );
};
