"use client";

import cn from "classnames";
import { ArrowRight, Undo2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useModalStore } from "@/store/modal/modal.store";
import { IGameType } from "@/types/types";
import { EModalName, Modal } from "@/ui";

import styles from "./choose-game-type-modal.module.scss";

export const ChooseGameTypeModal = () => {
  const t = useTranslations();
  const [selectedGameType, setSelectedGameType] = useState<IGameType | null>(
    null,
  );
  const GAME_TYPES: IGameType[] = [IGameType.RT_SINGLE, IGameType.SINGLE];

  const { closeModal, openModal } = useModalStore();

  const handleCloseModal = () => {
    closeModal(EModalName.CHOOSE_GAME_TYPE_MODAL);
    setSelectedGameType(null);
  };

  const handleGameNavigate = () => {
    if (!selectedGameType) return;
    openModal({
      name: EModalName.CHOOSE_SIDE_MODAL,
      props: { game_type: selectedGameType },
    });
  };

  return (
    <Modal
      name={EModalName.CHOOSE_GAME_TYPE_MODAL}
      fullSize={false}
      size={"l"}
      title={"Выберите режим"}
      buttons={[
        {
          children: t("modals.create_game.back"),
          onClick: handleCloseModal,
          iconLeft: <Undo2 />,
          fullWidth: true,
          color: "gray",
        },
        {
          iconRight: <ArrowRight />,
          children: "Далее",
          onClick: handleGameNavigate,
          fullWidth: true,
          disabled: !selectedGameType,
        },
      ]}
      children={
        <div className={styles.wrapper}>
          {GAME_TYPES.map((game_type) => (
            <div
              key={game_type}
              onClick={() => setSelectedGameType(game_type)}
              className={cn(styles.card, {
                [styles.active]: selectedGameType === game_type,
                [styles.disabled]: false,
              })}
            >
              <Image
                src={`/images/game-types/${game_type}.png`}
                className={styles.background}
                alt={game_type}
                fill
              />
              <span className={styles.card_title}>
                {t(`matches.game_type.${game_type}`).toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      }
    />
  );
};
