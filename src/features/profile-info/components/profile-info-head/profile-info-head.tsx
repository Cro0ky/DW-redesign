import Image from "next/image";

import { MiniProfile } from "@/features";
import { useFetchUserInfo } from "@/store/user/use-fetch-user-info";

import styles from "./profile-info-head.module.scss";
import { ProfileInfoSkeleton } from "./profile-info-skeleton";
import { useTranslations } from "next-intl";

export const ProfileInfoHead = () => {
  const { rank, username, experience, isLoading } = useFetchUserInfo();
  const t = useTranslations();

  if (isLoading) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <div className={styles.head}>
      <div className={styles.head_image}>
        <Image src={"/images/profile/GENERAL.png"} fill alt={"head"} />
      </div>

      <MiniProfile size={"m"} />
      <div className={styles.text}>
        <span className={styles.username}>{username}</span>
        <span className={styles.rank}>
          {t(`ranks.${rank}`)} ({experience} Очки рейтинга)
        </span>
      </div>
    </div>
  );
};
