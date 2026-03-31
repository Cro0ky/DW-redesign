import type { IGameParameters } from "@/types/session.types";
import { IGameType } from "@/types/types";

export type SessionParameterField = Exclude<
  keyof IGameParameters,
  "game_type" | "name"
>;

export interface ParameterConfig {
  field: SessionParameterField;
  type: "number" | "checkbox";
  showWhen?: IGameType[];
  min?: number;
  max?: number;
}

export const PARAMETERS_CONFIG: ParameterConfig[] = [
  {
    field: "day_count",
    type: "number",
    min: 1,
    max: 5,
    showWhen: [IGameType.RT_SOLO, IGameType.TEAM],
  },
  {
    field: "tick_time",
    type: "number",
    min: 10,
    max: 500,
    showWhen: [IGameType.RT_SOLO],
  },
  {
    field: "turns_count",
    type: "number",
    min: 1,
    max: 10,
    showWhen: [IGameType.SOLO],
  },
  {
    field: "preparation_turn_duration",
    type: "number",
    min: 60,
    max: 3600,
  },
  {
    field: "sub_turn_duration",
    type: "number",
    min: 1,
    max: 3600,
    showWhen: [IGameType.SOLO],
  },
  {
    field: "inactivity_limit",
    type: "number",
    min: 0,
    max: 8,
  },
  {
    field: "arrangement_turn_duration",
    type: "number",
    min: 60,
    max: 3600,
    showWhen: [IGameType.TEAM],
  },
  {
    field: "destribution_turn_duration",
    type: "number",
    min: 60,
    max: 1800,
    showWhen: [IGameType.TEAM],
  },
  {
    field: "enable_weather",
    type: "checkbox",
  },
];

/** Поле без `showWhen` или с пустым массивом показывается для любого типа игры. */
export function isParameterVisible(
  cfg: ParameterConfig,
  gameType: IGameType,
): boolean {
  const when = cfg.showWhen;
  if (when == null || when.length === 0) return true;
  return when.includes(gameType);
}
