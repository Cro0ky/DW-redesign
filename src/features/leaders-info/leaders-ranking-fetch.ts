import { userService } from "@/lib/api/services/user/user.service";
import type { IPaginatedRanking, IRankingRow } from "@/types/ranking.types";

export async function fetchRankingPage(
  page: number,
  pageSize: number,
): Promise<IPaginatedRanking | null> {
  try {
    return await userService.getRanking(page, pageSize);
  } catch {
    return null;
  }
}

export type LeadersRankingState = {
  rows: IRankingRow[];
  count: number;
  myPosition: number | null;
  nextUrl: string | null;
  loading: boolean;
  error: boolean;
};

export const initialLeadersRankingState: LeadersRankingState = {
  rows: [],
  count: 0,
  myPosition: null,
  nextUrl: null,
  loading: true,
  error: false,
};

export type LeadersRankingAction =
  | { type: "fetch_start" }
  | { type: "fetch_ok"; data: IPaginatedRanking }
  | { type: "fetch_err" };

export function leadersRankingReducer(
  state: LeadersRankingState,
  action: LeadersRankingAction,
): LeadersRankingState {
  switch (action.type) {
    case "fetch_start":
      return { ...state, loading: true, error: false };
    case "fetch_ok":
      return {
        ...state,
        loading: false,
        error: false,
        rows: action.data.results,
        count: action.data.count,
        myPosition: action.data.my_position ?? null,
        nextUrl: action.data.next,
      };
    case "fetch_err":
      return {
        ...state,
        loading: false,
        error: true,
        rows: [],
        count: 0,
        myPosition: null,
        nextUrl: null,
      };
    default:
      return state;
  }
}
