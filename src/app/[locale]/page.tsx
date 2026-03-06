import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import { routing } from "@/i18n/routing";

interface ILandingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: ILandingPageProps) {
  const { locale } = await params;

  if (await isAuthenticated()) {
    redirect(`/${locale}/home`);
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Landing</h1>
      <p>Войдите, чтобы продолжить</p>
    </div>
  );
}
