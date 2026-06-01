"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  Clock3,
  FileText,
  Filter,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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
import { sanitizeSafetyCopy } from "@/lib/safety-copy";
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
  fallback: string,
  t: (key: string) => string
) {
  const compatibility = getWdbcCompatibility(report);

  if (typeof compatibility.canRunPrediction !== "boolean") {
    return fallback;
  }

  return compatibility.canRunPrediction
    ? t("history.filters.wdbcCompatible")
    : t("history.filters.wdbcNotCompatible");
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
  const [reportTypeFilter, setReportTypeFilter] = useState<ReportType | "all">(
    "all"
  );
  const [wdbcFilter, setWdbcFilter] = useState<
    "all" | "compatible" | "not-compatible"
  >("all");
  const [biradsFilter, setBiradsFilter] = useState<
    "all" | "mentioned" | "not-mentioned"
  >("all");

  const reportTypeOptions = useMemo(() => {
    const types = new Set<ReportType>();

    reports.forEach((report) => {
      if (report.reportType) {
        types.add(report.reportType);
      }
    });

    return Array.from(types);
  }, [reports]);

  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const findings = getStructuredFindings(report);
        const wdbcCompatibility = getWdbcCompatibility(report);
        const hasBirads = Boolean(findings.birads);

        if (
          reportTypeFilter !== "all" &&
          report.reportType !== reportTypeFilter
        ) {
          return false;
        }

        if (wdbcFilter !== "all") {
          const isCompatible = wdbcCompatibility.canRunPrediction === true;

          if (wdbcFilter === "compatible" && !isCompatible) {
            return false;
          }

          if (wdbcFilter === "not-compatible" && isCompatible) {
            return false;
          }
        }

        if (biradsFilter === "mentioned" && !hasBirads) {
          return false;
        }

        if (biradsFilter === "not-mentioned" && hasBirads) {
          return false;
        }

        return true;
      }),
    [biradsFilter, reportTypeFilter, reports, wdbcFilter]
  );

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
                {t("history.timelineTitle")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("history.timelineDescription")}
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
        <>
          <BentoCard className="mt-8 rounded-[2rem] p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <Filter className="size-4" />
              </div>
              <h2 className="font-semibold text-foreground">
                {t("history.filters.title")}
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-sm font-semibold text-foreground">
                {t("history.filters.reportType")}
                <select
                  value={reportTypeFilter}
                  onChange={(event) =>
                    setReportTypeFilter(event.target.value as ReportType | "all")
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
                >
                  <option value="all">{t("history.filters.all")}</option>
                  {reportTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {getReportTypeLabel(type, t("common.typeUnavailable"), t)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm font-semibold text-foreground">
                {t("history.filters.wdbc")}
                <select
                  value={wdbcFilter}
                  onChange={(event) =>
                    setWdbcFilter(
                      event.target.value as
                        | "all"
                        | "compatible"
                        | "not-compatible"
                    )
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
                >
                  <option value="all">{t("history.filters.all")}</option>
                  <option value="compatible">
                    {t("history.filters.wdbcCompatible")}
                  </option>
                  <option value="not-compatible">
                    {t("history.filters.wdbcNotCompatible")}
                  </option>
                </select>
              </label>

              <label className="text-sm font-semibold text-foreground">
                {t("history.filters.birads")}
                <select
                  value={biradsFilter}
                  onChange={(event) =>
                    setBiradsFilter(
                      event.target.value as
                        | "all"
                        | "mentioned"
                        | "not-mentioned"
                    )
                  }
                  className="mt-2 h-11 w-full rounded-xl border border-border bg-white px-3 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
                >
                  <option value="all">{t("history.filters.all")}</option>
                  <option value="mentioned">
                    {t("history.filters.biradsMentioned")}
                  </option>
                  <option value="not-mentioned">
                    {t("history.filters.biradsNotMentioned")}
                  </option>
                </select>
              </label>
            </div>
          </BentoCard>

          {filteredReports.length === 0 ? (
            <BentoCard className="mt-5 rounded-[2rem] p-7 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Filter className="size-5" />
              </div>
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {t("history.filters.noResults")}
              </p>
            </BentoCard>
          ) : null}

        <div className="mt-5 space-y-4">
          {filteredReports.map((report, index) => {
            const findings = getStructuredFindings(report);
            const reportId = getReportId(report, index);
            const wdbcCompatibility = getWdbcCompatibility(report);
            const summary = sanitizeSafetyCopy(
              report.educationalSummary ?? t("common.summaryUnavailable")
            );
            const providerModel = [
              report.provider,
              report.providerModel,
            ].filter(Boolean).join(" / ");

            return (
            <article
              key={reportId}
              style={{ animationDelay: `${index * 70}ms` }}
              className="card-hover-lift animate-slide-up rounded-[2rem] border border-border bg-white p-5 shadow-sm transition hover:border-primary-rose-soft hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] md:p-6"
            >
              <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-start">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose shadow-sm">
                  <FileText className="size-6" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                      {getReportTypeLabel(
                        report.reportType,
                        t("common.typeUnavailable"),
                        t
                      )}
                    </Badge>
                    <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                      BI-RADS: {findings.birads ?? t("common.notMentioned")}
                    </Badge>
                    <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                      WDBC:{" "}
                      {getWdbcLabel(report, t("common.wdbcNotEvaluated"), t)}
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    {t("result.title")}
                  </h2>

                  <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                    {summary}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <CalendarClock className="size-4 text-accent-blue" />
                        {t("result.date")}
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {safeFormatDate(report.createdAt, t("common.dateUnavailable"))}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <Sparkles className="size-4 text-primary-rose" />
                        {t("report.language")}
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {getLanguageLabel(
                          report.targetLanguage,
                          t("common.languageUnavailable"),
                          t
                        )}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <ShieldCheck className="size-4 text-secondary-teal-dark" />
                        {t("history.providerModel")}
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {providerModel || t("common.notInformed")}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        <Clock3 className="size-4 text-accent-blue" />
                        WDBC
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {typeof wdbcCompatibility.canRunPrediction === "boolean"
                          ? getWdbcLabel(report, t("common.wdbcNotEvaluated"), t)
                          : t("common.wdbcNotEvaluated")}
                      </p>
                    </div>
                  </div>
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
        </>
      ) : null}
    </section>
  );
}
