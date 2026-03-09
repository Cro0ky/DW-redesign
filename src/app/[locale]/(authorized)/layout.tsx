import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { isAuthenticated } from "@/lib/auth";

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
