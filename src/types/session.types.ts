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

export interface ICreateSingleParams {
  name: string;
  game_side: GameSide;
  game_type: IGameType;
}
