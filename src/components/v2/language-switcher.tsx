"use client";

import { Globe2 } from "lucide-react";

import { localeLabels, type UiLocale } from "@/i18n/translations";
import { useTranslations } from "@/i18n/use-translations";

const locales: UiLocale[] = ["pt-BR", "en", "es"];

export function V2LanguageSwitcher() {
  const { locale, setLocale } = useTranslations();

  return (
    <label className="flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-3 text-sm font-medium text-muted-foreground">
      <Globe2 className="size-4 text-accent-blue" />
      <select
        data-testid="language-switcher"
        value={locale}
        onChange={(event) => setLocale(event.target.value as UiLocale)}
        className="bg-transparent text-sm font-semibold text-foreground outline-none"
        aria-label="UI language"
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
