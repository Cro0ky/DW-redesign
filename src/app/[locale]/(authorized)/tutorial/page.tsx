import { TutorialBanner, TutorialChapters } from "@/features";

import styles from "./page.module.scss";

export default function Tutorial() {
  return (
    <div className={styles.wrapper}>
      <TutorialBanner />
      <TutorialChapters />
    </div>
  );
}
