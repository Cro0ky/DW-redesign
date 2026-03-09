import { redirect } from "next/navigation";

import { routing } from "@/i18n/routing";
import { isAuthenticated } from "@/lib/auth";

export default async function RootPage() {
  const locale = routing.defaultLocale;

  if (await isAuthenticated()) {
    redirect(`/${locale}/home`);
  }

  redirect(`/${locale}`);
}
