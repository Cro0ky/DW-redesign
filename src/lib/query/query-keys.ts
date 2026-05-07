export const queryKeys = {
  user: (uid: string) => ["user", uid] as const,
  userStatistic: (uid: string) => ["user", uid, "statistic"] as const,
  userRanks: (uid: string) => ["user", uid, "ranks"] as const,
  /** Список новостей (не смешивать с {@link queryKeys.newsDetail}). */
  newsList: () => ["news", "list"] as const,
  newsDetail: (uuid: string) => ["news", "detail", uuid] as const,
  sessions: (page: number, pageSize: number) =>
    ["sessions", page, pageSize] as const,
  sessionHistory: (sessionId: string, page: number) =>
    ["session-history", sessionId, page] as const,
  ranking: (page: number, pageSize: number) =>
    ["ranking", page, pageSize] as const,
};
