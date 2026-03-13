import { api } from "@/lib/api";
import {
  CreateTutorialPracticeRequest,
  CreateTutorialPracticeResponse,
  IUser,
} from "@/types/user.types";

export const userService = {
  getUserInfo: (uid: string) =>
    api.get<IUser | "user_not_found">(`/user/${uid}`),

  createTutorialPractice: (chapter: CreateTutorialPracticeRequest) =>
    api.post<CreateTutorialPracticeResponse>(`/create`, chapter, true),
};
