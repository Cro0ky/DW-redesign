"use client";

import { useCallback } from "react";
import { useLocale } from "next-intl";

import { useAuthStore } from "@/stores";

export const useClearCookiesAndRedirect = () => {
  const locale = useLocale();
  const logout = useAuthStore((state) => state.logout);

  return useCallback(async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      window.location.href = `/${locale}`;
    }
  }, [locale, logout]);
};
