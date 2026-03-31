"use client";

import { useMutation } from "@tanstack/react-query";
import cn from "classnames";
import { Swords, Undo2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { sessionService } from "@/lib/api/services/session/session.service";
import { useUserStore } from "@/store";
import { useModalStore } from "@/store/modal/modal.store";
import { GameSide } from "@/types/types";
import { EModalName, Modal } from "@/ui";
import { getSimulationUrl } from "@/utils/getSimulationUrl";

import styles from "./choose-side-modal.module.scss";

export const ChooseSideModal = () => {
  const t = useTranslations();
  const [selectedSide, setSelectedSide] = useState<GameSide | null>(null);
  const SIDES: GameSide[] = [GameSide.RUSSIA, GameSide.NATO];

  const { closeModal, activeModal, resetModals } = useModalStore();
  const { id } = useUserStore();

  const createGame = useMutation({
    mutationFn: sessionService.createSession,
  });

  const handleCloseModal = () => {
    closeModal(EModalName.CHOOSE_SIDE_MODAL);
    setSelectedSide(null);
  };

  const handleGameNavigate = async () => {
    if (activeModal?.name !== EModalName.CHOOSE_SIDE_MODAL) return;
    const gameType = activeModal.props?.game_type;
    const extra = activeModal.props?.createSessionPayload;
    if (!selectedSide || !gameType) return;

    try {
      const res = await createGame.mutateAsync({
        ...(extra ?? { name: "SINGLE" }),
        game_type: gameType,
        game_side: selectedSide,
        raas_enabled: false,
        enable_weather: false,
        day_count: 5,
        tick_time: 90,
        inactivity_limit: 0,
        turns_count: 5,
        sub_turn_duration: 120,
      });

      if (!res.id) return;

      window.location.href = `${getSimulationUrl(gameType)}/init/${res.id}/${id}?gameType=${gameType}`;
      resetModals();
    } catch {
      // ошибка создания игры обрабатывается через onError при необходимости
    }
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
          onClick: () => void handleGameNavigate(),
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
