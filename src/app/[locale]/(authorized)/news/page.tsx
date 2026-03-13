import { NewsList } from "@/features";

import styles from "./page.module.scss";

export default function News() {
  return (
    <div className={styles.wrapper}>
      <NewsList variant={"page"} />
    </div>
  );
}
