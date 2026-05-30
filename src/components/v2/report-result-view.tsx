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
import type { ReportLanguage, ReportType } from "@/types/report-intelligence";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

function fallback(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : "Não mencionado";
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatMeasurement(measurement: ReportMeasurement) {
  return `${measurement.value} ${measurement.unit} - ${measurement.context}`;
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

function LoadingState() {
  return (
    <BentoCard>
      <p className="text-sm font-medium text-muted-foreground">
        Carregando análise do laudo...
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
            Não foi possível carregar a análise
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
            : "Não foi possível carregar a análise do laudo."
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
    return <ErrorState message={errorMessage ?? "Análise não encontrada."} />;
  }

  const findings = report.structuredFindings;
  const measurements = findings.measurements ?? [];

  return (
    <div>
      <section className="rounded-[2rem] border border-border bg-white p-6 shadow-sm md:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                Uso educacional
              </Badge>
              <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                {languageLabels[report.detectedLanguage]}
              </Badge>
              <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                {reportTypeLabels[report.reportType]}
              </Badge>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Sua explicação educacional está pronta
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Organizamos o texto enviado em uma leitura simples, com termos
              importantes e notas de segurança.
            </p>
          </div>

          <Link
            href="/new-analysis"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-xl border-border bg-white px-5"
            )}
          >
            Nova análise
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["BI-RADS", fallback(report.structuredFindings.birads)],
            ["Tipo de exame", reportTypeLabels[report.reportType]],
            ["Data", formatDate(report.createdAt)],
            [
              "Provedor",
              `${fallback(report.provider)}${
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
              Explicação simples
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
              O que o laudo mencionou
            </h2>
          </div>

          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            {report.educationalSummary}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["BI-RADS", fallback(findings.birads)],
              ["Lado da mama", fallback(findings.breastSide)],
              ["Localização", fallback(findings.location)],
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
              Medidas
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
                Nenhuma medida mencionada.
              </p>
            )}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                Achados mencionados
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(findings.mentionedFindings ?? []).length > 0 ? (
                  findings.mentionedFindings.map((item) => (
                    <li key={item}>{item}</li>
                  ))
                ) : (
                  <li>Nenhum achado listado.</li>
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="font-semibold text-foreground">
                Orientações mencionadas no texto
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {(findings.mentionedRecommendations ?? []).length > 0 ? (
                  findings.mentionedRecommendations.map((item) => (
                    <li key={item}>{item}</li>
                  ))
                ) : (
                  <li>Nenhuma orientação listada.</li>
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
                Termos importantes explicados
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {report.importantTerms.map((item) => (
                <div key={item.term} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <p className="font-semibold text-foreground">{item.term}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
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
                Painel avançado WDBC
              </h2>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">
                Pode usar predição WDBC?{" "}
                {report.wdbcCompatibility.canRunPrediction ? "Sim" : "Não"}
              </p>
              <p className="mt-2">{report.wdbcCompatibility.reason}</p>
              <p className="mt-3">
                Foram detectadas{" "}
                {report.wdbcCompatibility.detectedFeaturesCount} de{" "}
                {report.wdbcCompatibility.requiredFeaturesCount} variáveis
                necessárias. Ausentes:{" "}
                {report.wdbcCompatibility.missingFeaturesCount}.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <Brain className="size-5 text-primary-rose" />
            <h2 className="text-xl font-semibold text-foreground">
              Provedor da análise
            </h2>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Provedor
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {fallback(report.provider)}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Modelo
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {fallback(report.providerModel)}
              </p>
            </div>
          </div>
        </BentoCard>

        <BentoCard className="rounded-[2rem]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-secondary-teal-dark" />
            <h2 className="text-xl font-semibold text-foreground">
              Notas de segurança
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
    </div>
  );
}
