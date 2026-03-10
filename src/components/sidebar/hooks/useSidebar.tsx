import {
  BookMarked,
  CircleHelp,
  CircleUser,
  GraduationCap,
  Play,
  Trophy,
  Users,
} from "lucide-react";

export const useSidebar = () => {
  const DEFAULT_SIDEBAR_ITEMS = [
    {
      href: "home",
      title: "Главная",
      icon: <Play />,
    },
    {
      href: "tutorial",
      title: "Обучение",
      icon: <GraduationCap />,
    },
    {
      href: "matches",
      title: "Матчи",
      icon: <Users />,
    },
    {
      href: "profile",
      title: "Профиль",
      icon: <CircleUser />,
    },
    {
      href: "leaders",
      title: "Таблица лидеров",
      icon: <Trophy />,
    },
    {
      href: "knowledge_base",
      title: "База знаний",
      icon: <BookMarked />,
    },
    {
      href: "faq",
      title: "FAQ",
      icon: <CircleHelp />,
    },
    // {
    //   href: "news",
    //   title: "Новости",
    //   icon: <Newspaper />,
    // },
  ];

  return { DEFAULT_SIDEBAR_ITEMS };
};
