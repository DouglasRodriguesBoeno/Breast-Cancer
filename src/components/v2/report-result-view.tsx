"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BookOpenText,
  Brain,
  Clock3,
  Download,
  FileText,
  Languages,
  ListChecks,
  Save,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getReportAnalysisById } from "@/services/report-intelligence-service";
import type {
  ReportAnalysis,
  ReportLanguage,
  ReportMeasurement,
  ReportType,
} from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { useTranslations } from "@/i18n/use-translations";
import { cn } from "@/lib/utils";

const languageLabels: Record<ReportLanguage, string> = {
  "pt-BR": "Português",
  en: "English",
  es: "Español",
};

const reportTypeLabels: Record<ReportType, string> = {
  MAMMOGRAPHY: "Mamografia",
  ULTRASOUND: "Ultrassom",
  MRI: "Ressonância de mama",
  BIOPSY: "Biópsia",
  UNKNOWN: "Tipo não informado",
};

function valueOrFallback(value: string | null | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatMeasurement(measurement: ReportMeasurement) {
  return `${measurement.value} ${measurement.unit} - ${measurement.context}`;
}

function LoadingState() {
  const { t } = useTranslations();

  return (
    <div className="space-y-5">
      <BentoCard className="animate-pulse rounded-[2rem]">
        <div className="h-4 w-40 rounded-full bg-muted" />
        <div className="mt-6 h-10 w-3/4 rounded-xl bg-muted" />
        <div className="mt-4 h-4 w-1/2 rounded-full bg-muted" />
      </BentoCard>
      <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
        <div className="h-5 w-56 rounded-full bg-muted" />
        <div className="animate-progress mt-5 h-24 rounded-2xl bg-gradient-to-r from-muted via-white to-muted" />
        <p className="mt-4 text-sm font-medium text-muted-foreground">
          {t("common.loading")}
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <BentoCard className="border-risk-medium-soft bg-risk-medium-soft/70">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-risk-medium" />
        <div>
          <h2 className="font-semibold text-foreground">Erro</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

export function ReportResultView({ id }: { id: string }) {
  const { t } = useTranslations();
  const [report, setReport] = useState<ReportAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadReport() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getReportAnalysisById(id);
        setReport(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : t("common.error"));
      } finally {
        setIsLoading(false);
      }
    }

    loadReport();
  }, [id, t]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (errorMessage || !report) {
    return <ErrorState message={errorMessage ?? t("common.error")} />;
  }

  const findings = report.structuredFindings;
  const measurements = findings.measurements ?? [];
  const detected = report.wdbcCompatibility.detectedFeaturesCount;
  const required = Math.max(report.wdbcCompatibility.requiredFeaturesCount, 1);
  const compatibilityPercent = Math.round((detected / required) * 100);

  return (
    <div className="animate-fade-in">
      <section className="rounded-[2rem] border border-border bg-white p-6 shadow-sm md:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                {t("result.done")}
              </Badge>
              <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                {t("common.educational")}
              </Badge>
              <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                {languageLabels[report.detectedLanguage]}
              </Badge>
              <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                {reportTypeLabels[report.reportType]}
              </Badge>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {t("result.title")}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {report.educationalSummary}
            </p>
          </div>

          <Link
            href="/new-analysis"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-xl border-border bg-white px-5"
            )}
          >
            {t("nav.new")}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            [t("result.birads"), valueOrFallback(findings.birads, t("common.notMentioned"))],
            [t("result.reportType"), reportTypeLabels[report.reportType]],
            [t("result.date"), formatDate(report.createdAt)],
            [
              t("result.provider"),
              `${valueOrFallback(report.provider, t("common.notInformed"))}${
                report.providerModel ? ` / ${report.providerModel}` : ""
              }`,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-background p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <BentoCard className="rounded-[2rem] p-7 md:p-9">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
              <BookOpenText className="size-5" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {t("result.simple")}
            </h2>
          </div>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {report.simpleExplanation}
          </p>
        </BentoCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-secondary-teal-soft text-secondary-teal-dark">
              <ListChecks className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              {t("result.mentioned")}
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              [t("result.birads"), valueOrFallback(findings.birads, t("common.notMentioned"))],
              [t("result.breastSide"), valueOrFallback(findings.breastSide, t("common.notMentioned"))],
              [t("result.location"), valueOrFallback(findings.location, t("common.notMentioned"))],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-background p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {t("result.measurements")}
            </p>
            {measurements.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {measurements.map((measurement) => (
                  <li
                    key={`${measurement.value}-${measurement.unit}-${measurement.context}`}
                  >
                    {formatMeasurement(measurement)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                {t("common.notMentioned")}
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                {t("result.mentioned")}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(findings.mentionedFindings ?? []).length > 0 ? (
                  findings.mentionedFindings.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between gap-3"
                    >
                      <span>{item}</span>
                      <Badge className="rounded-full bg-secondary-teal-soft px-2 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                        {t("result.mentionedBadge")}
                      </Badge>
                    </li>
                  ))
                ) : (
                  <li>{t("common.notMentioned")}</li>
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                {t("result.recommendations")}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(findings.mentionedRecommendations ?? []).length > 0 ? (
                  findings.mentionedRecommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))
                ) : (
                  <li>{t("common.notMentioned")}</li>
                )}
              </ul>
            </div>
          </div>
        </BentoCard>

        <div className="space-y-5">
          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary-rose" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("result.terms")}
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {report.importantTerms.map((item, index) => (
                <div
                  key={item.term}
                  className="card-hover-lift rounded-2xl border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-primary-rose-soft text-sm font-semibold text-primary-rose">
                      {index + 1}
                    </div>
                    <p className="font-semibold text-foreground">{item.term}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-accent-blue" />
              <h2 className="text-xl font-semibold text-foreground">
                {t("result.wdbc")}
              </h2>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">
                {report.wdbcCompatibility.canRunPrediction
                  ? t("result.wdbcYes")
                  : t("result.wdbcNo")}
              </p>
              <p className="mt-2">
                {report.wdbcCompatibility.canRunPrediction
                  ? report.wdbcCompatibility.reason
                  : t("result.wdbcMissing")}
              </p>
              <p className="mt-3">
                {detected} / {report.wdbcCompatibility.requiredFeaturesCount}
              </p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-secondary-teal-dark transition-all"
                  style={{ width: `${compatibilityPercent}%` }}
                />
              </div>
              {report.wdbcCompatibility.canRunPrediction ? (
                <Link
                  href="/new-analysis/advanced"
                  className={cn(
                    buttonVariants(),
                    "mt-4 h-10 rounded-xl bg-primary-rose text-white hover:bg-primary-rose-dark"
                  )}
                >
                  WDBC
                </Link>
              ) : null}
            </div>
          </BentoCard>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <Brain className="size-5 text-primary-rose" />
            <h2 className="text-xl font-semibold text-foreground">
              {t("result.provider")}
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {t("result.provider")}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {valueOrFallback(report.provider, t("common.notInformed"))}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {t("result.model")}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {valueOrFallback(report.providerModel, t("common.notInformed"))}
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-secondary-teal-dark" />
            <h2 className="text-xl font-semibold text-foreground">
              {t("result.safety")}
            </h2>
          </div>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
            {report.safetyNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </BentoCard>
      </div>

      <div className="mt-5">
        <SafetyNotice />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {[
          [t("result.actions.save"), Save],
          [t("result.actions.export"), Download],
          [t("result.actions.translate"), Languages],
          [t("result.actions.history"), Clock3],
        ].map(([label, Icon]) => (
          <button
            key={label as string}
            type="button"
            className="card-hover-lift flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-semibold text-foreground"
          >
            <Icon className="size-4 text-accent-blue" />
            {label as string}
          </button>
        ))}
      </div>
    </div>
  );
}
