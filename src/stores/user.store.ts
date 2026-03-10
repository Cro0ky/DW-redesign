import { create } from "zustand/index";

import { ERank, IUserState } from "@/types/user.types";

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

export const useUserStore = create<IUserState>((set) => ({
  ...initialUserState,
  setUserInfo: (state) => set(state),
}));
