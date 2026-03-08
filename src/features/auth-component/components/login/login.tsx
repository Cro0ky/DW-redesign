import styles from "./login.module.scss";
import { useLoginSchema } from "@/schemes";
import { z } from "zod";
import { Button, Input } from "@/ui";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

export const Login = () => {
  const { loginSchema } = useLoginSchema();
  type LoginSchema = z.infer<typeof loginSchema>;
  const t = useTranslations();

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

  return (
    <div className={styles.form}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={t("auth.username")}
            placeholder={t("auth.write_username")}
            value={field.value ?? ""}
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
            label={t("auth.password")}
            type={"password"}
            placeholder={t("auth.write_password")}
            value={field.value ?? ""}
            error={errors.password?.message}
          />
        )}
      />
      <div className={styles.buttons}>
        <Button children={t("auth.registration.button_text")} fullWidth />
        <Button
          children={t("auth.login.button_text")}
          color={"gray"}
          fullWidth
        />
      </div>
    </div>
  );
};
