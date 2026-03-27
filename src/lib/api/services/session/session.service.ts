import { api } from "@/lib/api";
import type {
  ICreateSingleParams,
  IPaginatedSessions,
} from "@/types/session.types";

export const sessionService = {
  list: (page: number = 1, pageSize: number = 20) =>
    api.get<IPaginatedSessions>(`/session/`, {
      params: { page, page_size: pageSize },
    }),
  createSingle: (payload: ICreateSingleParams) =>
    api.post<{
      id: string;
      name: string;
      passcode: number | null;
    }>(`/session/`, payload),
};
