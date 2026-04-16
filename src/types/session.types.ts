import { GameSide, IGameType } from "@/types/types";

export interface ISessionListItem extends Record<string, unknown> {
  id: string;
  name: string;
  game_type: string;
  game_sub_type: string;
  state: string;
  available_game_side: string;
  opponent_name: string | null;
  tick_time: number;
}

export interface IPaginatedSessions {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISessionListItem[];
}

export interface IGameParameters {
  game_type: IGameType;
  game_side: GameSide;
  raas_enabled: boolean;
  enable_weather: boolean;
  day_count: number;
  tick_time: number;
  preparation_turn_duration?: number;
  inactivity_limit: number;
  name: string;

  //SOLO
  turns_count: number;
  sub_turn_duration: number;

  // TEAM
  arrangement_turn_duration?: number;
  destribution_turn_duration?: number;
}
