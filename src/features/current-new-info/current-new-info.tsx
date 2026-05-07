"use client";

import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import styles from "./current-new-info.module.scss";
import { Button } from "@/ui";
import { ArrowLeft, Loader } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { formatDateTime } from "@/utils/formatDateTime";
import { newsService } from "@/lib/api/services/news/news.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";

export const CurrentNewInfo = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { back } = useRouter();

  const { data, isError, isLoading } = useQuery({
    queryKey: queryKeys.newsDetail(uuid ?? ""),
    queryFn: () => newsService.getCurrentNews(uuid!),
    enabled: Boolean(uuid),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loader />;
  if (!data || isError) return <div>Данной новости не существует</div>;

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => back()}
        iconLeft={<ArrowLeft />}
        variant={"outline"}
        color={"red"}
      />

      <div className={styles.new} key={data.id}>
        <div className={styles.blur}>
          <Image
            fill
            src={data.image ?? "/images/background-2.png"}
            alt="preview"
            sizes="(max-width: 720px) 100vw, 660px"
            priority
          />
        </div>
        <div className={styles.preview}>
          <Image
            fill
            className={styles.image}
            src={data.image ?? "/images/background-2.png"}
            alt={data.title || "News"}
            sizes="(max-width: 720px) 100vw, 660px"
            priority
          />
        </div>

        <div className={styles.content}>
          <div className={styles.title}>
            <ReactMarkdown>{data.title}</ReactMarkdown>
          </div>

          <div className={styles.line} />

          <div className={styles.description}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.description}
            </ReactMarkdown>
          </div>

          <span className={styles.date}>
            {formatDateTime(data.published_at)}
          </span>
        </div>
      </div>
    </div>
  );
};
