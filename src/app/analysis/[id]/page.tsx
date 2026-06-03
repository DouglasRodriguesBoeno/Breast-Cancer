"use client";

import { useParams } from "next/navigation";

import { PredictionDetail } from "@/components/prediction/prediction-detail";
import { PageShell } from "@/components/layout/page-shell";
import { EducationalDisclaimer } from "@/components/shared/educational-disclaimer";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/i18n/use-translations";

export default function AnalysisDetailPage() {
  const params = useParams<{ id: string }>();
  const { t } = useTranslations();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <Badge className="rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
          {t("legacyAnalysis.detail.badge")}
        </Badge>

        <div className="mt-6 flex flex-col gap-3">
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {t("legacyAnalysis.detail.title")}
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("legacyAnalysis.detail.subtitle")}
          </p>
        </div>

        <div className="mt-10">
          <PredictionDetail id={params.id} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <EducationalDisclaimer />
      </section>
    </PageShell>
  );
}
