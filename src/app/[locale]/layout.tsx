import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Header, Sidebar } from "@/components";
import { ModalContainer } from "@/features";
import { routing } from "@/i18n/routing";
import type { TLanguage } from "@/i18n/types";
import { isAuthenticated } from "@/lib/auth";
import { QueryProvider } from "@/providers/query-provider";

import styles from "./layout.module.scss";
import { ToastContainer } from "react-toastify";

const LOCALE_HEADER = "X-NEXT-INTL-LOCALE";

function resolveLocaleParam(
  paramLocale: string | undefined,
  headerLocale: string | null,
): string {
  if (paramLocale && hasLocale(routing.locales, paramLocale)) {
    return paramLocale;
  }
  if (headerLocale && hasLocale(routing.locales, headerLocale)) {
    return headerLocale;
  }
  return routing.defaultLocale;
}

interface IRootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<IRootLayoutProps>) {
  const { locale: paramLocale } = await params;
  const headerLocale = (await headers()).get(LOCALE_HEADER);
  const locale = resolveLocaleParam(paramLocale, headerLocale) as TLanguage;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isAuth = await isAuthenticated();

  return (
    <NextIntlClientProvider>
      <QueryProvider>
        <ToastContainer
          limit={3}
          theme={"dark"}
          position="bottom-right"
          toastClassName={styles.toast}
          progressClassName={styles.progressBar}
        />
        <div className={styles.wrapper}>
          {!isAuth ? (
            <>{children}</>
          ) : (
            <>
              <Sidebar />
              <div className={styles.content}>
                <Header />
                <div className={styles.content_wrapper}>{children}</div>
                <ModalContainer />
              </div>
            </>
          )}
        </div>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
