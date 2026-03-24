"use client";

import { Target, Trophy } from "lucide-react";

import { useTutorialChapter } from "@/components/tutorial-chapter/hooks/use-tutorial-chapter";
import { useTranslations } from "next-intl";
import { Button } from "@/ui";

import styles from "./tutorial-banner.module.scss";

export const TutorialBanner = () => {
  const t = useTranslations();
  const { availableChapter, availableChapterType, redirectToChapter } =
    useTutorialChapter();

  const completeLastChapter = () => {
    redirectToChapter(availableChapter, availableChapterType);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <span className={styles.title}>
          <Trophy width={30} height={30} />
          {t("tutorial.banner_title_prefix")}
          <span className={styles.title_span}>
            {t("tutorial.banner_title_highlight")}
          </span>
          {t("tutorial.banner_title_suffix")}
        </span>
        <span className={styles.subtitle}>{t("tutorial.banner_subtitle")}</span>
      </div>

      <Button
        children={t("tutorial.banner_continue")}
        onClick={completeLastChapter}
        iconLeft={<Target />}
        color={"gray"}
      />
    </div>
  );
};
