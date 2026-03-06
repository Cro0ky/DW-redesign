import styles from "./support-component.module.scss";
import { Button } from "@/ui";
import { ChevronRight, MessageCirclePlus } from "lucide-react";

export const SupportComponent = () => {
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
    </div>
  );
};
