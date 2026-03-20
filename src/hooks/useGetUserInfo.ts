"use client";

import { useLayoutEffect } from "react";

import { useClearCookiesAndRedirect } from "@/hooks/useClearCookiesAndRedirect";
import { useUserStore } from "@/store";
import { getUserUuid } from "@/utils/getUserUuid";

export const useGetUserInfo = () => {
  const { fetchUser, setUserLoading } = useUserStore();
  const clearCookiesAndRedirect = useClearCookiesAndRedirect();
  const userId = getUserUuid();

  useLayoutEffect(() => {
    if (!userId?.user_id) {
      setUserLoading(false);
      return;
    }

    fetchUser(userId.user_id).then((result) => {
      if (result?.userNotFound) {
        clearCookiesAndRedirect();
      }
    });
  }, [fetchUser, setUserLoading, userId?.user_id, clearCookiesAndRedirect]);
};
