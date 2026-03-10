import { getCookie } from "cookies-next";

import type { IRequestConfig } from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2`;

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean>,
): string {
  const url = new URL(path.startsWith("http") ? path : `${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = response.statusText;
    let detail: string | undefined;
    try {
      const body = await response.json();
      message = body.message ?? body.error ?? body.detail ?? message;
      detail = body.detail;
    } catch {
      // ignore
    }
    throw { message, detail, status: response.status };
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }
  return response.text() as Promise<T>;
}

export async function apiRequest<T>(
  path: string,
  options: IRequestConfig = {},
): Promise<T> {
  const { params, ...init } = options;
  const url = buildUrl(path, params);
  const jwt = getCookie("jwt-access");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${jwt}`,
    ...init.headers,
  };

  const response = await fetch(url, {
    ...init,
    headers,
  });

  return handleResponse<T>(response);
}

export const api = {
  get: <T>(path: string, config?: IRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "GET" }),

  post: <T>(path: string, body?: unknown, config?: IRequestConfig) =>
    apiRequest<T>(path, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body?: unknown, config?: IRequestConfig) =>
    apiRequest<T>(path, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(path: string, body?: unknown, config?: IRequestConfig) =>
    apiRequest<T>(path, {
      ...config,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, config?: IRequestConfig) =>
    apiRequest<T>(path, { ...config, method: "DELETE" }),
};
