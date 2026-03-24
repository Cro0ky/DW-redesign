"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { GeneralStatistic } from "./components";
import styles from "./statistic-info.module.scss";

type TTabsType = "general" | "rating";
const TABS: TTabsType[] = ["general", "rating"];

export const StatisticInfo = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<TTabsType>("general");

  const renderContent = () => {
    switch (activeTab) {
      case "rating":
      case "general":
        return <GeneralStatistic />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.statistic}>
        <div className={styles.head}>
          {TABS.map((tab) => (
            <div
              key={tab}
              className={cn(styles.head_item, {
                [styles.head_item_active]: tab === activeTab,
              })}
              onClick={() => setActiveTab(tab)}
            >
              {t(`statistic.tabs.${tab}`)}
            </div>
          ))}
        </div>

        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};
