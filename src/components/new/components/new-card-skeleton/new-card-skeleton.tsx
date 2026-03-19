"use client";

import { FC } from "react";

import { SkeletonLoader } from "@/ui";

import styles from "./new-card-skeleton.module.scss";

export const NewCardSkeleton: FC = () => {
  return (
    <div className={styles.wrapper}>
      <SkeletonLoader className={styles.preview} />
      <SkeletonLoader className={styles.title} height={20} />
      <SkeletonLoader className={styles.description} height={44} />
      <SkeletonLoader className={styles.date} height={18} width={80} />
    </div>
  );
};
