import styles from "./news-list.module.scss";
import { useNewsStore } from "@/store/news/news.store";
import { New } from "@/components";
import { useLayoutEffect } from "react";
import { newsService } from "@/lib/api/services/news/news.service";

export const NewsList = () => {
  const { news, setNews } = useNewsStore();
  const { getNews } = newsService;

  useLayoutEffect(() => {
    const request = async () => {
      try {
        const data = await getNews();
        if (data.results) setNews(data.results);
      } catch {}
    };

    request();
  }, []);

  if (news.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Новости</span>
      <div className={styles.list}>
        {news.map((n) => (
          <New {...n} key={n.id} />
        ))}
      </div>
    </div>
  );
};
