"use client";
import { useLayoutEffect } from "react";

import { useClearCookiesAndRedirect } from "@/hooks/useClearCookiesAndRedirect";
import { userService } from "@/lib/api/services/user/user.service";
import { useUserStore } from "@/stores";
import { getUserUuid } from "@/utils/getUserUuid";

export const useGetUserInfo = () => {
  const { getUserInfo } = userService;
  const { setUserInfo } = useUserStore();
  const clearCookiesAndRedirect = useClearCookiesAndRedirect();
  const userId = getUserUuid();

  useLayoutEffect(() => {
    // let isMounted = true;
    const request = async () => {
      try {
        if (!userId?.user_id) return;
        const data = await getUserInfo(userId.user_id);

        // if (!isMounted) return;

        if (data === "user_not_found") {
          clearCookiesAndRedirect();
          return;
        }
        setUserInfo(data);
      } catch {
        // if (!isMounted) return;
        clearCookiesAndRedirect();
      } finally {
        // if (isMounted) {
        //   changeField(false, "isLoading");
        // }
      }
    };

    request();

    // return () => {
    //   isMounted = false;
    // };
  }, [clearCookiesAndRedirect]);
};
