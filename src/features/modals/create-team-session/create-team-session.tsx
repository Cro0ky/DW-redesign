"use client";

import { EModalName, Input, Modal, Select, Switcher } from "@/ui";
import { Swords, Undo2 } from "lucide-react";
import styles from "./create-team-session.module.scss";
import { GameSide, IGameType } from "@/types/types";
import { useTranslations } from "next-intl";
import { useCreateSingleSession } from "@/features/modals/create-single-session/hooks/use-create-single-session";

export const CreateTeamSession = () => {
  const t = useTranslations();
  const {
    visibleParameterConfigs,
    gameSideOptions,
    setSessionTab,
    setGameSide,
    isValidForm,
    parameters,
    nameError,
    setName,
    handleClose,
    handlePlay,
    renderParameter,
  } = useCreateSingleSession(IGameType.TEAM);

  return (
    <Modal
      name={EModalName.CREATE_TEAM_SESSION_MODAL}
      fullSize={false}
      onClose={handleClose}
      size="xl"
      title={"Создание командной сессии"}
      buttons={[
        {
          children: t("modals.create_game.back"),
          onClick: handleClose,
          iconLeft: <Undo2 />,
          fullWidth: true,
          color: "gray",
        },
        {
          iconRight: <Swords />,
          children: t("modals.create_game.play"),
          onClick: handlePlay,
          fullWidth: true,
          disabled: !isValidForm,
        },
      ]}
      children={
        <div className={styles.form}>
          <Switcher
            isFullWidth
            selectedValue={parameters.raas_enabled}
            onClick={(privateGame) => setSessionTab(privateGame)}
            items={[
              {
                title: t("modals.create_single_session.tabs.open"),
                value: false,
              },
              {
                title: t("modals.create_single_session.tabs.private"),
                value: true,
              },
            ]}
          />

          <Input
            label={t("modals.create_single_session.fields.name")}
            placeholder={t("modals.create_single_session.placeholders.name")}
            value={parameters.name ?? ""}
            onChange={(e) => setName(e.target.value)}
            hint={t("errors.max_length", { length: 100 })}
            isClearSpaces
            isShowCounter
            error={nameError ? t(nameError, { length: 100 }) : undefined}
          />

          <Select
            items={gameSideOptions}
            placeholder={t("modals.create_single_session.fields.game_side")}
            label={t("modals.create_single_session.fields.game_side")}
            onChangeValue={(v) => setGameSide(v.value as GameSide)}
            selectedValue={{
              title: t(`side.${parameters.game_side.toLowerCase()}`),
              value: parameters.game_side,
            }}
          />

          {visibleParameterConfigs.map(renderParameter)}
        </div>
      }
    />
  );
};
