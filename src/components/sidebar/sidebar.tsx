"use client";

import { DroneWarsLogo } from "@/components";

import { SidebarItem, SupportComponent } from "./components";
import { useSidebar } from "./hooks/use-sidebar";
import styles from "./sidebar.module.scss";
import { useUserStore } from "@/store";
import { NotebookPen } from "lucide-react";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
  const { DEFAULT_SIDEBAR_ITEMS, ADMIN_SIDEBAR_ITEMS } = useSidebar();
  const { is_staff } = useUserStore();
  const t = useTranslations();

  return (
    <div className={styles.wrapper}>
      <DroneWarsLogo />
      <div className={styles.items}>
        {DEFAULT_SIDEBAR_ITEMS.map((item) => (
          <SidebarItem {...item} key={item.href} />
        ))}

        <>
          <span className={styles.topic}>Радиоканал</span>

          <SidebarItem
            href={"radio-channels"}
            title={t("sidebar.radio-channels")}
            icon={<NotebookPen />}
          />
        </>

        {is_staff && (
          <>
            <span className={styles.topic}>Админ</span>

            {ADMIN_SIDEBAR_ITEMS.map((item) => (
              <SidebarItem {...item} key={item.href} />
            ))}
          </>
        )}
      </div>
      <SupportComponent />
    </div>
  );
};
