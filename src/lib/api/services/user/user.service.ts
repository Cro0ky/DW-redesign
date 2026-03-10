import { api } from "@/lib/api";
import { IUser } from "@/types/user.types";

export const userService = {
  getUserInfo: (uid: string) =>
    api.get<IUser | "user_not_found">(`/user/${uid}`),
};
