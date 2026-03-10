"use client";

import {
  BookMarked,
  CircleHelp,
  CircleUser,
  GraduationCap,
  Play,
  Trophy,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

export const useSidebar = () => {
  const t = useTranslations();

  const DEFAULT_SIDEBAR_ITEMS = [
    { href: "home", title: t("sidebar.home"), icon: <Play /> },
    { href: "tutorial", title: t("sidebar.tutorial"), icon: <GraduationCap /> },
    { href: "matches", title: t("sidebar.matches"), icon: <Users /> },
    { href: "profile", title: t("sidebar.profile"), icon: <CircleUser /> },
    { href: "leaders", title: t("sidebar.leaders"), icon: <Trophy /> },
    {
      href: "knowledge_base",
      title: t("sidebar.knowledge_base"),
      icon: <BookMarked />,
    },
    { href: "faq", title: t("sidebar.faq"), icon: <CircleHelp /> },
    // { href: "news", title: t("sidebar.news"), icon: <Newspaper /> },
  ];

  return { DEFAULT_SIDEBAR_ITEMS };
};
