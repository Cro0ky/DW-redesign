import { api } from "@/lib/api";
import type { IPaginatedSessionHistory } from "@/types/history.types";
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

  getSessionHistory: (sessionId: string, page: number = 1) =>
    api.get<IPaginatedSessionHistory>(`/session/${sessionId}/history/`, {
      params: { page },
    }),
};
