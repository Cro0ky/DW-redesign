"use client";

import { Target, Trophy } from "lucide-react";
// import { useTranslations } from "next-intl";
import { Button } from "@/ui";

import styles from "./tutorial-banner.module.scss";
import { useTutorialChapter } from "@/components/tutorial-chapter/hooks/use-tutorial-chapter";

export const TutorialBanner = () => {
  // const t = useTranslations();
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
          Сделай первый шаг к <span className={styles.title_span}>победам</span>
          !
        </span>
        <span className={styles.subtitle}>
          Научись основам, освой ключевые навыки и получи доступ к захватывающим
          матчам. Не упускай шанс показать, на что ты способен — начни прямо
          сейчас!
        </span>
      </div>

      <Button
        children={"Продолжить обучение"}
        onClick={completeLastChapter}
        iconLeft={<Target />}
        color={"gray"}
      />
    </div>
  );
};
