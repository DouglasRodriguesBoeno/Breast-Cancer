"use client";

import { Brain, Info, Route, ShieldCheck } from "lucide-react";

import { ScenarioSelector } from "@/components/analysis/scenario-selector";
import { PageShell } from "@/components/layout/page-shell";
import { EducationalDisclaimer } from "@/components/shared/educational-disclaimer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/i18n/use-translations";

export default function NewAnalysisPage() {
  const { t } = useTranslations();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge className="rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
              {t("legacyAnalysis.new.badge")}
            </Badge>

            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {t("legacyAnalysis.new.title")}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              {t("legacyAnalysis.new.subtitle")}
            </p>

            <Alert className="mt-8 rounded-3xl border-primary-rose-soft bg-white/80 p-5">
              <Info className="size-5 text-primary-rose" />
              <AlertTitle>{t("legacyAnalysis.new.alertTitle")}</AlertTitle>
              <AlertDescription>
                {t("legacyAnalysis.new.alertDescription")}
              </AlertDescription>
            </Alert>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-sm backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
                  <Route className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("legacyAnalysis.new.flowLabel")}
                  </p>
                  <h2 className="text-xl font-semibold text-foreground">
                    {t("legacyAnalysis.new.flowTitle")}
                  </h2>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {t("legacyAnalysis.new.flowDescription")}
              </p>
            </div>

            <div className="rounded-3xl border border-secondary-teal-soft bg-secondary-teal-soft/35 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-secondary-teal-dark">
                  <ShieldCheck className="size-5" />
                </div>

                <h2 className="text-xl font-semibold text-foreground">
                  {t("legacyAnalysis.new.safetyTitle")}
                </h2>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {t("legacyAnalysis.new.safetyDescription")}
              </p>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/75 p-4 text-sm font-medium text-foreground">
                <Brain className="size-5 text-primary-rose" />
                {t("legacyAnalysis.new.path")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <ScenarioSelector />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <EducationalDisclaimer />
      </section>
    </PageShell>
  );
}
