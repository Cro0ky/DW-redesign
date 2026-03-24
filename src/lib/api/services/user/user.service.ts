import { api } from "@/lib/api";
import {
  CreateTutorialPracticeRequest,
  CreateTutorialPracticeResponse,
  IStatistic,
  IUser,
  IUserRanks,
} from "@/types/user.types";

export const userService = {
  getUserInfo: (uid: string) =>
    api.get<IUser | "user_not_found">(`/user/${uid}`),

  createTutorialPractice: (chapter: CreateTutorialPracticeRequest) =>
    api.post<CreateTutorialPracticeResponse>(`/create`, chapter, true),

  getStatistic: (uid: string) => api.get<IStatistic>(`/user/${uid}/statistic/`),
  getRanks: (uid: string) => api.get<IUserRanks>(`/user/${uid}/ranks/`),
};
