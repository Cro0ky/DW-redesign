export const JWT_ACCESS_COOKIE = "jwt-access";
export const JWT_REFRESH_COOKIE = "jwt-refresh";

/** Должен совпадать с опциями при логине, чтобы refresh перезаписывал те же куки. */
export function getAuthCookieSetOptions(): { domain?: string } {
  if (typeof window === "undefined") return {};
  const hostname = new URL(window.location.origin).hostname;
  if (["localhost", "127.0.0.1"].includes(hostname)) return {};
  return { domain: hostname };
}
