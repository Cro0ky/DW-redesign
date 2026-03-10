import { api } from "@/lib/api";
import {
  IAuthResponse,
  ILoginPayload,
  ILoginResponse,
  ILogoutRequest,
  IRegisterPayload,
} from "./auth.types";

export const authService = {
  login: (payload: ILoginPayload) =>
    api.post<ILoginResponse>("/auth/login/", payload),

  register: (payload: IRegisterPayload) =>
    api.post<IAuthResponse>("/auth/register/", payload),

  logout: (payload: ILogoutRequest) => api.post("/auth/logout/", payload),
};
