"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, FileText, Plus } from "lucide-react";

import { getReportAnalyses } from "@/services/report-intelligence-service";
import type { ReportAnalysis } from "@/types/report-intelligence";
import {
  REPORT_LANGUAGE_LABELS,
  REPORT_TYPE_LABELS,
} from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function ReportHistoryView() {
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
          error instanceof Error
            ? error.message
            : "Unable to load report intelligence history."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
            Report Intelligence history
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Report History
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Review educational report analyses created through the V2 Report
            Intelligence flow.
          </p>
        </div>

        <Link
          href="/new-analysis"
          className={cn(
            buttonVariants(),
            "h-12 rounded-xl bg-primary-rose px-5 text-white hover:bg-primary-rose-dark"
          )}
        >
          <Plus className="mr-2 size-4" />
          New analysis
        </Link>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <SafetyNotice />

        <BentoCard>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
              <Clock3 className="size-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                History records
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing records from GET /api/report-intelligence.
              </p>
            </div>
          </div>
        </BentoCard>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <BentoCard>
            <p className="text-sm font-medium text-muted-foreground">
              Loading report intelligence history...
            </p>
          </BentoCard>
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-5">
          <BentoCard className="border-risk-medium-soft bg-risk-medium-soft/70">
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 size-5 shrink-0 text-risk-medium" />
              <div>
                <h2 className="font-semibold text-foreground">
                  Unable to load history
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {errorMessage}
                </p>
              </div>
            </div>
          </BentoCard>
        </div>
      ) : null}

      {!isLoading && !errorMessage && reports.length === 0 ? (
        <div className="mt-5">
          <BentoCard>
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-primary-rose" />
              <h2 className="text-xl font-semibold text-foreground">
                No report analyses yet
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Report Intelligence analyses will appear here after submitting a
              report through the V2 flow.
            </p>
          </BentoCard>
        </div>
      ) : null}

      {!isLoading && !errorMessage && reports.length > 0 ? (
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {reports.map((report) => (
            <BentoCard key={report.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                    {REPORT_TYPE_LABELS[report.reportType]}
                  </Badge>
                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    Report Intelligence analysis
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {formatDate(report.createdAt)}
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
                  <FileText className="size-5" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Language
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {REPORT_LANGUAGE_LABELS[report.targetLanguage]}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    BI-RADS
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {report.structuredFindings.birads ?? "Not mentioned"}
                  </p>
                </div>
              </div>

              <p className="mt-5 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
                WDBC compatible:{" "}
                {report.wdbcCompatibility.canRunPrediction ? "yes" : "no"}
              </p>

              <Link
                href={`/reports/${report.id}`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "mt-5 h-11 w-full rounded-xl border-border bg-white"
                )}
              >
                View details
              </Link>
            </BentoCard>
          ))}
        </div>
      ) : null}
    </section>
  );
}
