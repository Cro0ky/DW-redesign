import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { DroneLogo } from "@/assets/svg";

import styles from "./drone-wars-logo.module.scss";

interface DroneWarsLogoProps {
  fullWidth?: boolean;
}

export const DroneWarsLogo: FC<DroneWarsLogoProps> = ({ fullWidth = true }) => {
  const t = useTranslations();
  return (
    <div
      className={cn(styles.wrapper, {
        [styles.fullWidth]: fullWidth,
      })}
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
