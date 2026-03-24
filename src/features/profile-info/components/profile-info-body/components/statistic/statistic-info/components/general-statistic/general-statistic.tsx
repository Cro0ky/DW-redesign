"use client";

import { useStatisticInfo } from "@/features/profile-info/components";

import { StatisticBlock } from "..";
import styles from "./general-statistic.module.scss";

export const GeneralStatistic = () => {
  const { STATISTIC_BLOCKS } = useStatisticInfo();
  return (
    <div className={styles.list}>
      {STATISTIC_BLOCKS?.map((item) => (
        <StatisticBlock {...item} key={item.subtitle} />
      ))}
    </div>
  );
};
