"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { translations, type UiLocale } from "@/i18n/translations";

type I18nContextValue = {
  locale: UiLocale;
  setLocale: (locale: UiLocale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "breastcare-ui-locale";
const defaultLocale: UiLocale = "pt-BR";

function isSupportedLocale(value: string | null): value is UiLocale {
  return value === "pt-BR" || value === "en" || value === "es";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<UiLocale>(() => {
    if (typeof window === "undefined") {
      return defaultLocale;
    }

    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    return isSupportedLocale(storedLocale) ? storedLocale : defaultLocale;
  });

  function setLocale(nextLocale: UiLocale) {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
  }

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key: string) =>
        translations[locale][key] ?? translations[defaultLocale][key] ?? key,
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useTranslations must be used inside I18nProvider.");
  }

  return context;
}
