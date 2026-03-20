"use client";

import { Binary, ChevronDown, Swords } from "lucide-react";
import { useTranslations } from "next-intl";

import { HeaderDropDown, MiniProfile } from "@/features";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useToggleWithCloseAnimation } from "@/hooks/useToggleWithCloseAnimation";
import { useModalStore } from "@/store/modal/modal.store";
import { Button, EModalName, IButtonProps } from "@/ui";

import styles from "./header.module.scss";

export const Header = () => {
  const t = useTranslations();
  const {
    ref: profileRef,
    isOpen,
    isClosing,
    toggle,
    onAnimationEnd,
  } = useToggleWithCloseAnimation({ defaultOpen: false });

  const { openModal } = useModalStore();

  const buttons: IButtonProps[] = [
    {
      iconLeft: <Swords />,
      children: t("header.battle"),
      color: "white",
      onClick: () => openModal({ name: EModalName.CREATE_GAME_MODAL }),
    },
    {
      iconLeft: <Binary />,
      children: t("header.connect_with_code"),
      color: "gray",
    },
  ];

  useGetUserInfo();

  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        {buttons.map((button, index) => (
          <Button {...button} key={index} />
        ))}
      </div>
      <div ref={profileRef} className={styles.profile} onClick={toggle}>
        <MiniProfile />
        <ChevronDown />
        <HeaderDropDown
          onAnimationEnd={onAnimationEnd}
          isOpen={isOpen}
          isClosing={isClosing}
        />
      </div>
    </header>
  );
};
