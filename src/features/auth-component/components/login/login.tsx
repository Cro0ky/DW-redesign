import { zodResolver } from "@hookform/resolvers/zod";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import type { TAuthStep } from "@/features/auth-component/auth-component";
import { useLoginSchema } from "@/schemes";
import { Button, Input } from "@/ui";

import styles from "./login.module.scss";

interface ILoginProps {
  onStepChange: (step: TAuthStep) => void;
}

export const Login = ({ onStepChange }: ILoginProps) => {
  const { loginSchema } = useLoginSchema();
  type LoginSchema = z.infer<typeof loginSchema>;
  const t = useTranslations();

  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    shouldFocusError: false,
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
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
            placeholder={t("auth.write_email")}
            value={field.value}
            error={errors.email?.message && t(errors.email?.message)}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("auth.password")}
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
      <div className={styles.buttons}>
        <div className={styles.capcha}>
          <SmartCaptcha
            theme="dark"
            sitekey={process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_KEY}
            onSuccess={setToken}
          />
        </div>
        <Button
          children={t("auth.login.button_text")}
          disabled={!isValid || isDisabled}
          fullWidth
          type={"submit"}
        />
        <Button
          children={t("auth.registration.button_text")}
          onClick={() => onStepChange("registration")}
          color={"gray"}
          type={"button"}
          fullWidth
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </form>
  );
};
