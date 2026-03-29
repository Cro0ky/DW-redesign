import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Header, Sidebar } from "@/components";
import { ModalContainer } from "@/features";
import { routing } from "@/i18n/routing";
import { isAuthenticated } from "@/lib/auth";
import { QueryProvider } from "@/providers/query-provider";

import styles from "./layout.module.scss";

interface IRootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: Readonly<IRootLayoutProps>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const isAuth = await isAuthenticated();

  return (
    <NextIntlClientProvider>
      <QueryProvider>
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
