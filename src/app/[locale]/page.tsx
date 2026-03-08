import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import styles from "./page.module.scss";
import { AuthComponent } from "@/features/auth-component/auth-component";

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
