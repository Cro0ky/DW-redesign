import { create } from "zustand";

import { userService } from "@/lib/api/services/user/user.service";
import { IUserRanks } from "@/types/user.types";

interface IRanksState {
  ranks: IUserRanks | null;
  userId: string | null;
  isLoading: boolean;
  isError: boolean;
  fetchRanks: (uid: string, options?: { force?: boolean }) => Promise<void>;
  clearRanks: () => void;
}

let inFlight: Promise<void> | null = null;
let inFlightUid: string | null = null;

export const useRanksStore = create<IRanksState>((set, get) => ({
  ranks: null,
  userId: null,
  isLoading: false,
  isError: false,

  clearRanks: () => {
    inFlight = null;
    inFlightUid = null;
    set({ ranks: null, userId: null, isLoading: false, isError: false });
  },

  fetchRanks: async (uid, options = {}) => {
    const { force = false } = options;
    const { ranks, userId } = get();

    if (!force && ranks !== null && userId === uid) return;

    if (!force && inFlight !== null && inFlightUid === uid) {
      await inFlight;
      return;
    }

    inFlightUid = uid;
    inFlight = (async () => {
      set({ isLoading: true, isError: false });
      try {
        const next = await userService.getRanks(uid);
        set({
          ranks: next,
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
