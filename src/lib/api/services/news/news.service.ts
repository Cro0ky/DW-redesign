import { apiRequest } from "@/lib/api/client";
import { INews } from "@/types/news.types";

export const newsService = {
  getNews: () =>
    apiRequest<{ results: INews[] }>(`/user/news/`, { method: "GET" }),

  getCurrentNews: (uid: string) =>
    apiRequest<INews>(`/user/news/${uid}`, { method: "GET" }),
};
