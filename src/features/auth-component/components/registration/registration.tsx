"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import type { TAuthStep } from "@/features";
import { useRegistrationSchema } from "@/schemes";
import { useAuthStore } from "@/store";
import { Button, Input } from "@/ui";

import styles from "./registration.module.scss";

interface IRegistrationProps {
  onStepChange: (step: TAuthStep) => void;
}

export const Registration = ({ onStepChange }: IRegistrationProps) => {
  const { registrationSchema } = useRegistrationSchema();
  type RegistrationSchema = z.infer<typeof registrationSchema>;
  const t = useTranslations();

  const [token, setToken] = useState("");
  const {
    register: registerUser,
    error,
    clearError,
    isLoading,
  } = useAuthStore();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationSchema>({
    shouldFocusError: false,
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: RegistrationSchema) => {
    await registerUser(
      {
        email: data.email,
        password: data.password,
        username: data.username,
      },
      token,
    );
    onStepChange("login");
  };

  const isDisabled =
    typeof window === "undefined"
      ? true
      : ["http://localhost:3000", "https://dev.lobby.dronewars.su"].includes(
            window.location.origin,
          )
        ? false
        : !token;

  return (
    <form
      className={styles.form}
      onFocus={() => clearError()}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("auth.email")}
            type={"email"}
            placeholder={t("auth.write_email")}
            value={field.value}
            error={
              errors.email?.message && t(errors.email?.message, { length: 254 })
            }
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("auth.username")}
            placeholder={t("auth.write_username")}
            value={field.value}
            error={
              errors.username?.message &&
              t(errors.username?.message, { length: 16 })
            }
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("auth.create_password")}
            type={"password"}
            placeholder={t("auth.write_password")}
            value={field.value}
            error={
              errors.password?.message &&
              t(errors.password?.message, { length: 64 })
            }
          />
        )}
      />

      <Controller
        name="confirm_password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("auth.repeat_password")}
            type={"password"}
            placeholder={t("auth.repeat_password")}
            value={field.value}
            error={
              errors.confirm_password?.message &&
              t(errors.confirm_password?.message, { length: 64 })
            }
          />
        )}
      />

      <div className={styles.buttons}>
        <div className={styles.capcha}>
          <SmartCaptcha
            theme="dark"
            sitekey={process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_KEY}
            onSuccess={setToken}
          />
        </div>
        <Button
          children={t("auth.registration.button_text")}
          disabled={!isValid || isDisabled || isLoading}
          fullWidth
          type={"submit"}
        />
        <Button
          color="gray"
          fullWidth
          type="button"
          onClick={() => onStepChange("login")}
          children={t("auth.login.button_text")}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </form>
  );
};
