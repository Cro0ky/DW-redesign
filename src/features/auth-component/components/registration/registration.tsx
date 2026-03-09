import { zodResolver } from "@hookform/resolvers/zod";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import type { TAuthStep } from "@/features/auth-component/auth-component";
import { useRegistrationSchema } from "@/schemes";
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
  const [error, setError] = useState("");

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
    try {
      console.log(data);
    } catch {
      setError("Ошибка авторизации, проверьте введенные данные!");
    }
  };

  const isDisabled = [
    "http://localhost:3000",
    "https://dev.lobby.dronewars.su",
  ].includes(window.location.origin)
    ? false
    : !token;

  return (
    <form
      className={styles.form}
      onFocus={() => setError("")}
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
            error={errors.email?.message}
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
            error={errors.username?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("Придумайте пароль")}
            type={"password"}
            placeholder={t("auth.write_password")}
            value={field.value}
            error={errors.password?.message}
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
            error={errors.confirm_password?.message}
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
          disabled={!isValid || isDisabled}
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
