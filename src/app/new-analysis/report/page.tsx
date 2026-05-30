import { CheckCircle2, FileText, Sparkles, XCircle } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { BentoCard } from "@/components/v2/bento-card";
import { ReportInputForm } from "@/components/v2/report-input-form";
import { SafetyNotice } from "@/components/v2/safety-notice";

const doesItems = [
  "Resumo educacional em linguagem simples",
  "Achados mencionados no texto",
  "BI-RADS quando estiver informado",
  "Termos importantes explicados",
  "Compatibilidade WDBC em painel avançado",
];

const doesNotItems = [
  "Não substitui avaliação profissional",
  "Não sugere condutas clínicas",
  "Não define urgência médica",
  "Não inventa variáveis WDBC",
];

export default function ReportInputPage() {
  return (
    <PageShell>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-2 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-14">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-rose">
            Etapa 1 de 4
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Vamos começar pelo texto do laudo
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Cole o conteúdo do exame para receber uma explicação educacional
            organizada, com foco em clareza e contexto.
          </p>

          <div className="mt-8">
            <ReportInputForm />
          </div>
        </div>

        <div className="space-y-5 lg:pt-20">
          <SafetyNotice />

          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <Sparkles className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                O que você vai receber
              </h2>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              {doesItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary-teal-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary-teal-soft text-secondary-teal-dark">
                <FileText className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Como funciona
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {["Enviar texto", "Estruturar achados", "Revisar explicação"].map(
                (step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-background text-sm font-semibold text-primary-rose">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-foreground">{step}</p>
                  </div>
                )
              )}
            </div>
          </BentoCard>

          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
                <XCircle className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Limites da análise
              </h2>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              {doesNotItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-primary-rose" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </BentoCard>
        </div>
      </section>
    </PageShell>
  );
}
