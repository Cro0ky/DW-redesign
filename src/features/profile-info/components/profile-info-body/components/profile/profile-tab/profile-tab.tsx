import cn from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { ProfileInfoBlock } from "@/features";
import { useUserStore } from "@/store";
import { Input } from "@/ui";

import styles from "./profile-tab.module.scss";

export const ProfileTab = () => {
  const t = useTranslations();
  const { frame_number, avatar_number, username, email } = useUserStore();

  const renderImages = (variant: "avatar" | "frame") => {
    const isFrames = variant === "frame";
    return (
      <div className={styles.avatars}>
        {Array.from({ length: isFrames ? 10 : 9 }).map((_, index) => {
          const avatarIndex = isFrames ? index : index + 1;
          const selectedIndex = isFrames ? frame_number : avatar_number;
          return (
            <div
              key={`${variant}-${index}`}
              className={cn(styles.image, {
                [styles.image_active]: index === selectedIndex,
              })}
            >
              <Image
                alt={`${variant}_${avatarIndex}`}
                src={`/images/${variant}s/${avatarIndex}-${variant}.png`}
                fill
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <ProfileInfoBlock
        title={t("profile.nickname")}
        children={<Input value={username} fullWidth disabled />}
      />
      <ProfileInfoBlock
        title={t("profile.email")}
        children={<Input value={email} fullWidth disabled />}
      />
      <ProfileInfoBlock
        title={t("profile.avatar")}
        children={renderImages("avatar")}
      />
      <ProfileInfoBlock
        title={t("profile.frame")}
        children={renderImages("frame")}
      />
    </div>
  );
};
