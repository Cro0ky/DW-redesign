import { useShallow } from "zustand/react/shallow";

import { useUserStore } from "@/store";

export function useFetchUserInfo() {
  return useUserStore(
    useShallow((state) => ({
      ...state,
      isLoading: state.isLoading,
      isError: state.isError,
      fetchUser: state.fetchUser,
    })),
  );
}
