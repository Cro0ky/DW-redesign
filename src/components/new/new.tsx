import styles from "./new.module.scss";
import { INews } from "@/types/news.types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { formatDateTime } from "@/utils/formatDateTime";
import { MailPlus } from "lucide-react";

export const New: FC<INews> = ({
  image,
  title,
  description,
  published_at,
  news_read,
}) => {
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
      <div className={styles.description}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
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
