"use client";

import { ChevronRight, MessageCirclePlus } from "lucide-react";

import { Button } from "@/ui";

import styles from "./support-component.module.scss";
import { useClearCookiesAndRedirect } from "@/hooks/useClearCookiesAndRedirect";

export const SupportComponent = () => {
  const logout = useClearCookiesAndRedirect();
  return (
    <div className={styles.wrapper}>
      <div className={styles.feedback}>
        <span className={styles.title}>Обратная связь</span>
        <Button iconLeft={<MessageCirclePlus />} />
      </div>

      <div className={styles.telegram}>
        <span className={styles.title}>MAX и Telegram</span>
        <span className={styles.description}>
          Присоединяйся к нам, и узнавай все новости - первым!
        </span>
        <Button
          className={styles.button}
          children={"Присоединиться"}
          iconRight={<ChevronRight />}
        />
      </div>
      <Button
        className={styles.button}
        children={"Выйти"}
        variant={"outline"}
        onClick={logout}
        fullWidth
      />
    </div>
  );
};
