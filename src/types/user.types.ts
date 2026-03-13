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
  setUserInfo: (newState: IUser) => void;
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
