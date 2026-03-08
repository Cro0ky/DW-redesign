"use client";
import { useState } from "react";
import styles from "./auth-component.module.scss";
import { useTranslations } from "next-intl";
import { Login } from "@/features/auth-component/components/login/login";
import { DroneWarsLogo } from "@/components";
import { Switcher } from "@/ui";
import { CnFlag, EnFlag, RuFlag } from "@/assets/svg";
import { useParams } from "next/navigation";

export type TAuthStep = "login" | "registration" | "recover_password";

export const AuthComponent = () => {
  const [step, setStep] = useState<TAuthStep>("login");
  const t = useTranslations();

  const getCurrentForm = () => {
    switch (step) {
      case "login":
        return <Login />;
      case "registration":
        return <div></div>;
      case "recover_password":
        return <div></div>;
    }
  };

  const { locale } = useParams();
  console.log(locale);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>{t(`auth.${step}.title`)}</div>
        {getCurrentForm()}
      </div>
      <div className={styles.info}>
        <DroneWarsLogo fullWidth={false} />
        <div className={styles.support}>
          <span className={styles.title}>Техническая поддержка:</span>
          <span>support@mail.dronewars.su</span>
          <Switcher
            isFullWidth
            onClick={() => {}}
            items={[
              {
                title: "ru",
                value: "ru",
                icon: <RuFlag />,
              },
              {
                title: "en",
                value: "en",
                icon: <EnFlag />,
              },
              {
                title: "cn",
                value: "cn",
                icon: <CnFlag />,
              },
            ]}
            selectedValue={"ru"}
          />
        </div>
      </div>
    </div>
  );
};
