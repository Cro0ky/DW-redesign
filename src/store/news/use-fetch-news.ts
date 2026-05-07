import { useQuery } from "@tanstack/react-query";

import { newsService } from "@/lib/api/services/news/news.service";
import { queryKeys } from "@/lib/query/query-keys";

export function useFetchNews() {
  const query = useQuery({
    queryKey: queryKeys.newsList(),
    queryFn: () => newsService.getNews(),
  });

  return {
    news: query.data ?? [],
    isLoading: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
}
