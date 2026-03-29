"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import cn from "classnames";
import { Swords, Undo2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { sessionService } from "@/lib/api/services/session/session.service";
import { queryKeys } from "@/lib/query/query-keys";
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
  const queryClient = useQueryClient();

  const createSingleMutation = useMutation({
    mutationFn: sessionService.createSingle,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
  });

  const handleCloseModal = () => {
    closeModal(EModalName.CHOOSE_SIDE_MODAL);
    setSelectedSide(null);
  };

  const handleGameNavigate = async () => {
    if (activeModal?.name !== EModalName.CHOOSE_SIDE_MODAL) return;
    const gameType = activeModal.props?.game_type;
    if (!selectedSide || !gameType) return;

    const res = await createSingleMutation.mutateAsync({
      name: "SINGLE",
      game_type: gameType,
      game_side: selectedSide,
    });

    if (!res.id) return;

    window.location.href = `${getSimulationUrl(gameType)}/init/${res.id}/${id}?gameType=${gameType}`;
    resetModals();
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
          disabled: !selectedSide || createSingleMutation.isPending,
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
