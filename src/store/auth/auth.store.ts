import { deleteCookie } from "cookies-next";
import Cookies from "js-cookie";
import { create } from "zustand";

import { authService } from "@/lib/api/services/auth/auth.service";
import {
  type IAccount,
  type ILoginPayload,
  type IRegisterPayload,
} from "@/lib/api/services/auth/auth.types";
import { getQueryClient } from "@/lib/query/query-client";
import { useRanksStore } from "@/store/ranks/ranks.store";
import { useStatisticStore } from "@/store/statistic/statistic.store";
import { getDomain } from "@/utils/getDomain";

export type TAuthPage = "login" | "account_selection" | "verify_email";

interface IUser {
  id: string;
  email: string;
}

interface ILoginOptions {
  onSuccess?: (path?: string) => void;
  domain?: string;
}

interface IAuthState {
  user: IUser | null;
  accounts: IAccount[] | null;
  authPage: TAuthPage;
  isLoading: boolean;
  error: string | null;
  login: (
    payload: ILoginPayload,
    captchaToken?: string,
    options?: ILoginOptions,
  ) => Promise<void>;
  setAuthPage: (page: TAuthPage) => void;
  register: (payload: IRegisterPayload, captchaToken?: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const COOKIE_ACCESS = "jwt-access";
const COOKIE_REFRESH = "jwt-refresh";

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  accounts: null,
  authPage: "login",
  isLoading: false,
  error: null,

  setAuthPage: (authPage) => set({ authPage }),

  login: async (payload, captchaToken, options = {}) => {
    const { onSuccess, domain } = options;
    set({ isLoading: true, error: null });

    try {
      const res = await authService.login({
        ...payload,
        captcha_token: captchaToken,
      });

      set({ error: null });

      if (res.accounts) {
        set({
          accounts: res.accounts,
          authPage: "account_selection",
          isLoading: false,
        });
        return;
      }

      const cookieOpts =
        domain && !["localhost", "127.0.0.1"].includes(domain)
          ? { domain }
          : {};
      Cookies.set(COOKIE_ACCESS, res.access, cookieOpts);
      Cookies.set(COOKIE_REFRESH, res.refresh, cookieOpts);

      set({ isLoading: false });
      onSuccess?.("/home");
    } catch (err) {
      const obj = err && typeof err === "object" ? err : {};
      const detail = "detail" in obj ? String(obj.detail) : undefined;
      const message =
        "message" in obj ? String(obj.message) : "Ошибка авторизации";

      if (detail === "Please, verify your account") {
        set({
          authPage: "verify_email",
          error: null,
          isLoading: false,
        });
        return;
      }

      set({ error: message, isLoading: false });
      throw err;
    }
  },

  register: async (payload, captchaToken) => {
    set({ isLoading: true, error: null });
    try {
      const data = await authService.register({
        ...payload,
        captcha_token: captchaToken,
      });
      set({ user: data.user ?? null, isLoading: false, error: null });
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String(err.message)
          : "Ошибка регистрации";
      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      const refresh = Cookies.get(COOKIE_REFRESH);
      await authService.logout({ refresh: refresh ?? "" });
    } catch {
      // ignore
    } finally {
      const domain = getDomain();
      const opts = ["localhost", "127.0.0.1"].includes(domain)
        ? {}
        : { domain };
      deleteCookie(COOKIE_ACCESS, opts);
      deleteCookie(COOKIE_REFRESH, opts);
      getQueryClient().clear();
      useStatisticStore.getState().clearStatistic();
      useRanksStore.getState().clearRanks();
      set({ user: null, isLoading: false, error: null });
    }
  },

  clearError: () => set({ error: null }),
}));
