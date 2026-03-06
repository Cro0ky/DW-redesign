import styles from "./drone-wars-logo.module.scss";
import { DroneLogo } from "@/assets/svg";

export const DroneWarsLogo = () => {
  return (
    <div className={styles.wrapper}>
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
