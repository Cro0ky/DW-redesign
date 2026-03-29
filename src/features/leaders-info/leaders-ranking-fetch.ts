import { userService } from "@/lib/api/services/user/user.service";
import type { IPaginatedRanking } from "@/types/ranking.types";

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
