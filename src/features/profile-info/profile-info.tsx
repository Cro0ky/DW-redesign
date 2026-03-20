"use client";

import { ProfileInfoBody, ProfileInfoHead } from "./components/";
import styles from "./profile-info.module.scss";

export const ProfileInfo = () => {
  return (
    <div className={styles.wrapper}>
      <ProfileInfoHead />
      <ProfileInfoBody />
    </div>
  );
};
