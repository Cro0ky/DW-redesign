"use client";

import cn from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { useTutorialChapter } from "@/components/tutorial-chapter/hooks/use-tutorial-chapter";
import { ETutorialType } from "@/types/types";
import { Button } from "@/ui";

import styles from "./tutorial-chapter.module.scss";

interface TutorialChapterProps {
  chapter_id: number;
}

export const TutorialChapter: FC<TutorialChapterProps> = ({ chapter_id }) => {
  const { availableChapter, getChapterStatus, redirectToChapter } =
    useTutorialChapter();

  const t = useTranslations();
  const title = t(`tutorial.chapters.${chapter_id}.title`);
  const description = t(`tutorial.chapters.${chapter_id}.description`);
  const status = getChapterStatus(availableChapter, chapter_id);

  return (
    <div className={styles.wrapper}>
      <Image
        className={cn(styles.background, {
          [styles.background_closed]: status === "closed",
        })}
        alt={"chapter"}
        fill
        src={`/images/theory/${chapter_id}-chapter.png`}
      />

      <div className={cn(styles.status, styles[`status_${status}`])}>
        {t(`tutorial.tutorial.status.${status}`)}
      </div>

      <div className={styles.info}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>

        {status !== "closed" && (
          <div className={styles.buttons}>
            <Button
              onClick={() =>
                redirectToChapter(chapter_id, ETutorialType.THEORY)
              }
              children={t("tutorial.theory_button")}
              color={"gray"}
              fullWidth
            />
            {chapter_id < 10 && (
              <Button
                onClick={() =>
                  redirectToChapter(chapter_id, ETutorialType.PRACTICE)
                }
                children={t("tutorial.practice_button")}
                fullWidth
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
