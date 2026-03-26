import cn from "classnames";
import { FC, ReactNode } from "react";

import { Link, usePathname } from "@/i18n/routing";

import styles from "./sidebar-item.module.scss";

interface ISidebarItem {
  href: string;
  title: string;
  icon?: ReactNode;
}

export const SidebarItem: FC<ISidebarItem> = ({ href, title, icon }) => {
  const router = usePathname();
  const url = router.slice(1);
  return (
    <Link
      href={href}
      className={cn(styles.item, {
        [styles.active]: href === url,
      })}
    >
      {icon}
      {title}
    </Link>
  );
};
