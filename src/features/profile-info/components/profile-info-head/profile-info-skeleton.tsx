"use client";

import { FC } from "react";

import { SkeletonLoader } from "@/ui";

import styles from "./profile-info-head.module.scss";

export const ProfileInfoSkeleton: FC = () => {
  return (
    <div className={styles.head}>
      <SkeletonLoader
        width={80}
        height={80}
        borderRadius="50%"
        className={styles.avatar}
      />
      <div className={styles.text}>
        <SkeletonLoader height={28} width={120} className={styles.username} />
        <SkeletonLoader height={22} width={160} className={styles.rank} />
      </div>
    </div>
  );
};
