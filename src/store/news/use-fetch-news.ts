import { useShallow } from "zustand/react/shallow";

import { useNewsStore } from "./news.store";

export function useFetchNews() {
  return useNewsStore(
    useShallow((state) => ({
      news: state.news,
      isLoading: state.isLoading,
      isError: state.isError,
      fetchNews: state.fetchNews,
    })),
  );
}
