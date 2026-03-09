import "../styles/globals.scss";

import type { Metadata } from "next";
import { Oswald, Roboto_Condensed, Roboto_Flex } from "next/font/google";
import { ReactNode, Suspense } from "react";

import { MailRuCounter, YandexMetrika } from "@/components";
import { routing } from "@/i18n/routing";

const roboto = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto",
});
const oswald = Oswald({
  subsets: ["cyrillic", "latin"],
  variable: "--font-oswald",
});
const robotoFlex = Roboto_Flex({
  subsets: ["cyrillic", "latin"],
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "Онлайн-игра «Битва дронов: Украина»",
  description:
    "Бесплатная симуляция по мотивам боевых действий на Украине. Выбери сторону и покажи свои тактические навыки в новой стратегии, управляя одной из самых сильных армий в мире.",
  openGraph: {
    title: "Онлайн-игра «Битва дронов: Украина»",
    description:
      "Бесплатная симуляция по мотивам боевых действий на Украине. Выбери сторону и покажи свои тактические навыки в новой стратегии, управляя одной из самых сильных армий в мире.",
    url: "https://dronewars.su/",
    determiner: "auto",
    images: [
      {
        url: "https://s3.dronewars.space/drones-prod/thumbnail.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords:
    "битва дронов, браузерные военные игры, пошаговые военные стратегии, дрон игра, симулятор бпла, браузерные стратегии, симулятор сво, игра беспилотник, бпла игра, бпла симулятор, игра симулятор войны, онлайн стратегии браузерные",
};

interface IAppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: Readonly<IAppLayoutProps>) {
  return (
    <html
      className={`${roboto.variable} ${oswald.variable} ${robotoFlex.variable}`}
      lang={routing.defaultLocale}
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <Suspense>
          <YandexMetrika />
          <MailRuCounter />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
