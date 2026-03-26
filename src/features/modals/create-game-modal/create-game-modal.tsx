"use client";

import { Swords, Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { useModalStore } from "@/store/modal/modal.store";
import { EModalName, Modal } from "@/ui";

import styles from "./create-game-modal.module.scss";
import { ModeCard, TGameModes } from "./mode-card/mode-card";

export const CreateGameModal = () => {
  const t = useTranslations();
  const { closeModal } = useModalStore();

  const [selectedGameMode, setSelectedGameMode] = useState<TGameModes | null>(
    null,
  );

  const handleCloseModal = () => {
    closeModal(EModalName.CREATE_GAME_MODAL);
  };

  const mainModesArr: TGameModes[] = ["solo", "single"];
  const subModesArr: TGameModes[] = ["player_solo", "player_team"];

  return (
    <Modal
      onClose={handleCloseModal}
      name={EModalName.CREATE_GAME_MODAL}
      size="xl"
      variant={"transparent"}
      buttons={[
        {
          children: t("modals.create_game.back"),
          onClick: handleCloseModal,
          iconLeft: <Undo2 />,
          color: "gray",
        },
        {
          iconRight: <Swords />,
          children: t("modals.create_game.play"),
          // onClick: handleCloseModal,
        },
      ]}
    >
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <span className={styles.title}>{t("modals.create_game.title")}</span>
          <div className={styles.line} />
        </div>
        <div className={styles.content}>
          {mainModesArr.map((mode) => (
            <ModeCard
              mode={mode}
              key={mode}
              isSelected={mode === selectedGameMode}
              changeGameMode={() => setSelectedGameMode(mode)}
            />
          ))}
          <div className={styles.vsPlayer}>
            {subModesArr.map((mode) => (
              <ModeCard
                mode={mode}
                key={mode}
                isSelected={mode === selectedGameMode}
                changeGameMode={() => setSelectedGameMode(mode)}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
