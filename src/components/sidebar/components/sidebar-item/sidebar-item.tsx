import { FC, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import styles from "./sidebar-item.module.scss";

interface ISidebarItem {
  href: string;
  title: string;
  icon?: ReactNode;
}

export const SidebarItem: FC<ISidebarItem> = ({ href, title, icon }) => {
  return (
    <Link href={href} className={styles.item}>
      {icon}
      {title}
    </Link>
  );
};
