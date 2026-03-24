import { MailPlus } from "lucide-react";
import { FC } from "react";

import { INews } from "@/types/news.types";
import { formatDateTime } from "@/utils/formatDateTime";

import styles from "./new.module.scss";

export const New: FC<INews> = ({ image, title, published_at, news_read }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>
        <img
          alt="new"
          src={image ?? "/images/new-background.png"}
          className={styles.previewImg}
        />
      </div>
      <span className={styles.title}>{title}</span>
      <div className={styles.published_date}>
        {formatDateTime(published_at)}
      </div>
      {!news_read && (
        <div className={styles.indicator}>
          <MailPlus size={12} />
        </div>
      )}
    </div>
  );
};
