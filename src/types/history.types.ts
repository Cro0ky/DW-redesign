export type TGameHistoryStatus =
  | "tie"
  | "minor_defeat"
  | "major_defeat"
  | "minor_victory"
  | "major_victory";

export type TGameHistoryType = "TEAM" | "RT_SINGLE" | "RT_SOLO";

export interface ISessionHistoryItem extends Record<string, unknown> {
  id: string;
  created_at: string;
  name: string;
  opponent_name: string;
  opponent_id: string | null;
  game_type: TGameHistoryType | string;
  turns_count: number;
  sub_turn_duration: number;
  game_sub_type: string;
  status: TGameHistoryStatus | string;
  rating: number;
  opponent_deleted: boolean;
}

export interface IPaginatedSessionHistory {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISessionHistoryItem[];
}
