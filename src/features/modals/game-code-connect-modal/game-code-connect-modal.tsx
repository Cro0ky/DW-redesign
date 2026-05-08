"use client";

import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import { useModalStore } from "@/store/modal/modal.store";
import { EModalName, Modal } from "@/ui";

import styles from "./game-code-connect-modal.module.scss";
import { useMutation } from "@tanstack/react-query";
import { sessionService } from "@/lib/api/services/session/session.service";
import { getSimulationUrl } from "@/utils/getSimulationUrl";
import { useUserStore } from "@/store";

const CODE_LENGTH = 6;

export const GameCodeConnectModal = () => {
  const t = useTranslations("modals.game_code_connect");
  const { closeModal, activeModal } = useModalStore();
  const { id } = useUserStore();

  const [digits, setDigits] = useState<string[]>(() =>
    Array.from({ length: CODE_LENGTH }, () => ""),
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isOpen = activeModal?.name === EModalName.GAME_CODE_CONNECT_MODAL;

  const handleClose = useCallback(() => {
    closeModal(EModalName.GAME_CODE_CONNECT_MODAL);
    setDigits(Array.from({ length: CODE_LENGTH }, () => ""));
  }, [closeModal]);

  useEffect(() => {
    if (!isOpen) {
      setDigits(Array.from({ length: CODE_LENGTH }, () => ""));
      return;
    }
    const id = window.setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 50);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  const setDigitAt = (index: number, char: string) => {
    const d = char.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = d;
      return next;
    });
    return d;
  };

  const handleChange = (index: number, value: string) => {
    const d = setDigitAt(index, value);
    if (d && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
        setDigits((prev) => {
          const next = [...prev];
          next[index - 1] = "";
          return next;
        });
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!text) return;
    const chars = text.split("");
    setDigits((prev) => {
      const next = [...prev];
      for (let i = 0; i < CODE_LENGTH; i++) {
        next[i] = chars[i] ?? "";
      }
      return next;
    });
    const focusAt = Math.min(chars.length, CODE_LENGTH) - 1;
    window.setTimeout(() => {
      inputRefs.current[Math.max(0, focusAt)]?.focus();
    }, 0);
  };

  const code = digits.join("");
  const isComplete = code.length === CODE_LENGTH;

  const sessionConnect = useMutation({
    mutationFn: sessionService.connectToSession,
  });

  const handleConnect = async () => {
    if (!isComplete) return;
    try {
      const res = await sessionConnect.mutateAsync({ passcode: Number(code) });

      window.location.href = `${getSimulationUrl(res?.game_type)}/init/${res.url}/${id}`;
    } catch {}
    return;
  };

  return (
    <Modal
      name={EModalName.GAME_CODE_CONNECT_MODAL}
      size={"l"}
      title={t("title")}
      subtitle={t("subtitle")}
      onClose={handleClose}
      fullSize={false}
      buttons={[
        {
          color: "red",
          fullWidth: true,
          disabled: !isComplete,
          onClick: handleConnect,
          children: t("connect"),
        },
      ]}
      children={
        <div
          className={styles.inputs}
          onPaste={handlePaste}
          role={"group"}
          aria-label={t("title")}
        >
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={styles.digit}
              type={"text"}
              inputMode={"numeric"}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              placeholder={"·"}
              aria-label={`${index + 1} / ${CODE_LENGTH}`}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
      }
    />
  );
};
