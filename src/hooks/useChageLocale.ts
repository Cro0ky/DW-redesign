import { useCallback } from "react";

import { usePathname, useRouter } from "@/i18n/routing";

export const useChangeLocale = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
    },
    [pathname, router],
  );
  return { handleChangeLocale };
};
