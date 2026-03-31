import { getCookie } from "cookies-next";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import {
  getAuthCookieSetOptions,
  JWT_ACCESS_COOKIE,
  JWT_REFRESH_COOKIE,
} from "@/lib/auth-cookies";
import { getQueryClientRef } from "@/providers/query-provider";

import type { IRefreshResponse } from "@/types/auth.types";
import type { IRequestConfig } from "./types";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v2`;
const SIMULATION_URL = `${process.env.NEXT_PUBLIC_BACKEND_SIMULATION_URL}/api/v1`;

function readCookieString(name: string): string | undefined {
  const v = getCookie(name);
  return typeof v === "string" ? v : undefined;
}

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean>,
  toSimulation?: boolean,
): string {
  const url = new URL(
    path.startsWith("http")
      ? path
      : `${toSimulation ? SIMULATION_URL : BASE_URL}${path}`,
  );
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
}

const AUTH_PATHS_WITHOUT_BEARER_REFRESH = [
  "/auth/login/",
  "/auth/register/",
  "/auth/refresh/",
] as const;

function skipRefreshForPath(path: string): boolean {
  return AUTH_PATHS_WITHOUT_BEARER_REFRESH.some((p) => path.startsWith(p));
}

const ACCESS_REFRESH_LEEWAY_SEC = 60;

function accessNeedsRefresh(access: string | undefined): boolean {
  const refresh = readCookieString(JWT_REFRESH_COOKIE);
  if (!refresh) return false;
  if (!access) return true;
  try {
    const { exp } = jwtDecode<{ exp?: number }>(access);
    if (exp == null) return false;
    return exp <= Date.now() / 1000 + ACCESS_REFRESH_LEEWAY_SEC;
  } catch {
    return true;
  }
}

let refreshPromise: Promise<boolean> | null = null;

function applyRefreshResponse(response: IRefreshResponse): boolean {
  if (!response.access) return false;
  const opts = getAuthCookieSetOptions();
  Cookies.set(JWT_ACCESS_COOKIE, response.access, opts);
  if (response.refresh) {
    Cookies.set(JWT_REFRESH_COOKIE, response.refresh, opts);
  }
  return true;
}

async function refreshSession(): Promise<boolean> {
  const refresh = readCookieString(JWT_REFRESH_COOKIE);
  if (!refresh) return false;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const qc = getQueryClientRef();
      const queryFn = () =>
        apiRequest<IRefreshResponse>(
          "/auth/refresh/",
          {
            method: "POST",
            body: JSON.stringify({ refresh }),
            skipAuthRefresh: true,
          },
          false,
        );

      try {
        const data = qc
          ? await qc.fetchQuery({
              queryKey: ["auth", "refresh-jwt", refresh],
              queryFn,
              staleTime: 0,
              gcTime: 0,
            })
          : await queryFn();
        return applyRefreshResponse(data);
      } catch {
        return false;
      } finally {
        refreshPromise = null;
      }
    })();
  }

  return refreshPromise;
}

async function parseResponse<T>(response: Response): Promise<T> {
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

async function fetchWithAuth(
  path: string,
  options: IRequestConfig = {},
  toSimulation: boolean = false,
): Promise<Response> {
  const { params, skipAuthRefresh, ...init } = options;
  const url = buildUrl(path, params, toSimulation);

  if (
    !toSimulation &&
    !skipAuthRefresh &&
    !skipRefreshForPath(path) &&
    accessNeedsRefresh(readCookieString(JWT_ACCESS_COOKIE))
  ) {
    await refreshSession();
  }

  const token = readCookieString(JWT_ACCESS_COOKIE);
  const request = () =>
    fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
    });

  let res = await request();

  if (
    res.status === 401 &&
    !toSimulation &&
    !skipAuthRefresh &&
    !skipRefreshForPath(path)
  ) {
    const ok = await refreshSession();
    if (ok) {
      const nextToken = readCookieString(JWT_ACCESS_COOKIE);
      res = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(nextToken ? { Authorization: `Bearer ${nextToken}` } : {}),
          ...init.headers,
        },
      });
    }
  }

  return res;
}

export async function apiRequest<T>(
  path: string,
  options: IRequestConfig = {},
  toSimulation: boolean = false,
): Promise<T> {
  const res = await fetchWithAuth(path, options, toSimulation);
  return parseResponse<T>(res);
}

/** Парсит JSON и возвращает HTTP-статус (для 2xx). При !ok бросает как {@link apiRequest}. */
export async function apiRequestJsonWithStatus<T>(
  path: string,
  options: IRequestConfig = {},
  toSimulation: boolean = false,
): Promise<{ status: number; data: T }> {
  const res = await fetchWithAuth(path, options, toSimulation);
  const contentType = res.headers.get("content-type");
  let data: T;
  if (contentType?.includes("application/json")) {
    data = await res.json();
  } else {
    data = (await res.text()) as T;
  }
  if (!res.ok) {
    let message = res.statusText;
    let detail: string | undefined;
    if (typeof data === "object" && data !== null) {
      const body = data as Record<string, unknown>;
      message = String(body.message ?? body.error ?? body.detail ?? message);
      detail = body.detail as string | undefined;
    }
    throw { message, detail, status: res.status };
  }
  return { status: res.status, data };
}
