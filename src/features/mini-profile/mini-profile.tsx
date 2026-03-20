"use client";

import cn from "classnames";
import { FC } from "react";

import { useUserStore } from "@/store";
import { useFetchUserInfo } from "@/store/user/use-fetch-user-info";
import { Size } from "@/types/types";
import { SkeletonLoader } from "@/ui";

import { Frame } from "./components/frame/frame";
import styles from "./mini-profile.module.scss";

interface MiniProfileProps {
  size?: Size;
}

const AVATAR_BASE = "/images/avatars";

export const MiniProfile: FC<MiniProfileProps> = ({ size = "s" }) => {
  const { avatar_number, frame_number } = useUserStore();
  const { isLoading } = useFetchUserInfo();

  if (isLoading)
    return (
      <SkeletonLoader
        width={50}
        height={50}
        borderRadius="50%"
        className={styles.avatar}
      />
    );

  return (
    <div className={cn(styles.wrapper, styles[`size_${size}`])}>
      <div className={styles.avatarContainer}>
        <img
          alt={"avatar"}
          src={`${AVATAR_BASE}/${avatar_number}-avatar.png`}
          className={styles.avatar}
        />
      </div>
      <Frame frame_number={frame_number} />
    </div>
  );
};
