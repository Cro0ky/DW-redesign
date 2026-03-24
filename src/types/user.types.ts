import { GameSide } from "@/types/types";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum ERank {
  PRIVATE = "PRIVATE",
  CORPORAL = "CORPORAL",
  SERGEANT = "SERGEANT",
  SERGEANT_MAJOR = "SERGEANT_MAJOR",
  ENSIGN = "ENSIGN",
  LIEUTENANT = "LIEUTENANT",
  CAPTAIN = "CAPTAIN",
  MAJOR = "MAJOR",
  COLONEL = "COLONEL",
  MARSHAL = "MARSHAL",
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  avatar_number: number;
  frame_number: number;
  single_completed: boolean;
  fio: string | null;
  rank: ERank;
  experience: number;
  tutorial_unit: string;
  rt_tutorial_unit: string;
  is_staff: boolean;
}

export interface IUserState extends IUser {
  isLoading: boolean;
  isError: boolean;
  setUserInfo: (newState: IUser) => void;
  userFulfilled: (data: IUser) => void;
  userRejected: () => void;
  setUserLoading: (value: boolean) => void;
  fetchUser: (uid: string) => Promise<{ userNotFound?: boolean } | void>;
}

export interface IPlayer {
  uid: string;
  name: string;
  side: GameSide;
}

export interface CreateTutorialPracticeRequest {
  chapter: string;
  player: IPlayer;
}

export interface CreateTutorialPracticeResponse {
  game_id: string;
}

export interface IStatistic {
  general_statistic: {
    total_matches: number;
    matches_rf: number;
    matches_nato: number;
    wins_rf_major: number;
    wins_rf_minor: number;
    wins_nato_major: number;
    wins_nato_minor: number;
    total_wins: number;
    total_wins_percentage: number;
    win_percentage_rf: number;
    win_percentage_nato: number;
    win_percentage_major: number;
    win_percentage_minor: number;
  };
  rating_statistic: {
    total_matches: number;
    matches_rf: number;
    matches_nato: number;
    wins_rf_major: number;
    wins_rf_minor: number;
    wins_nato_major: number;
    wins_nato_minor: number;
    last_20_ratings: number[];
    total_wins: number;
    total_wins_percentage: number;
    win_percentage_rf: number;
    win_percentage_nato: number;
    win_percentage_major: number;
    win_percentage_minor: number;
  };
}

export interface IUserRankTier {
  name: ERank;
  min_rate: number;
  max_rate: number;
}

export interface IUserRanks {
  user_rank: ERank;
  next_rank: ERank;
  experience: number;
  position: number;
  ranks: IUserRankTier[];
}
