export interface IApiError {
  message: string;
  status: number;
  code?: string;
}

export interface IRequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}
