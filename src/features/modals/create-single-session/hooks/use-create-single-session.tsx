import { useCallback, useState } from "react";

import type { IGameParameters } from "@/types/session.types";
import { GameSide, IGameType } from "@/types/types";

import {
  PARAMETERS_CONFIG,
  type SessionParameterField,
} from "../parameters-config";
import { EModalName } from "@/ui";
import { useMutation } from "@tanstack/react-query";
import { sessionService } from "@/lib/api/services/session/session.service";
import { useModalStore } from "@/store/modal/modal.store";

const GAME_TYPE_OPTIONS: IGameType[] = [IGameType.RT_SOLO, IGameType.SOLO];
const GAME_SIDE_OPTIONS: GameSide[] = [GameSide.RUSSIA, GameSide.NATO];

const DEFAULT_PARAMETERS: IGameParameters = {
  game_type: IGameType.RT_SOLO,
  game_side: GameSide.RUSSIA,
  raas_enabled: false,
  enable_weather: true,
  day_count: 5,
  tick_time: 160,
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

export const useCreateSingleSession = () => {
  const { openModal } = useModalStore();

  const [parameters, setParameters] =
    useState<IGameParameters>(DEFAULT_PARAMETERS);

  const resetParams = () => {
    setParameters(DEFAULT_PARAMETERS);
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
      console.log(res);
    } catch {
      // ошибка создания игры обрабатывается через onError при необходимости
    }
  };

  const canProceed = Boolean(parameters.name?.trim());

  return {
    handleCreateGame,
    resetParams,
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
