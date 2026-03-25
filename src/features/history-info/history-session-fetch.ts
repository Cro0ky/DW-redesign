import { userService } from "@/lib/api/services/user/user.service";
import type {
  IPaginatedSessionHistory,
  ISessionHistoryItem,
} from "@/types/history.types";

export async function fetchSessionHistoryPage(
  sessionId: string,
  page: number,
): Promise<IPaginatedSessionHistory | null> {
  try {
    return await userService.getSessionHistory(sessionId, page);
  } catch {
    return null;
  }
}

export type HistorySessionState = {
  rows: ISessionHistoryItem[];
  count: number;
  nextUrl: string | null;
  loading: boolean;
  error: boolean;
};

export const initialHistorySessionState: HistorySessionState = {
  rows: [],
  count: 0,
  nextUrl: null,
  loading: true,
  error: false,
};

export type HistorySessionAction =
  | { type: "no_session" }
  | { type: "fetch_start" }
  | { type: "fetch_ok"; data: IPaginatedSessionHistory }
  | { type: "fetch_err" };

export function historySessionReducer(
  state: HistorySessionState,
  action: HistorySessionAction,
): HistorySessionState {
  switch (action.type) {
    case "no_session":
      return { ...initialHistorySessionState, loading: false };
    case "fetch_start":
      return { ...state, loading: true, error: false };
    case "fetch_ok":
      return {
        ...state,
        loading: false,
        error: false,
        rows: action.data.results,
        count: action.data.count,
        nextUrl: action.data.next,
      };
    case "fetch_err":
      return {
        ...state,
        loading: false,
        error: true,
        rows: [],
        count: 0,
        nextUrl: null,
      };
    default:
      return state;
  }
}
