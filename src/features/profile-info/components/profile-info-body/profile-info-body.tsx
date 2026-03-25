"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ProfileTab, StatisticInfo } from "@/features";

import styles from "./profile-info-body.module.scss";

type THeadTabs = "statistic" | "profile" | "history";

const TABS: THeadTabs[] = ["profile", "statistic", "history"];

export const ProfileInfoBody = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<THeadTabs>("statistic");

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "statistic":
        return <StatisticInfo />;
      case "history":
      case "profile":
        return <ProfileTab />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(styles.tab, {
              [styles.tab_active]: tab === activeTab,
            })}
          >
            {t(`profile.tabs.${tab}`)}
          </div>
        ))}
      </div>
      {renderSelectedComponent()}
    </div>
  );
};
