"use client";

import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { DroneLogo } from "@/assets/svg";
import { useRouter } from "@/i18n/routing";

import styles from "./drone-wars-logo.module.scss";

interface DroneWarsLogoProps {
  fullWidth?: boolean;
}

export const DroneWarsLogo: FC<DroneWarsLogoProps> = ({ fullWidth = true }) => {
  const t = useTranslations();
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/");
  };

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.fullWidth]: fullWidth,
      })}
      onClick={handleNavigate}
    >
      <div>
        <DroneLogo />
      </div>
      <div className={styles.text}>
        <span className={styles.title}>{t("banner.title").toUpperCase()}</span>
        <span className={styles.subtitle}>{t("banner.subtitle")}</span>
      </div>
    </div>
  );
};
