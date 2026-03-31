"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useState } from "react";

import { useClearCookiesAndRedirect } from "@/hooks/use-clear-cookies-and-redirect";
import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import { useUserStore } from "@/store";
import { getUserUuid } from "@/utils/getUserUuid";

const USER_NOT_FOUND = "USER_NOT_FOUND";

/** После SSR/`cookies-next` на сервере JWT недоступен; без клиентского флага запрос мог не стартовать. */
export const useGetUserInfo = () => {
  const [clientReady, setClientReady] = useState(false);

  useLayoutEffect(() => {
    setClientReady(true);
  }, []);

  const userId = clientReady ? (getUserUuid()?.user_id ?? "") : "";
  const clearCookiesAndRedirect = useClearCookiesAndRedirect();

  const query = useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: async ({ queryKey }) => {
      const uid = queryKey[1] as string;
      const data = await userService.getUserInfo(uid);
      if (data === "user_not_found") {
        throw new Error(USER_NOT_FOUND);
      }
      return data;
    },
    enabled: clientReady && Boolean(userId),
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      useUserStore.getState().setUserInfo(query.data);
    }
  }, [query.isSuccess, query.data]);

  useEffect(() => {
    if (!query.isError || !query.error) return;
    if (query.error.message === USER_NOT_FOUND) {
      void clearCookiesAndRedirect();
    }
  }, [query.isError, query.error, clearCookiesAndRedirect]);
};
