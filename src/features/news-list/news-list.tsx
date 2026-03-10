"use client";

import { useLayoutEffect } from "react";
import { useTranslations } from "next-intl";

import { New } from "@/components";
import { newsService } from "@/lib/api/services/news/news.service";
import { useNewsStore } from "@/store/news/news.store";

import styles from "./news-list.module.scss";

export const NewsList = () => {
  const t = useTranslations();
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
      <span className={styles.title}>{t("news.title")}</span>
      <div className={styles.list}>
        {news.map((n) => (
          <New {...n} key={n.id} />
        ))}
      </div>
    </div>
  );
};
