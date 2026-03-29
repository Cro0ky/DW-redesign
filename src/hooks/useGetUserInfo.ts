"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useClearCookiesAndRedirect } from "@/hooks/useClearCookiesAndRedirect";
import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import { useUserStore } from "@/store";
import { getUserUuid } from "@/utils/getUserUuid";

export const useGetUserInfo = () => {
  const userFulfilled = useUserStore((s) => s.userFulfilled);
  const userRejected = useUserStore((s) => s.userRejected);
  const setUserLoading = useUserStore((s) => s.setUserLoading);
  const clearCookiesAndRedirect = useClearCookiesAndRedirect();
  const userId = getUserUuid();
  const uid = userId?.user_id;

  const { data, isError, isPending, isFetching } = useQuery({
    queryKey: queryKeys.user.detail(uid ?? ""),
    queryFn: async () => {
      const r = await userService.getUserInfo(uid!);
      if (r === "user_not_found") return { notFound: true as const };
      return { notFound: false as const, user: r };
    },
    enabled: !!uid,
    staleTime: 30_000,
  });

  useEffect(() => {
    if (!uid) {
      setUserLoading(false);
    }
  }, [uid, setUserLoading]);

  useEffect(() => {
    if (!uid) return;
    if (isPending || isFetching) {
      setUserLoading(true);
      return;
    }
    setUserLoading(false);
    if (data?.notFound) {
      clearCookiesAndRedirect();
      return;
    }
    if (data && !data.notFound) {
      userFulfilled(data.user);
    }
  }, [
    uid,
    data,
    isPending,
    isFetching,
    setUserLoading,
    userFulfilled,
    clearCookiesAndRedirect,
  ]);

  useEffect(() => {
    if (isError) userRejected();
  }, [isError, userRejected]);
};
