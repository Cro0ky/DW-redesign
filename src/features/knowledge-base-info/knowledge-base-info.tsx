"use client";

import cn from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { knowledgeBaseInfoData } from "@/features/knowledge-base-info/knowledge-base-info.const";
import { useModalStore } from "@/store/modal/modal.store";
import type { TBaseTitle } from "@/types/knowledge-base-info.types";
import { EModalName } from "@/ui";

import styles from "./knowledge-base-info.module.scss";

const TABS: TBaseTitle[] = [
  "basic_concepts",
  "stations",
  "infantry_and_pilots",
  "drones",
  "transport",
  "other",
];

export const KnowledgeBaseInfo = () => {
  const t = useTranslations();
  const { openModal } = useModalStore();
  const isInitialMountRef = useRef(true);

  const [activeCategory, setActiveCategory] =
    useState<TBaseTitle>("basic_concepts");
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");

  const onTabClick = (tab: TBaseTitle) => {
    if (tab === activeCategory) return;
    const prev = TABS.indexOf(activeCategory);
    const next = TABS.indexOf(tab);
    setSlideDirection(next > prev ? "next" : "prev");
    isInitialMountRef.current = false;
    setActiveCategory(tab);
  };

  const activeData = knowledgeBaseInfoData.find(
    ({ category }) => category === activeCategory,
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => onTabClick(tab)}
            className={cn(styles.tab, {
              [styles.tab_active]: tab === activeCategory,
            })}
          >
            {t(`knowledge_base.${tab}`)}
          </div>
        ))}
      </div>
      <div className={styles.bodyWrapper}>
        <div
          key={activeCategory}
          className={cn(styles.body, {
            [styles.slide_next]:
              !isInitialMountRef.current && slideDirection === "next",
            [styles.slide_prev]:
              !isInitialMountRef.current && slideDirection === "prev",
          })}
        >
          {activeData?.topics.map((topic) => (
            <div
              key={topic.title}
              className={styles.topic}
              onClick={() =>
                openModal({
                  name: EModalName.UNIT_MODAL,
                  props: {
                    topic: topic.title,
                    description: topic.description,
                    data: topic.data,
                    category: activeCategory,
                    peculiarities: topic.peculiarities,
                  },
                })
              }
            >
              <Image
                src={`/images/knowledge-base/${activeCategory}/${topic.title}.png`}
                alt={"knowledge-base-image"}
                className={styles.image}
                fill
              />
              <span className={styles.title}>{t(`faq.${topic.title}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
