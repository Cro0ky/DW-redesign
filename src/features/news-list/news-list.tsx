"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC, useLayoutEffect } from "react";

import { New } from "@/components";
import { newsService } from "@/lib/api/services/news/news.service";
import { useNewsStore } from "@/store/news/news.store";

import styles from "./news-list.module.scss";

interface NewsListProps {
  variant?: "page" | "component";
}

export const NewsList: FC<NewsListProps> = ({ variant = "component" }) => {
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
    <div className={cn(styles.wrapper, styles[variant])}>
      <span className={styles.title}>{t("news.title")}</span>
      <div className={styles.list}>
        {news.map((n) => (
          <New {...n} key={n.id} />
        ))}
        {news.map((n) => (
          <New {...n} key={n.id} />
        ))}
      </div>
    </div>
  );
};
