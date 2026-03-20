export interface INews {
  id: string;
  news_read: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  published: boolean;
  image: string;
  deleted_at: string | null;
  published_at: string;
  creator: string;
}

export interface INewsStore {
  news: INews[];
  isLoading: boolean;
  isError: boolean;
  newsFulfilled: (data: INews[]) => void;
  newsRejected: () => void;
  fetchNews: () => Promise<void>;
}
