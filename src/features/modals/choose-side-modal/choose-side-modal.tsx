"use client";

import { EModalName, Modal } from "@/ui";
import { GameSide } from "@/types/types";
import { useState } from "react";
import { useModalStore } from "@/store/modal/modal.store";
import styles from "./choose-side-modal.module.scss";
import cn from "classnames";
import { Swords, Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ChooseSideModal = () => {
  const t = useTranslations();
  const [selectedSide, setSelectedSide] = useState<GameSide | null>(null);
  const SIDES: GameSide[] = [GameSide.RUSSIA, GameSide.NATO];

  const {
    closeModal,
    // activeModal
  } = useModalStore();

  // const props = activeModal?.props;

  const handleCloseModal = () => {
    closeModal(EModalName.CHOOSE_SIDE_MODAL);
  };

  const handleGameNavigate = () => {
    console.log(13123);
  };

  return (
    <Modal
      name={EModalName.CHOOSE_SIDE_MODAL}
      fullSize={false}
      size={"l"}
      title={"Выберите сторону"}
      buttons={[
        {
          children: t("modals.create_game.back"),
          onClick: handleCloseModal,
          iconLeft: <Undo2 />,
          fullWidth: true,
          color: "gray",
        },
        {
          iconRight: <Swords />,
          children: t("modals.create_game.play"),
          onClick: handleGameNavigate,
          fullWidth: true,
          disabled: !selectedSide,
        },
      ]}
      children={
        <div className={styles.wrapper}>
          {SIDES.map((side) => (
            <div
              key={side}
              onClick={() => setSelectedSide(side)}
              className={cn(styles.card, {
                [styles.active]: selectedSide === side,
                [styles.disabled]: false,
              })}
            >
              <Image
                src={`/images/sides/${side}.png`}
                className={styles.background}
                alt={side}
                fill
              />
              <Image
                src={`/images/sides/${side}-infantry.png`}
                className={cn(
                  styles.infantry,
                  styles[`infantry_${side.toLowerCase()}`],
                  {
                    [styles[`infantry_${side.toLowerCase()}_active`]]:
                      side === selectedSide,
                  },
                )}
                alt={`infantry_${side}`}
                fill
              />
            </div>
          ))}
        </div>
      }
    />
  );
};
