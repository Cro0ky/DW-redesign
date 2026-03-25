"use client";

import cn from "classnames";
import { Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { DroneWarsLogo } from "@/components";
import { AuthFormTransition, SUPPORT_MAIL, useAuthComponent } from "@/features";
import { useChangeLocale } from "@/hooks/useChageLocale";
import type { TLanguage } from "@/i18n/types";
import { Switcher } from "@/ui";

import styles from "./auth-component.module.scss";

export type TAuthStep = "login" | "registration" | "recover_password";

export const AuthComponent = () => {
  const t = useTranslations();
  const locale = useLocale() as TLanguage;

  const { handleChangeLocale } = useChangeLocale();
  const { LANGUAGES, step, renderForm } = useAuthComponent();

  const changingStep = step === "login";
  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.content, {
          [styles.content_changed]: changingStep,
        })}
      >
        <AuthFormTransition
          step={step}
          renderForm={(displayStep) => (
            <>
              <div className={styles.title}>
                {t(`auth.${displayStep}.title`)}
              </div>
              {renderForm(displayStep)}
            </>
          )}
        />
      </div>
      <div
        className={cn(styles.info, {
          [styles.info_changed]: changingStep,
        })}
      >
        <DroneWarsLogo fullWidth={false} />
        <div className={styles.support}>
          <span className={styles.title}>{t("auth.support")}:</span>
          <span
            className={styles.mail}
            onClick={() => navigator.clipboard.writeText(SUPPORT_MAIL)}
          >
            <Mail width={18} height={18} color={"#6B6B6B"} />
            {SUPPORT_MAIL}
          </span>
          <Switcher
            isFullWidth
            onClick={handleChangeLocale}
            items={LANGUAGES}
            selectedValue={locale}
          />
        </div>
      </div>
    </div>
  );
};
