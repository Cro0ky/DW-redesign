import styles from "./sidebar.module.scss";
import { useSidebar } from "./hooks/useSidebar";
import { DroneWarsLogo } from "@/components";
import { SupportComponent, SidebarItem } from "./components";

export const Sidebar = () => {
  const { DEFAULT_SIDEBAR_ITEMS } = useSidebar();

  return (
    <div className={styles.wrapper}>
      <DroneWarsLogo />
      <div className={styles.items}>
        {DEFAULT_SIDEBAR_ITEMS.map((item) => (
          <SidebarItem {...item} key={item.href} />
        ))}
      </div>
      <SupportComponent />
    </div>
  );
};
