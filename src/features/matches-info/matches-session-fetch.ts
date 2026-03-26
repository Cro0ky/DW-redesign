import { sessionService } from "@/lib/api/services/session/session.service";
import type { IPaginatedSessions, ISessionListItem } from "@/types/session.types";

export async function fetchSessionsPage(
  page: number,
  pageSize: number,
): Promise<IPaginatedSessions | null> {
  try {
    return await sessionService.list(page, pageSize);
  } catch {
    return null;
  }
}

export type MatchesSessionState = {
  rows: ISessionListItem[];
  count: number;
  loading: boolean;
  error: boolean;
};

export const initialMatchesSessionState: MatchesSessionState = {
  rows: [],
  count: 0,
  loading: true,
  error: false,
};

export type MatchesSessionAction =
  | { type: "fetch_start" }
  | { type: "fetch_ok"; data: IPaginatedSessions }
  | { type: "fetch_err" };

export function matchesSessionReducer(
  state: MatchesSessionState,
  action: MatchesSessionAction,
): MatchesSessionState {
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
      };
    case "fetch_err":
      return {
        ...state,
        loading: false,
        error: true,
        rows: [],
        count: 0,
      };
    default:
      return state;
  }
}
