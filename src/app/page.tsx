import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import { routing } from "@/i18n/routing";

export default async function RootPage() {
  const locale = routing.defaultLocale;

  if (await isAuthenticated()) {
    redirect(`/${locale}/home`);
  }

  redirect(`/${locale}`);
}
