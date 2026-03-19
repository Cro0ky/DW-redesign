"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC, useLayoutEffect, useState } from "react";

import { New, NewCardSkeleton } from "@/components";
import { newsService } from "@/lib/api/services/news/news.service";
import { useNewsStore } from "@/store/news/news.store";

import styles from "./news-list.module.scss";

const SKELETON_COUNT = 6;

interface NewsListProps {
  variant?: "page" | "component";
}

export const NewsList: FC<NewsListProps> = ({ variant = "component" }) => {
  const t = useTranslations("news");
  const { news, setNews } = useNewsStore();
  const { getNews } = newsService;
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const request = async () => {
      setIsLoading(true);
      try {
        const data = await getNews();
        if (data.results) setNews(data.results);
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };

    request();
  }, []);

  return (
    <div className={cn(styles.wrapper, styles[variant])}>
      <span className={styles.title}>{t("title")}</span>
      <div className={styles.list}>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <NewCardSkeleton key={i} />
            ))
          : news.map((n) => <New {...n} key={n.id} />)}
      </div>
    </div>
  );
};
