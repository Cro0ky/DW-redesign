import styles from "./drone-wars-logo.module.scss";
import { DroneLogo } from "@/assets/svg";
import { FC } from "react";
import cn from "classnames";

interface DroneWarsLogoProps {
  fullWidth?: boolean;
}

export const DroneWarsLogo: FC<DroneWarsLogoProps> = ({ fullWidth = true }) => {
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
        <span className={styles.title}>БИТВА ДРОНОВ</span>
        <span className={styles.subtitle}>Украина</span>
      </div>
    </div>
  );
};
