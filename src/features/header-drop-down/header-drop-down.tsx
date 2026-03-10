import cn from "classnames";
import { CircleUser, LogOut } from "lucide-react";
import { useLocale } from "next-intl";
import { FC } from "react";

import { MiniProfile, useAuthComponent } from "@/features";
import { useChangeLocale } from "@/hooks/useChageLocale";
import { useClearCookiesAndRedirect } from "@/hooks/useClearCookiesAndRedirect";
import { useRouter } from "@/i18n/routing";
import type { TLanguage } from "@/i18n/types";
import { useUserStore } from "@/stores";
import { Switcher } from "@/ui";

import styles from "./header-drop-down.module.scss";

interface HeaderDropDownProps {
  isOpen: boolean;
  isClosing: boolean;
  onAnimationEnd: () => void;
}

export const HeaderDropDown: FC<HeaderDropDownProps> = ({
  isOpen,
  onAnimationEnd,
  isClosing,
}) => {
  const locale = useLocale() as TLanguage;

  const { rank, username } = useUserStore();
  const router = useRouter();

  const logout = useClearCookiesAndRedirect();
  const { handleChangeLocale } = useChangeLocale();
  const { LANGUAGES } = useAuthComponent();

  const BUTTONS = [
    {
      icon: <CircleUser />,
      text: "Профиль",
      onClick: () => router.push("/profile"),
    },
    {
      icon: <LogOut />,
      text: "logout",
      onClick: logout,
    },
  ];

  return (
    <div
      className={cn(styles.info, {
        [styles.isOpen]: isOpen && !isClosing,
        [styles.isClosing]: isClosing,
      })}
      onAnimationEnd={onAnimationEnd}
    >
      <div className={styles.head}>
        <MiniProfile />
        <div className={styles.text}>
          <span className={styles.username}>{username}</span>
          <span className={styles.rank}>{rank}</span>
        </div>
      </div>
      <div className={styles.body}>
        <Switcher
          isFullWidth
          onClick={handleChangeLocale}
          items={LANGUAGES}
          selectedValue={locale}
        />

        {BUTTONS.map(({ text, icon, onClick }, index) => (
          <div className={styles.button} onClick={onClick} key={index}>
            {icon} {text}
          </div>
        ))}
      </div>
    </div>
  );
};
