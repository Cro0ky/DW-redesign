"use client";

import { Swords, Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import { useModalStore } from "@/store/modal/modal.store";
import { GameSide, IGameType } from "@/types/types";
import { Checkbox, EModalName, Input, Modal, Switcher } from "@/ui";

import styles from "./create-single-session.module.scss";
import { useCreateSingleSession } from "./hooks/use-create-single-session";
import {
  isParameterVisible,
  type ParameterConfig,
  PARAMETERS_CONFIG,
} from "./parameters-config";

export const CreateSingleSession = () => {
  const t = useTranslations();
  const { closeModal } = useModalStore();

  const {
    updateNumberField,
    updateBoolField,
    gameTypeOptions,
    gameSideOptions,
    setSessionTab,
    setGameType,
    setGameSide,
    parameters,
    canProceed,
    setName,
    resetParams,
    handleCreateGame,
  } = useCreateSingleSession();

  const visibleParameterConfigs = useMemo(
    () =>
      PARAMETERS_CONFIG.filter((cfg) =>
        isParameterVisible(cfg, parameters.game_type),
      ),
    [parameters.game_type],
  );

  const handleClose = () => {
    closeModal(EModalName.CREATE_SINGLE_SESSION_MODAL);
  };

  const handlePlay = () => {
    if (!canProceed) return;
    handleCreateGame();
    resetParams();
  };

  const renderParameter = (cfg: ParameterConfig) => {
    if (cfg.type === "checkbox") {
      const checked = Boolean(parameters[cfg.field]);
      return (
        <div key={cfg.field} className={styles.weather}>
          <div className={styles.text}>
            <span className={styles.title}>
              {t(`modals.create_single_session.fields.${cfg.field}`)}
            </span>
            <span className={styles.caption}>
              {t("modals.create_single_session.weather_caption")}
            </span>
          </div>
          <Checkbox
            variant={"tumbler"}
            checked={checked}
            onChange={(v) => updateBoolField(cfg.field, v)}
          />
        </div>
      );
    }

    const raw = parameters[cfg.field];
    const numValue = typeof raw === "number" ? raw : 0;

    const hasRange = cfg.min !== undefined || cfg.max !== undefined;

    return (
      <div key={cfg.field} className={styles.fieldBlock}>
        <Input
          label={t(
            `modals.create_single_session.fields.${["inactivity_limit"].includes(cfg.field) && parameters.game_type !== IGameType.SOLO ? `${cfg.field}_rt` : cfg.field}`,
          )}
          type="number"
          value={numValue}
          onChange={(e) => updateNumberField(cfg.field, e.target.value)}
          hint={
            hasRange
              ? t("modals.create_single_session.hint_range", {
                  min: cfg.min ?? "—",
                  max: cfg.max ?? "—",
                })
              : undefined
          }
        />
      </div>
    );
  };

  return (
    <Modal
      name={EModalName.CREATE_SINGLE_SESSION_MODAL}
      fullSize={false}
      onClose={handleClose}
      size="xl"
      title={t("modals.create_single_session.title")}
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
          disabled: !canProceed,
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
          />

          <div className={styles.selectWrap}>
            <span className={styles.label}>
              {t("modals.create_single_session.fields.game_side")}
            </span>
            <select
              className={styles.select}
              value={parameters.game_side}
              onChange={(e) => setGameSide(e.target.value as GameSide)}
              aria-label={t("modals.create_single_session.fields.game_side")}
            >
              {gameSideOptions.map((gt) => (
                <option key={gt} value={gt}>
                  {t(`side.${gt.toLowerCase()}`)}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectWrap}>
            <span className={styles.label}>
              {t("modals.create_single_session.fields.game_type")}
            </span>
            <select
              className={styles.select}
              value={parameters.game_type}
              onChange={(e) => setGameType(e.target.value as IGameType)}
              aria-label={t("modals.create_single_session.fields.game_type")}
            >
              {gameTypeOptions.map((gt) => (
                <option key={gt} value={gt}>
                  {t(`matches.game_type.${gt}`)}
                </option>
              ))}
            </select>
          </div>

          {visibleParameterConfigs.map(renderParameter)}
        </div>
      }
    />
  );
};
