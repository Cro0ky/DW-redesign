import { apiRequest } from "@/lib/api/client";
import { INews } from "@/types/news.types";

/** API может отдать список массивом или в обёртке `{ results: [...] }`. */
export function normalizeNewsListPayload(data: unknown): INews[] {
  if (Array.isArray(data)) return data;
  if (
    data !== null &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray((data as { results: unknown }).results)
  ) {
    return (data as { results: INews[] }).results;
  }
  return [];
}

export const newsService = {
  getNews: () =>
    apiRequest<unknown>(`/user/news/`, { method: "GET" }).then(
      normalizeNewsListPayload,
    ),

  getCurrentNews: (uid: string) =>
    apiRequest<INews>(`/user/news/${uid}`, { method: "GET" }),
};
