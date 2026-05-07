import { apiRequest, apiRequestJsonWithStatus } from "@/lib/api/client";
import type {
  IGameParameters,
  IPaginatedSessions,
} from "@/types/session.types";
import { IGameType } from "@/types/types";

export const sessionService = {
  list: (page: number = 1, pageSize: number = 20) =>
    apiRequest<IPaginatedSessions>(`/session/`, {
      method: "GET",
      params: { page, page_size: pageSize },
    }),

  createSession: (payload: IGameParameters) =>
    apiRequest<{
      id: string;
      name: string;
      passcode: number | null;
    }>(`/session/`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  deleteSession: (game_id: string) =>
    apiRequest(`/session`, {
      method: "DELETE",
      body: JSON.stringify({ id: game_id }),
    }),

  getOpponentStatusSession: (game_id: string) =>
    apiRequestJsonWithStatus<{ url?: string; detail?: string }>(
      `/session/${game_id}/start`,
      { method: "GET" },
    ),

  connectToSession: (props: {
    game_side?: string;
    session_id?: string;
    passcode?: number;
  }) =>
    apiRequest<ICodeConnectResponse>("session/accession/", {
      method: "POST",
      body: JSON.stringify(props),
    }),
};

export interface IConnectResponse {}

export interface IBaseConnectResponse {
  url: string;
}

export interface ICodeConnectResponse extends IBaseConnectResponse {
  game_type?: IGameType;
  session_id?: string;
  russia_count?: number;
  nato_count?: number;
}
