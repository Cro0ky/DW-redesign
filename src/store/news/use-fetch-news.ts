import { useQuery } from "@tanstack/react-query";

import { newsService } from "@/lib/api/services/news/news.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { INews } from "@/types/news.types";

export function useFetchNews() {
  const query = useQuery({
    queryKey: queryKeys.news(),
    queryFn: async () => {
      const { results } = await newsService.getNews();
      return (results ?? []) as INews[];
    },
  });

  return {
    news: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}
