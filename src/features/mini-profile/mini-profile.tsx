"use client";

import { useUserStore } from "@/store";

import { Frame } from "./components/frame/frame";
import styles from "./mini-profile.module.scss";

const AVATAR_BASE = "/images/avatars";

export const MiniProfile = () => {
  const { avatar_number, frame_number } = useUserStore();

  return (
    <div className={styles.wrapper}>
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
