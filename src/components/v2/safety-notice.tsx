"use client";

import { ShieldCheck } from "lucide-react";
import { useTranslations } from "@/i18n/use-translations";

export function SafetyNotice() {
  const { t } = useTranslations();

  return (
    <aside className="rounded-2xl border border-primary-rose-soft bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground">
            {t("home.bannerTitle")}
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {t("home.bannerText")}
          </p>
        </div>
      </div>
    </aside>
  );
}
