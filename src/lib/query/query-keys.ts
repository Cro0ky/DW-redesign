export const queryKeys = {
  sessions: {
    all: ["sessions"] as const,
    list: (page: number, pageSize: number) =>
      [...queryKeys.sessions.all, "list", page, pageSize] as const,
  },
  ranking: {
    all: ["ranking"] as const,
    list: (page: number, pageSize: number) =>
      [...queryKeys.ranking.all, page, pageSize] as const,
  },
  sessionHistory: (sessionId: string, page: number) =>
    ["session", sessionId, "history", page] as const,
  user: {
    detail: (uid: string) => ["user", uid] as const,
    statistic: (uid: string) => ["user", uid, "statistic"] as const,
    ranks: (uid: string) => ["user", uid, "ranks"] as const,
  },
  news: {
    all: ["news"] as const,
    list: () => [...queryKeys.news.all, "list"] as const,
  },
} as const;
