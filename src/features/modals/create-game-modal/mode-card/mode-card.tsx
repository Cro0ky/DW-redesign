import cn from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FC } from "react";

import styles from "./mode-card.module.scss";

export type TGameModes = "solo" | "single" | "player_solo" | "player_team";

export interface IModeCardProps {
  mode: TGameModes;
  isSelected?: boolean;
  changeGameMode: () => void;
}

export const ModeCard: FC<IModeCardProps> = ({
  mode,
  isSelected,
  changeGameMode,
}) => {
  const t = useTranslations();
  const title = t(`modals.create_game.modes.${mode}.title`);
  const description = t(`modals.create_game.modes.${mode}.description`);
  return (
    <div
      onClick={changeGameMode}
      className={cn(styles.card, {
        [styles.active]: isSelected,
      })}
      key={mode}
    >
      <Image
        src={`/images/modes/${mode}.png`}
        className={styles.background}
        alt={title}
        fill
      />
      <div className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </div>
    </div>
  );
};
