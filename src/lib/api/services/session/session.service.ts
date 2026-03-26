import { api } from "@/lib/api";
import type { IPaginatedSessions } from "@/types/session.types";

export const sessionService = {
  list: (page: number = 1, pageSize: number = 20) =>
    api.get<IPaginatedSessions>(`/session/`, {
      params: { page, page_size: pageSize },
    }),
};
