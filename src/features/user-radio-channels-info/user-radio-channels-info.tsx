"use client";

import { useUserStore } from "@/store";
import styles from "./user-radio-channels-info.module.scss";
import { Button, EModalName, Input, Tooltip } from "@/ui";
import { toast } from "react-toastify";
import { Clock, Frown } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useUserRadioChannelsSchema } from "@/schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formatBirthDateMask,
  formatPhoneMask,
} from "@/utils/radioChannelsForm";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modal/modal.store";
import { IRCApplicationRequest } from "@/types/user.types";

const SUPPORT_EMAIL = "support@mail.dronewars.su";

export const UserRadioChannelsInfo = () => {
  const { RCStatus } = useUserStore();
  const { openModal } = useModalStore();
  const t = useTranslations();

  const { userRadioChannelsSchema } = useUserRadioChannelsSchema();
  type RadioChannelsSchema = z.infer<typeof userRadioChannelsSchema>;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RadioChannelsSchema>({
    defaultValues: {
      middle_name: "",
      birth_date: "",
      last_name: "",
      phone_number: "",
      first_name: "",
      email: "",
    },
    shouldFocusError: false,
    resolver: zodResolver(userRadioChannelsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (RCStatus === "APPROVED") {
      window.location.href =
        process.env.NEXT_PUBLIC_RADIO_CHANNELS_SIMULATION_URL;
    }
  }, [RCStatus]);

  if (RCStatus === "PENDING")
    return (
      <div className={styles.wrapper}>
        <Clock size={60} color={"#E1E0E0FF"} />
        <span className={styles.title}>
          {t("game.radiochannel_request_pending")}
        </span>
      </div>
    );

  if (RCStatus === "REJECTED")
    return (
      <div className={styles.wrapper}>
        <Frown size={60} color={"#E1E0E0FF"} />
        <span className={styles.title}>
          {t("game.radiochannel_request_rejected")}
        </span>
        <span className={styles.subtitle}>
          {t("game.radiochannel_request_rejected_hint")}
        </span>
        <Tooltip
          content={t("game.radiochannel_copy_email_tooltip")}
          side={"bottom"}
        >
          <span
            className={styles.email}
            onClick={() => {
              navigator.clipboard.writeText(SUPPORT_EMAIL);
              toast.success(t("game.radiochannel_email_copied_toast"));
            }}
          >
            {SUPPORT_EMAIL}
          </span>
        </Tooltip>
      </div>
    );

  const onSubmit = async (data: RadioChannelsSchema) => {
    openModal({
      name: EModalName.CONFIRM_RC_APPLICATION_MODAL,
      props: data as IRCApplicationRequest,
    });
  };

  if (!RCStatus)
    return (
      <div className={styles.wrapper}>
        <span className={styles.title}>
          {t("game.radiochannel_request_title")}
        </span>
        <span className={styles.subtitle}>
          {t("game.radiochannel_request_description")}
        </span>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("form.last_name")}
                  placeholder={t("form.last_name")}
                  value={field.value}
                />
              )}
            />

            <Controller
              name="birth_date"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("form.birth_date")}
                  placeholder={t("form.birth_date_placeholder")}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(formatBirthDateMask(e.target.value))
                  }
                />
              )}
            />

            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("form.first_name")}
                  placeholder={t("form.first_name")}
                  value={field.value}
                />
              )}
            />
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("form.phone_number")}
                  placeholder={t("form.phone_number")}
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(formatPhoneMask(e.target.value))
                  }
                />
              )}
            />
            <Controller
              name="middle_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("form.middle_name")}
                  placeholder={t("form.middle_name")}
                  value={field.value}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("form.email")}
                  placeholder={t("form.email")}
                  value={field.value}
                />
              )}
            />
          </div>

          <Button disabled={!isValid} className={styles.button}>
            {t("all.send")}
          </Button>
        </form>
      </div>
    );
};
