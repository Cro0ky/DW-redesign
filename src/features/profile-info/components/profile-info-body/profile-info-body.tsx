"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ProfileTab, StatisticInfo } from "@/features";

import styles from "./profile-info-body.module.scss";

type THeadTabs = "statistic" | "profile";

const TABS: THeadTabs[] = ["profile", "statistic"];

export const ProfileInfoBody = () => {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<THeadTabs>("profile");

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "statistic":
        return <StatisticInfo />;
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
