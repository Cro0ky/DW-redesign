import { create } from "zustand/index";
import { INews, INewsStore } from "@/types/news.types";

export const useNewsStore = create<INewsStore>((set) => ({
  news: [],
  setNews: (news: INews[]) => set({ news }),
}));
