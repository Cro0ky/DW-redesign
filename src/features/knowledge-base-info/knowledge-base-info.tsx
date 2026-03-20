"use client";

import styles from "./knowledge-base-info.module.scss";
import cn from "classnames";
import { useState } from "react";
import { TBaseTitle } from "@/types/knowledge-base-info.types";
import { knowledgeBaseInfoData } from "@/features/knowledge-base-info/knowledge-base-info.const";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modal/modal.store";
import { EModalName } from "@/ui";

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

  const [activeCategory, setActiveCategory] =
    useState<TBaseTitle>("basic_concepts");

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        {TABS.map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={cn(styles.tab, {
              [styles.tab_active]: tab === activeCategory,
            })}
          >
            {t(`knowledge_base.${tab}`)}
          </div>
        ))}
      </div>
      <div className={styles.body}>
        {knowledgeBaseInfoData
          .find(({ category }) => category === activeCategory)
          ?.topics.map((topic) => (
            <div
              key={topic.title}
              className={styles.topic}
              onClick={() =>
                openModal({
                  name: EModalName.UNIT_MODAL,
                  props: { category: activeCategory, topic: topic.title },
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
  );
};
