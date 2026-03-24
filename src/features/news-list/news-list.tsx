"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC, useLayoutEffect } from "react";

import { New, NewCardSkeleton } from "@/components";
import { useFetchNews } from "@/store/news/use-fetch-news";

import styles from "./news-list.module.scss";

const SKELETON_COUNT = 6;

interface NewsListProps {
  variant?: "page" | "component";
}

export const NewsList: FC<NewsListProps> = ({ variant = "component" }) => {
  const t = useTranslations();
  const { news, isLoading, fetchNews } = useFetchNews();

  useLayoutEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className={cn(styles.wrapper, styles[variant])}>
      <span className={styles.title}>{t("news.title")}</span>
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
