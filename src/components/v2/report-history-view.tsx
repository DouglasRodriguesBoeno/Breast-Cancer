"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertTriangle, Clock3, FileText, Plus } from "lucide-react";

import { getReportAnalyses } from "@/services/report-intelligence-service";
import type { ReportAnalysis } from "@/types/report-intelligence";
import type { ReportLanguage, ReportType } from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const languageLabels: Record<ReportLanguage, string> = {
  "pt-BR": "Português",
  en: "Inglês",
  es: "Espanhol",
};

const reportTypeLabels: Record<ReportType, string> = {
  MAMMOGRAPHY: "Mamografia",
  ULTRASOUND: "Ultrassom",
  MRI: "Ressonância de mama",
  BIOPSY: "Biópsia",
  UNKNOWN: "Tipo não informado",
};

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
            : "Não foi possível carregar o histórico de laudos."
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
            Histórico
          </Badge>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Análises de laudos
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Revise suas explicações educacionais anteriores em uma linha do
            tempo simples e fácil de acompanhar.
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
          Nova análise
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
                Linha do tempo
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Exibindo registros carregados de /api/report-intelligence.
              </p>
            </div>
          </div>
        </BentoCard>
      </div>

      {isLoading ? (
        <div className="mt-5">
          <BentoCard>
            <p className="text-sm font-medium text-muted-foreground">
              Carregando histórico de laudos...
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
                  Não foi possível carregar o histórico
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
          <BentoCard className="rounded-[2rem] p-8 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
              <FileText className="size-6" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-foreground">
              Nenhuma análise de laudo ainda
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Quando você enviar um laudo pelo fluxo guiado, ele aparecerá aqui
              com data, tipo de exame, BI-RADS quando mencionado e status WDBC.
            </p>
            <Link
              href="/new-analysis/report"
              className={cn(
                buttonVariants(),
                "mt-6 h-12 rounded-xl bg-primary-rose px-6 text-white hover:bg-primary-rose-dark"
              )}
            >
              Começar uma análise
            </Link>
          </BentoCard>
        </div>
      ) : null}

      {!isLoading && !errorMessage && reports.length > 0 ? (
        <div className="mt-8 space-y-4">
          {reports.map((report, index) => (
            <article
              key={report.id}
              className="relative rounded-[2rem] border border-border bg-white p-5 shadow-sm md:p-6"
            >
              <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-border md:block" />

              <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-start">
                <div className="relative z-10 flex size-11 items-center justify-center rounded-full bg-primary-rose text-sm font-semibold text-white">
                  {index + 1}
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                      {reportTypeLabels[report.reportType]}
                    </Badge>
                    <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                      {languageLabels[report.targetLanguage]}
                    </Badge>
                    <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                      WDBC:{" "}
                      {report.wdbcCompatibility.canRunPrediction
                        ? "compatível"
                        : "não compatível"}
                    </Badge>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-foreground">
                    Análise educacional de laudo
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Data
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {formatDate(report.createdAt)}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        BI-RADS
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {report.structuredFindings.birads ?? "Não mencionado"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-border bg-background p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Provedor
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {report.provider ?? "Não informado"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {report.educationalSummary}
                  </p>
                </div>

                <Link
                  href={`/reports/${report.id}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 rounded-xl border-border bg-white px-5"
                  )}
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
