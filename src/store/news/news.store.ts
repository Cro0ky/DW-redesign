import { create } from "zustand";

import { newsService } from "@/lib/api/services/news/news.service";
import { INewsStore } from "@/types/news.types";

export const useNewsStore = create<INewsStore>((set, get) => ({
  news: [],
  isLoading: true,
  isError: false,

  newsFulfilled: (data) =>
    set({ news: data, isLoading: false, isError: false }),
  newsRejected: () => set({ isLoading: false, isError: true }),

  fetchNews: async () => {
    set({ isLoading: true, isError: false });
    try {
      const { results } = await newsService.getNews();
      get().newsFulfilled(results ?? []);
    } catch {
      get().newsRejected();
    }
  },
}));
