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
import type { ReportAnalysis, ReportMeasurement } from "@/types/report-intelligence";
import {
  REPORT_LANGUAGE_LABELS,
  REPORT_TYPE_LABELS,
} from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

function fallback(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : "Not mentioned";
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatMeasurement(measurement: ReportMeasurement) {
  return `${measurement.value} ${measurement.unit} - ${measurement.context}`;
}

function LoadingState() {
  return (
    <BentoCard>
      <p className="text-sm font-medium text-muted-foreground">
        Loading report intelligence analysis...
      </p>
    </BentoCard>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <BentoCard className="border-risk-medium-soft bg-risk-medium-soft/70">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-risk-medium" />
        <div>
          <h2 className="font-semibold text-foreground">
            Unable to load report analysis
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </BentoCard>
  );
}

export function ReportResultView({ id }: { id: string }) {
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
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load report intelligence analysis."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadReport();
  }, [id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (errorMessage || !report) {
    return <ErrorState message={errorMessage ?? "Report analysis not found."} />;
  }

  const findings = report.structuredFindings;
  const measurements = findings.measurements ?? [];

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
              Educational only
            </Badge>
            <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
              {REPORT_LANGUAGE_LABELS[report.detectedLanguage]}
            </Badge>
            <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
              {REPORT_TYPE_LABELS[report.reportType]}
            </Badge>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Report analysis completed
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Created {formatDate(report.createdAt)} with{" "}
            {fallback(report.provider)}
            {report.providerModel ? ` / ${report.providerModel}` : ""}.
          </p>
        </div>

        <Link
          href="/new-analysis"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-12 rounded-xl border-border bg-white px-5"
          )}
        >
          New analysis
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <BentoCard>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
              <BookOpenText className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Simple Explanation
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {report.simpleExplanation}
          </p>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
              <Sparkles className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Educational Summary
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {report.educationalSummary}
          </p>
        </BentoCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <BentoCard>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-secondary-teal-soft text-secondary-teal-dark">
              <ListChecks className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              Structured Findings
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["BI-RADS", fallback(findings.birads)],
              ["Breast side", fallback(findings.breastSide)],
              ["Location", fallback(findings.location)],
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
              Measurements
            </p>
            {measurements.length > 0 ? (
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {measurements.map((measurement) => (
                  <li key={`${measurement.value}-${measurement.unit}-${measurement.context}`}>
                    {formatMeasurement(measurement)}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                No measurements mentioned.
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                Mentioned findings
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(findings.mentionedFindings ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                Recommendations mentioned in the report
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(findings.mentionedRecommendations ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </BentoCard>

        <div className="space-y-5">
          <SafetyNotice />

          <BentoCard>
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-accent-blue" />
              <h2 className="text-xl font-semibold text-foreground">
                WDBC Compatibility
              </h2>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">
                Can run WDBC prediction?{" "}
                {report.wdbcCompatibility.canRunPrediction ? "Yes" : "No"}
              </p>
              <p className="mt-2">{report.wdbcCompatibility.reason}</p>
              <p className="mt-3">
                Detected {report.wdbcCompatibility.detectedFeaturesCount} of{" "}
                {report.wdbcCompatibility.requiredFeaturesCount} required
                features. Missing{" "}
                {report.wdbcCompatibility.missingFeaturesCount}.
              </p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-3">
              <Brain className="size-5 text-primary-rose" />
              <h2 className="text-xl font-semibold text-foreground">
                Provider
              </h2>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Provider
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {fallback(report.provider)}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Model
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {fallback(report.providerModel)}
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <BentoCard>
          <div className="flex items-center gap-3">
            <Sparkles className="size-5 text-primary-rose" />
            <h2 className="text-xl font-semibold text-foreground">
              Important Terms
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            {report.importantTerms.map((item) => (
              <div key={item.term}>
                <p className="font-semibold text-foreground">{item.term}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard>
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-secondary-teal-dark" />
            <h2 className="text-xl font-semibold text-foreground">
              Safety Notes
            </h2>
          </div>

          <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
            {report.safetyNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </div>
  );
}
