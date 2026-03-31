"use client";

import { BookOpenText } from "lucide-react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/routing";
import { Button } from "@/ui";

import styles from "./page.module.scss";

export default function Home() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.text}>
          <span className={styles.title}>{t("home.banner_title")}</span>
          <span className={styles.subtitle}>{t("home.banner_subtitle")}</span>
        </div>

        <Button
          children={t("home.start_tutorial")}
          iconLeft={<BookOpenText />}
          onClick={() => router.push("/tutorial")}
          color={"gray"}
        />
      </div>
      {/*<NewsList />*/}
    </div>
  );
}
