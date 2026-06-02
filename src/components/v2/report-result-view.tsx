"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BookOpenText,
  Brain,
  FileText,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { getReportAnalysisById } from "@/services/report-intelligence-service";
import type {
  ReportAnalysis,
  ReportLanguage,
  ReportMeasurement,
  ReportType,
  StructuredFindings,
  WdbcCompatibility,
} from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { EducationalGuideSection } from "@/components/v2/educational-guide-section";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { useTranslations } from "@/i18n/use-translations";
import { sanitizeSafetyCopy } from "@/lib/safety-copy";
import { cn } from "@/lib/utils";

function valueOrFallback(value: string | null | undefined, fallback: string) {
  return value && value.trim().length > 0 ? value : fallback;
}

function formatDate(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatMeasurement(measurement: Partial<ReportMeasurement>) {
  const value = measurement.value ?? "";
  const unit = measurement.unit ?? "";
  const context = measurement.context ?? "";

  return [String(value), unit, context].filter(Boolean).join(" - ");
}

function getStructuredFindings(
  report: Partial<ReportAnalysis>
): Partial<StructuredFindings> {
  return report.structuredFindings ?? {};
}

function getWdbcCompatibility(
  report: Partial<ReportAnalysis>
): Partial<WdbcCompatibility> {
  return report.wdbcCompatibility ?? {};
}

function getReportTypeLabel(
  reportType: ReportType | null | undefined,
  fallback: string,
  t: (key: string) => string
) {
  return reportType ? t(`report.type.${reportType}`) : fallback;
}

function getLanguageLabel(
  language: ReportLanguage | null | undefined,
  fallback: string,
  t: (key: string) => string
) {
  return language ? t(`report.language.${language}`) : fallback;
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

  const findings = getStructuredFindings(report);
  const measurements = Array.isArray(findings.measurements)
    ? findings.measurements
    : [];
  const wdbcCompatibility = getWdbcCompatibility(report);
  const detected = wdbcCompatibility.detectedFeaturesCount ?? 0;
  const required = Math.max(wdbcCompatibility.requiredFeaturesCount ?? 0, 1);
  const compatibilityPercent = Math.round((detected / required) * 100);
  const canRunPrediction = wdbcCompatibility.canRunPrediction;
  const wdbcLabel =
    typeof canRunPrediction === "boolean"
      ? canRunPrediction
        ? t("result.wdbcYes")
        : t("result.wdbcNo")
      : t("common.wdbcNotEvaluated");
  const summary = sanitizeSafetyCopy(
    report.educationalSummary ?? t("common.summaryUnavailable")
  );
  const simpleExplanation = sanitizeSafetyCopy(
    report.simpleExplanation ?? t("common.summaryUnavailable")
  );
  const importantTerms = Array.isArray(report.importantTerms)
    ? report.importantTerms
    : [];
  const safetyNotes = Array.isArray(report.safetyNotes)
    ? report.safetyNotes.map((note) => sanitizeSafetyCopy(note))
    : [t("result.safety")];
  const mentionedFindings = Array.isArray(findings.mentionedFindings)
    ? findings.mentionedFindings
    : [];
  const mentionedRecommendations = Array.isArray(
    findings.mentionedRecommendations
  )
    ? findings.mentionedRecommendations
    : [];
  const missingFieldFallback = t("result.emptyField");
  const suggestedQuestions = [
    "result.sparse.q1",
    "result.sparse.q2",
    "result.sparse.q3",
    "result.sparse.q4",
    "result.sparse.q5",
  ];

  return (
    <div className="animate-fade-in">
      <section className="rounded-[2rem] border border-border bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                {t("result.done")}
              </Badge>
              <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                {t("common.educational")}
              </Badge>
              <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                {getLanguageLabel(
                  report.detectedLanguage,
                  t("common.languageUnavailable"),
                  t
                )}
              </Badge>
              <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                {getReportTypeLabel(
                  report.reportType,
                  t("common.typeUnavailable"),
                  t
                )}
              </Badge>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {t("result.title")}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              {t("result.heroIntro")}
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
      </section>

      <div className="mt-8">
        <BentoCard className="rounded-[2rem] border-accent-blue-soft p-7 shadow-[0_18px_50px_rgba(37,99,235,0.08)] md:p-9">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
              <BookOpenText className="size-5" />
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {t("result.simple")}
            </h2>
          </div>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {simpleExplanation}
          </p>
        </BentoCard>
      </div>

      <div className="mt-5">
        <BentoCard className="rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-secondary-teal-soft text-secondary-teal-dark">
              <Sparkles className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              {t("result.summary")}
            </h2>
          </div>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {summary}
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
              {t("result.identified")}
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              [t("result.birads"), valueOrFallback(findings.birads, missingFieldFallback)],
              [t("result.breastSide"), valueOrFallback(findings.breastSide, missingFieldFallback)],
              [t("result.location"), valueOrFallback(findings.location, missingFieldFallback)],
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
                {missingFieldFallback}
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                {t("result.mentioned")}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {mentionedFindings.length > 0 ? (
                  mentionedFindings.map((item) => (
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
                  <li>{missingFieldFallback}</li>
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                {t("result.recommendations")}
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {mentionedRecommendations.length > 0 ? (
                  mentionedRecommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))
                ) : (
                  <li>{missingFieldFallback}</li>
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
              {importantTerms.length > 0 ? (
                importantTerms.map((item, index) => (
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
                      {sanitizeSafetyCopy(item.explanation)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-2xl border border-border bg-background p-4 text-sm text-muted-foreground">
                  {missingFieldFallback}
                </p>
              )}
            </div>
          </BentoCard>

          <BentoCard className="rounded-[2rem] border-border bg-background/70">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <FileText className="size-5" />
              </div>
              <div>
              <h2 className="text-lg font-semibold text-foreground">
                {t("result.wdbc")}
              </h2>
              <p className="mt-1 text-xs font-medium text-muted-foreground">
                {t("result.wdbcAdvanced")}
              </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">
                {wdbcLabel}
              </p>
              <p className="mt-2">
                {canRunPrediction
                  ? sanitizeSafetyCopy(wdbcCompatibility.reason) || t("common.notInformed")
                  : t("result.wdbcMissing")}
              </p>
              <p className="mt-3">
                {detected} / {wdbcCompatibility.requiredFeaturesCount ?? 0}
              </p>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-secondary-teal-dark transition-all"
                  style={{ width: `${compatibilityPercent}%` }}
                />
              </div>
              {canRunPrediction ? (
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

      <div className="mt-5">
        <BentoCard className="rounded-[2rem] border-accent-blue-soft bg-accent-blue-soft/25">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white text-accent-blue">
              <ListChecks className="size-5" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              {t("result.sparseTitle")}
            </h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {suggestedQuestions.map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-border bg-white p-4 text-sm font-medium leading-6 text-foreground"
              >
                {t(question)}
              </div>
            ))}
          </div>
        </BentoCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <Brain className="size-5 text-primary-rose" />
            <h2 className="text-xl font-semibold text-foreground">
              {t("result.metadata")}
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
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {t("result.date")}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {formatDate(report.createdAt) || t("common.dateUnavailable")}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {t("result.reportType")}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {getReportTypeLabel(
                  report.reportType,
                  t("common.typeUnavailable"),
                  t
                )}
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
            {safetyNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </BentoCard>
      </div>

      <div className="mt-5">
        <SafetyNotice />
      </div>
    </div>
  );
}
