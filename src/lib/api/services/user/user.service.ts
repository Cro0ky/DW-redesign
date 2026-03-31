import { apiRequest } from "@/lib/api/client";
import type { IPaginatedSessionHistory } from "@/types/history.types";
import type { IPaginatedRanking } from "@/types/ranking.types";
import {
  CreateTutorialPracticeRequest,
  CreateTutorialPracticeResponse,
  IStatistic,
  IUser,
  IUserRanks,
} from "@/types/user.types";

export const userService = {
  getUserInfo: (uid: string) =>
    apiRequest<IUser | "user_not_found">(`/user/${uid}`, {
      method: "GET",
    }),

  createTutorialPractice: (chapter: CreateTutorialPracticeRequest) =>
    apiRequest<CreateTutorialPracticeResponse>(
      `/create`,
      {
        method: "POST",
        body: JSON.stringify(chapter),
      },
      true,
    ),

  getStatistic: (uid: string) =>
    apiRequest<IStatistic>(`/user/${uid}/statistic/`, { method: "GET" }),

  getRanks: (uid: string) =>
    apiRequest<IUserRanks>(`/user/${uid}/ranks/`, { method: "GET" }),

  getSessionHistory: (sessionId: string, page: number = 1) =>
    apiRequest<IPaginatedSessionHistory>(`/session/${sessionId}/history/`, {
      method: "GET",
      params: { page },
    }),

  getRanking: (page: number = 1, pageSize: number = 50) =>
    apiRequest<IPaginatedRanking>(`/user/ranking/`, {
      method: "GET",
      params: { page, page_size: pageSize },
    }),
};
