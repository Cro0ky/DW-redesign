import { redirect } from "next/navigation";

import { AuthComponent } from "@/features";
import { isAuthenticated } from "@/lib/auth";

import styles from "./page.module.scss";

interface ILandingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: ILandingPageProps) {
  const { locale } = await params;

  if (await isAuthenticated()) {
    redirect(`/${locale}/home`);
  }

  return (
    <div className={styles.page}>
      <AuthComponent />
    </div>
  );
}
