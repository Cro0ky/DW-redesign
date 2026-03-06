import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

import { Header, Sidebar } from "@/components";
import { routing } from "@/i18n/routing";

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

  return (
    <NextIntlClientProvider>
      <div className={styles.wrapper}>
        <Sidebar />
        <div className={styles.content}>
          <Header />
          {children}
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
