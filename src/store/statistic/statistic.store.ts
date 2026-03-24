import { create } from "zustand";

import { userService } from "@/lib/api/services/user/user.service";
import { IStatistic } from "@/types/user.types";

interface IStatisticState {
  statistic: IStatistic | null;
  userId: string | null;
  isLoading: boolean;
  isError: boolean;
  fetchStatistic: (uid: string, options?: { force?: boolean }) => Promise<void>;
  clearStatistic: () => void;
}

let inFlight: Promise<void> | null = null;
let inFlightUid: string | null = null;

export const useStatisticStore = create<IStatisticState>((set, get) => ({
  statistic: null,
  userId: null,
  isLoading: false,
  isError: false,

  clearStatistic: () => {
    inFlight = null;
    inFlightUid = null;
    set({ statistic: null, userId: null, isLoading: false, isError: false });
  },

  fetchStatistic: async (uid, options = {}) => {
    const { force = false } = options;
    const { statistic, userId } = get();

    if (!force && statistic !== null && userId === uid) return;

    if (!force && inFlight !== null && inFlightUid === uid) {
      await inFlight;
      return;
    }

    inFlightUid = uid;
    inFlight = (async () => {
      set({ isLoading: true, isError: false });
      try {
        const next = await userService.getStatistic(uid);
        set({
          statistic: next,
          userId: uid,
          isLoading: false,
          isError: false,
        });
      } catch {
        set({ isLoading: false, isError: true });
      } finally {
        inFlight = null;
        inFlightUid = null;
      }
    })();

    await inFlight;
  },
}));
