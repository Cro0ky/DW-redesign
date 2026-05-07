import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { hasLocale } from "next-intl";
import type { ReactNode } from "react";

import { routing } from "@/i18n/routing";
import type { TLanguage } from "@/i18n/types";
import { isAuthenticated } from "@/lib/auth";

const LOCALE_HEADER = "X-NEXT-INTL-LOCALE";

function resolveLocaleParam(
  paramLocale: string | undefined,
  headerLocale: string | null,
): TLanguage {
  if (paramLocale && hasLocale(routing.locales, paramLocale)) {
    return paramLocale as TLanguage;
  }
  if (headerLocale && hasLocale(routing.locales, headerLocale)) {
    return headerLocale as TLanguage;
  }
  return routing.defaultLocale;
}

interface IAuthorizedLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AuthorizedLayout({
  children,
  params,
}: IAuthorizedLayoutProps) {
  const { locale: paramLocale } = await params;
  const headerLocale = (await headers()).get(LOCALE_HEADER);
  const locale = resolveLocaleParam(paramLocale, headerLocale);

  if (!(await isAuthenticated())) {
    redirect(`/${locale}`);
  }

  return <>{children}</>;
}
