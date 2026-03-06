import { Binary, Swords } from "lucide-react";

import { Button } from "@/ui";

import styles from "./header.module.scss";
import { IButtonProps } from "@/ui";
import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations();
  const buttons: IButtonProps[] = [
    {
      iconLeft: <Swords />,
      children: t("header.battle"),
      color: "white",
    },
    {
      iconLeft: <Binary />,
      children: t("header.connect_with_code"),
      color: "gray",
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.buttons}>
        {buttons.map((button, index) => (
          <Button {...button} key={index} />
        ))}
      </div>
    </header>
  );
};
