import { api } from "../client";
import {
  IAuthResponse,
  ILoginPayload,
  ILoginResponse,
  IRegisterPayload,
} from "./auth.types";

export const authService = {
  login: (payload: ILoginPayload) =>
    api.post<ILoginResponse>("/auth/login/", payload),

  register: (payload: IRegisterPayload) =>
    api.post<IAuthResponse>("/auth/register", payload),

  logout: () => api.post<void>("/auth/logout"),
};
