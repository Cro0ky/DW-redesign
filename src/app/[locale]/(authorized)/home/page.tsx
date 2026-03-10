"use client";

import { BookOpenText } from "lucide-react";

import { useRouter } from "@/i18n/routing";
import { Button } from "@/ui";

import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.banner}>
        <div className={styles.text}>
          <span className={styles.title}>Основы игры</span>
          <span className={styles.subtitle}>
            Обучение поможет вам разобраться в механике
          </span>
        </div>

        <Button
          children={"Начать обучение"}
          iconLeft={<BookOpenText />}
          onClick={() => router.push("/tutorial")}
          color={"gray"}
        />
      </div>
    </div>
  );
}
