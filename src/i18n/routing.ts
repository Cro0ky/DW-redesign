import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "cn", "ru"],
  // Used when no locale matches
  defaultLocale: "ru",
  // Always redirect to default locale, not browser locale
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
