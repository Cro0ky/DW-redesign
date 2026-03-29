"use client";

import { useQuery } from "@tanstack/react-query";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { New, NewCardSkeleton } from "@/components";
import { newsService } from "@/lib/api/services/news/news.service";
import { queryKeys } from "@/lib/query/query-keys";

import styles from "./news-list.module.scss";

const SKELETON_COUNT = 6;

interface NewsListProps {
  variant?: "page" | "component";
}

export const NewsList: FC<NewsListProps> = ({ variant = "component" }) => {
  const t = useTranslations();

  const { data: news = [], isPending } = useQuery({
    queryKey: queryKeys.news.list(),
    queryFn: async () => {
      const { results } = await newsService.getNews();
      return results;
    },
  });

  return (
    <div className={cn(styles.wrapper, styles[variant])}>
      <span className={styles.title}>{t("news.title")}</span>
      <div className={styles.list}>
        {isPending
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <NewCardSkeleton key={i} />
            ))
          : news.map((n) => <New {...n} key={n.id} />)}
      </div>
    </div>
  );
};
