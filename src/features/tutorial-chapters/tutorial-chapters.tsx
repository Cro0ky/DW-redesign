import { TutorialChapter } from "@/components/tutorial-chapter/tutorial-chapter";

import styles from "./tutorial-chapters.module.scss";

export const TutorialChapters = () => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: 10 }).map((_, index) => (
        <TutorialChapter key={index} chapter_id={index + 1} />
      ))}
    </div>
  );
};
