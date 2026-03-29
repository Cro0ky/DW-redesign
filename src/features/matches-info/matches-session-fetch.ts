import { sessionService } from "@/lib/api/services/session/session.service";
import type { IPaginatedSessions } from "@/types/session.types";

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
