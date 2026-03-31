import { apiRequest } from "@/lib/api/client";

import {
  IAuthResponse,
  ILoginPayload,
  ILoginResponse,
  ILogoutRequest,
  IRefreshResponse,
  IRegisterPayload,
} from "@/types/auth.types";

export const authService = {
  login: (payload: ILoginPayload) =>
    apiRequest<ILoginResponse>("/auth/login/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  register: (payload: IRegisterPayload) =>
    apiRequest<IAuthResponse>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  tokenRefresh: (payload: { refresh: string }) =>
    apiRequest<IRefreshResponse>("/auth/refresh/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  logout: (payload: ILogoutRequest) =>
    apiRequest("/auth/logout/", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
