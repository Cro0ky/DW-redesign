"use client";

import { ChevronRight, MessageCirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/ui";

import styles from "./support-component.module.scss";

export const SupportComponent = () => {
  const t = useTranslations();

  return (
    <div className={styles.wrapper}>
      <div className={styles.feedback}>
        <span className={styles.title}>{t("sidebar.feedback")}</span>
        <Button iconLeft={<MessageCirclePlus />} />
      </div>

      <div className={styles.telegram}>
        <span className={styles.title}>{t("sidebar.telegram_title")}</span>
        <span className={styles.description}>
          {t("sidebar.telegram_description")}
        </span>
        <Button
          className={styles.button}
          children={t("sidebar.join")}
          iconRight={<ChevronRight />}
        />
      </div>
    </div>
  );
};
