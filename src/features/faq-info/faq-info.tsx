import { useTranslations } from "next-intl";

import { Accordion } from "@/ui";

import styles from "./faq-info.module.scss";

const FAQ_QUESTIONS = [
  "how_to_contact_customer_support",
  "the_site_administrators_are_asking",
  "suspicious_activity_on_your_account",
  "what_if_I_forgot_my_account_password",
  "more_than_one_account_per_person",
  "how_do_I_delete_my_account",
  "why_is_my_game_lagging_and_freezing",
  "change_the_nickname_on_the_site",
  "play_against_friends",
  "play_mobile_device",
  "request_help_in_completing_the_game",
  "suggest_my_ideas",
  "receive_news_and_updates",
];

export const FaqInfo = () => {
  const t = useTranslations();
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <span className={styles.title}>{t("questions.heading")}</span>
        <span className={styles.subtitle}>{t("questions.subheading")}</span>
      </div>

      <div className={styles.list}>
        {FAQ_QUESTIONS.map((item) => (
          <Accordion
            key={item}
            title={t(`questions.${item}`)}
            content={t(`questions.${item}_description`)}
          />
        ))}
      </div>
    </div>
  );
};
