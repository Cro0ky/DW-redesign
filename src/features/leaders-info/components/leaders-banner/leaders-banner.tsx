"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/routing";
import { Button } from "@/ui";

import styles from "./leaders-banner.module.scss";

export const LeadersBanner = () => {
  const t = useTranslations("leaders");
  const router = useRouter();

  const completeLastChapter = () => {
    router.push("/matches");
  };

  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <span className={styles.title}>{t("banner.title")}</span>
        <span className={styles.subtitle}>{t("banner.subtitle")}</span>
      </div>

      <Button
        children={t("banner.create_lobby")}
        onClick={completeLastChapter}
        iconLeft={<Plus />}
        color={"white"}
      />
    </div>
  );
};
