"use client";

import { useLocale } from "next-intl";
import { useCallback } from "react";

import { useAuthStore } from "@/store";

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
