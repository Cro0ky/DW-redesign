import { userService } from "@/lib/api/services/user/user.service";
import type { IPaginatedSessionHistory } from "@/types/history.types";

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
