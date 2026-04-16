import { useCallback, useMemo, useState } from "react";

import type { IGameParameters } from "@/types/session.types";
import { GameSide, IGameType } from "@/types/types";

import {
  isParameterVisible,
  ParameterConfig,
  PARAMETERS_CONFIG,
  type SessionParameterField,
} from "../parameters-config";
import { Checkbox, EModalName, Input, ISelectItem } from "@/ui";
import { useMutation } from "@tanstack/react-query";
import { sessionService } from "@/lib/api/services/session/session.service";
import { useModalStore } from "@/store/modal/modal.store";
import { useTranslations } from "next-intl";
import styles from "../create-single-session.module.scss";
import { useCreateSessionSchema } from "@/schemes";

const DEFAULT_PARAMETERS: IGameParameters = {
  game_type: IGameType.RT_SINGLE,
  game_side: GameSide.RUSSIA,
  raas_enabled: false,
  enable_weather: true,
  day_count: 5,
  tick_time: 90,
  preparation_turn_duration: 900,
  inactivity_limit: 8,
  turns_count: 5,
  sub_turn_duration: 120,
  arrangement_turn_duration: 300,
  destribution_turn_duration: 300,
  name: "",
};

function clamp(n: number, min?: number, max?: number): number {
  let x = n;
  if (min !== undefined) x = Math.max(min, x);
  if (max !== undefined) x = Math.min(max, x);
  return x;
}

export const useCreateSingleSession = (game_type?: IGameType) => {
  const getVisibilityGameType = useCallback((type: IGameType) => {
    switch (type) {
      case IGameType.RT_SINGLE:
        return IGameType.RT_SOLO;
      case IGameType.SINGLE:
        return IGameType.SOLO;
      default:
        return type;
    }
  }, []);

  const { openModal, closeModal } = useModalStore();
  const t = useTranslations();
  const { createSessionSchema } = useCreateSessionSchema();

  const [parameters, setParameters] = useState<IGameParameters>(
    game_type ? { ...DEFAULT_PARAMETERS, game_type } : DEFAULT_PARAMETERS,
  );

  const resetParams = () => {
    setParameters(
      game_type ? { ...DEFAULT_PARAMETERS, game_type } : DEFAULT_PARAMETERS,
    );
  };

  const setGameType = useCallback((game_type: IGameType) => {
    setParameters((prev) => ({ ...prev, game_type }));
  }, []);

  const setGameSide = useCallback((game_side: GameSide) => {
    setParameters((prev) => ({ ...prev, game_side }));
  }, []);

  const setSessionTab = useCallback((privateGame: boolean) => {
    setParameters((prev) => ({ ...prev, raas_enabled: privateGame }));
  }, []);

  const updateNumberField = useCallback(
    (field: SessionParameterField, raw: string) => {
      const cfg = PARAMETERS_CONFIG.find((c) => c.field === field);
      const parsed = parseInt(raw, 10);
      const n = Number.isFinite(parsed) ? parsed : 0;
      const next = clamp(n, cfg?.min, cfg?.max);
      setParameters((prev) => ({ ...prev, [field]: next }));
    },
    [],
  );

  const updateBoolField = useCallback(
    (field: SessionParameterField, value: boolean) => {
      setParameters((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const setName = useCallback((name: string) => {
    setParameters((prev) => ({ ...prev, name }));
  }, []);

  const createGame = useMutation({
    mutationFn: sessionService.createSession,
  });

  const handleCreateGame = async () => {
    try {
      const res = await createGame.mutateAsync(parameters);
      if (!res.id) return;
      openModal({
        name: EModalName.WAITING_OPPONENT_MODAL,
        props: { game_id: res.id, game_type: parameters.game_type },
      });
    } catch {
      // ошибка создания игры обрабатывается через onError при необходимости
    }
  };

  const canProceed = Boolean(parameters.name?.trim());

  const GAME_TYPE_OPTIONS: ISelectItem[] = [
    {
      title: t(`matches.game_type.${IGameType.RT_SINGLE}`),
      value: IGameType.RT_SINGLE,
    },
    {
      title: t(`matches.game_type.${IGameType.SINGLE}`),
      value: IGameType.SINGLE,
    },
  ];

  const GAME_SIDE_OPTIONS: ISelectItem[] = [
    {
      title: t(`side.${GameSide.RUSSIA.toLowerCase()}`),
      value: GameSide.RUSSIA,
    },
    { title: t(`side.${GameSide.NATO.toLowerCase()}`), value: GameSide.NATO },
  ];

  const visibleParameterConfigs = useMemo(
    () =>
      PARAMETERS_CONFIG.filter((cfg) =>
        isParameterVisible(cfg, getVisibilityGameType(parameters.game_type)),
      ),
    [getVisibilityGameType, parameters.game_type],
  );

  const handleClose = () => {
    if (!game_type) {
      closeModal(EModalName.CREATE_SINGLE_SESSION_MODAL);
    }

    switch (game_type) {
      case IGameType.TEAM:
        closeModal(EModalName.CREATE_TEAM_SESSION_MODAL);
        break;
      default:
        closeModal(EModalName.CREATE_SINGLE_SESSION_MODAL);
        break;
    }
  };

  const handlePlay = () => {
    if (!canProceed) return;
    handleCreateGame();
    resetParams();
  };

  const validationResult = useMemo(
    () => createSessionSchema.safeParse(parameters),
    [parameters],
  );

  const fieldErrors = useMemo(
    () =>
      validationResult.success
        ? {}
        : validationResult.error.flatten().fieldErrors,
    [validationResult],
  );

  const getFieldError = (field: SessionParameterField | "name") => {
    return fieldErrors[field]?.[0];
  };

  const isNameFilled = parameters.name.trim().length > 0;
  const isValidForm = validationResult.success && isNameFilled;

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

    if (cfg.type === "number") {
      const raw = parameters[cfg.field];
      const hasRange = cfg.min !== undefined;
      const isRealtimeInactivityLimit =
        cfg.field === "inactivity_limit" &&
        [IGameType.RT_SINGLE, IGameType.RT_SOLO, IGameType.TEAM].includes(
          parameters.game_type,
        );
      const label = isRealtimeInactivityLimit ? `${cfg.field}_rt` : cfg.field;
      const labelWithRange =
        hasRange && !["inactivity_limit_rt", "inactivity_limit"].includes(label)
          ? `${t(`modals.create_single_session.fields.${label}`)} ${t(
              "modals.create_single_session.hint_range",
              {
                min: cfg.min ?? "—",
                max: cfg.max ?? "—",
              },
            )}`
          : t(`modals.create_single_session.fields.${label}`);

      return (
        <div key={cfg.field} className={styles.fieldBlock}>
          <Input
            label={labelWithRange}
            type="number"
            value={raw as number}
            min={cfg.min}
            max={cfg.max}
            error={getFieldError(cfg.field)}
            onChange={(e) => {
              updateNumberField(cfg.field, e.target.value);
            }}
          />
        </div>
      );
    }
  };

  const nameError = isNameFilled ? getFieldError("name") : undefined;

  return {
    visibleParameterConfigs,
    nameError,
    renderParameter,
    isValidForm,
    handleCreateGame,
    resetParams,
    handleClose,
    handlePlay,
    parameters,
    gameTypeOptions: GAME_TYPE_OPTIONS,
    gameSideOptions: GAME_SIDE_OPTIONS,
    setGameType,
    setGameSide,
    setSessionTab,
    updateNumberField,
    updateBoolField,
    setName,
    canProceed,
  };
};
