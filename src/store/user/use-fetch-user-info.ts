"use client";

import { useQuery } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";

import { userService } from "@/lib/api/services/user/user.service";
import { queryKeys } from "@/lib/query/query-keys";
import { useUserStore } from "@/store";
import { getUserUuid } from "@/utils/getUserUuid";

export function useFetchUserInfo() {
  const userId = getUserUuid()?.user_id ?? "";

  const query = useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: async ({ queryKey }) => {
      const uid = queryKey[1] as string;
      const data = await userService.getUserInfo(uid);
      if (data === "user_not_found") {
        throw new Error("USER_NOT_FOUND");
      }
      return data;
    },
    enabled: Boolean(userId),
  });

  const slice = useUserStore(useShallow((user) => user));

  return {
    ...slice,
    isLoading: query.isPending,
    isError: query.isError,
  };
}
