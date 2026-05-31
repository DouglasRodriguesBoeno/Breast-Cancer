"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, FileText, Plus } from "lucide-react";

import { getReportAnalyses } from "@/services/report-intelligence-service";
import type {
  ReportAnalysis,
  ReportLanguage,
  ReportType,
  StructuredFindings,
  WdbcCompatibility,
} from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { useTranslations } from "@/i18n/use-translations";
import { cn } from "@/lib/utils";

const HISTORY_ERROR_MESSAGE =
  "Não foi possível carregar o histórico. Verifique a conexão com a API ou tente novamente.";

function safeFormatDate(value: string | null | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return date.toLocaleString("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
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

function getStructuredFindings(
  report: Partial<ReportAnalysis> | null | undefined
): Partial<StructuredFindings> {
  return report?.structuredFindings ?? {};
}

function getWdbcCompatibility(
  report: Partial<ReportAnalysis> | null | undefined
): Partial<WdbcCompatibility> {
  return report?.wdbcCompatibility ?? {};
}

function getWdbcLabel(
  report: Partial<ReportAnalysis> | null | undefined,
  fallback: string
) {
  const compatibility = getWdbcCompatibility(report);

  if (typeof compatibility.canRunPrediction !== "boolean") {
    return fallback;
  }

  return compatibility.canRunPrediction ? "compatível" : "não compatível";
}

function getReportId(report: Partial<ReportAnalysis>, index: number) {
  return report.id ?? `history-item-${index}`;
}

function HistorySkeleton() {
  const { t } = useTranslations();

  return (
    <div className="mt-5 space-y-4">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="rounded-[2rem] border border-border bg-white p-6 shadow-sm"
        >
          <div className="h-4 w-36 rounded-full bg-muted" />
          <div className="mt-5 h-6 w-1/2 rounded-xl bg-muted" />
          <div className="animate-progress mt-5 h-20 rounded-2xl bg-gradient-to-r from-muted via-white to-muted" />
        </div>
      ))}
      <p className="text-sm font-medium text-muted-foreground">
        {t("common.loading")}
      </p>
    </div>
  );
}

export function ReportHistoryView() {
  const { t } = useTranslations();
  const [reports, setReports] = useState<ReportAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadReports() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getReportAnalyses();
        setReports(response);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : HISTORY_ERROR_MESSAGE
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadReports();
  }, [t]);

  return (
    <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
      <div className="animate-slide-up flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
            {t("nav.history")}
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t("history.title")}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("history.subtitle")}
          </p>
        </div>

        <Link
          href="/new-analysis/report"
          className={cn(
            buttonVariants(),
            "h-12 rounded-xl bg-primary-rose px-5 text-white hover:bg-primary-rose-dark"
          )}
        >
          <Plus className="mr-2 size-4" />
          {t("nav.new")}
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <SafetyNotice />

        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
              <Clock3 className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Timeline
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                /api/report-intelligence
              </p>
            </div>
          </div>
        </BentoCard>
      </div>

      {isLoading ? <HistorySkeleton /> : null}

      {errorMessage ? (
        <div className="mt-5">
          <BentoCard className="border-risk-medium-soft bg-risk-medium-soft/70">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-risk-medium" />
              <div>
                <h2 className="font-semibold text-foreground">
                  {t("common.error")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {errorMessage || HISTORY_ERROR_MESSAGE}
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      ) : null}

      {!isLoading && !errorMessage && reports.length === 0 ? (
        <div className="mt-5">
          <BentoCard className="rounded-[2rem] p-8 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
              <FileText className="size-6" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-foreground">
              {t("history.empty")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              {t("history.subtitle")}
            </p>
            <Link
              href="/new-analysis/report"
              className={cn(
                buttonVariants(),
                "mt-6 h-12 rounded-xl bg-primary-rose px-6 text-white hover:bg-primary-rose-dark"
              )}
            >
              {t("history.emptyCta")}
            </Link>
          </BentoCard>
        </div>
      ) : null}

      {!isLoading && !errorMessage && reports.length > 0 ? (
        <div className="mt-8 space-y-4">
          {reports.map((report, index) => {
            const findings = getStructuredFindings(report);
            const reportId = getReportId(report, index);

            return (
            <article
              key={reportId}
              style={{ animationDelay: `${index * 70}ms` }}
              className="card-hover-lift animate-slide-up relative rounded-[2rem] border border-border bg-white p-5 shadow-sm md:p-6"
            >
              <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-border md:block" />

              <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-start">
                <div className="relative z-10 flex size-11 items-center justify-center rounded-full bg-primary-rose text-sm font-semibold text-white">
                  {index + 1}
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                      {getReportTypeLabel(
                        report.reportType,
                        t("common.typeUnavailable"),
                        t
                      )}
                    </Badge>
                    <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                      {getLanguageLabel(
                        report.targetLanguage,
                        t("common.languageUnavailable"),
                        t
                      )}
                    </Badge>
                    <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                      WDBC: {getWdbcLabel(report, t("common.wdbcNotEvaluated"))}
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    {t("result.title")}
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t("result.date")}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {safeFormatDate(
                          report.createdAt,
                          t("common.dateUnavailable")
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        BI-RADS
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {findings.birads ?? t("common.notMentioned")}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        {t("result.provider")}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {report.provider ?? t("common.notInformed")}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {report.educationalSummary ??
                      t("common.summaryUnavailable")}
                  </p>
                </div>

                <Link
                  href={`/reports/${reportId}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 rounded-xl border-border bg-white px-5"
                  )}
                >
                  {t("common.viewDetails")}
                </Link>
              </div>
            </article>
          );
          })}
        </div>
      ) : null}
    </section>
  );
}
