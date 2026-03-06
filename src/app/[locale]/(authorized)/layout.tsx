import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import { routing } from "@/i18n/routing";

import type { ReactNode } from "react";

interface IAuthorizedLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AuthorizedLayout({
  children,
  params,
}: IAuthorizedLayoutProps) {
  const { locale } = await params;

  if (!(await isAuthenticated())) {
    redirect(`/${locale}`);
  }

  return <>{children}</>;
}
