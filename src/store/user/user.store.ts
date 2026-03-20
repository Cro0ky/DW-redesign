import { create } from "zustand";

import { userService } from "@/lib/api/services/user/user.service";
import { ERank, IUser, IUserState } from "@/types/user.types";

export const initialUserState = {
  id: "",
  username: "",
  email: "",
  frame_number: 1,
  avatar_number: 1,
  single_completed: false,
  fio: "",
  rank: ERank.PRIVATE,
  experience: 0,
  tutorial_unit: "",
  rt_tutorial_unit: "",
  is_staff: false,
};

export const useUserStore = create<IUserState>((set, get) => ({
  ...initialUserState,
  isLoading: true,
  isError: false,

  setUserInfo: (state) => set(state),

  userFulfilled: (data: IUser) =>
    set({ ...data, isLoading: false, isError: false }),

  userRejected: () => set({ isLoading: false, isError: true }),

  setUserLoading: (value) => set({ isLoading: value }),

  fetchUser: async (uid: string) => {
    set({ isLoading: true, isError: false });
    try {
      const data = await userService.getUserInfo(uid);
      if (data === "user_not_found") {
        set({ isLoading: false });
        return { userNotFound: true };
      }
      get().userFulfilled(data);
    } catch {
      get().userRejected();
    }
  },
}));
