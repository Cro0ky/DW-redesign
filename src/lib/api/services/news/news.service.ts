import { api } from "@/lib/api";
import { INews } from "@/types/news.types";

export const newsService = {
  getNews: () => api.get<{ results: INews[] }>(`/user/news/`),
  getCurrentNews: (uid: string) => api.get<INews>(`/user/news/${uid}`),
};
