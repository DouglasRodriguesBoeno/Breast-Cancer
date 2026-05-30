import Link from "next/link";
import { ArrowLeft, GraduationCap, PlayCircle } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

export default function EducationalDemoPage() {
  return (
    <PageShell>
      <section className="mx-auto w-full max-w-5xl px-2 py-12 lg:py-16">
        <Link
          href="/new-analysis"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 rounded-xl border-border bg-white px-4"
          )}
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar aos modos
        </Link>

        <div className="mt-8 rounded-[2rem] border border-border bg-white p-8 shadow-sm md:p-10">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary-teal-soft text-secondary-teal-dark">
            <GraduationCap className="size-7" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary-rose">
            Demonstração educacional
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Explore a experiência com um exemplo guiado
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Esta área prepara casos de demonstração para entender como o
            BreastCare AI estrutura informações e apresenta explicações
            educacionais.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_0.8fr]">
          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <PlayCircle className="size-5 text-accent-blue" />
              <h2 className="text-xl font-semibold text-foreground">
                Próximo passo recomendado
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Enquanto os exemplos guiados são preparados, você pode usar o
              fluxo principal colando um laudo em texto livre.
            </p>

            <Link
              href="/new-analysis/report"
              className={cn(
                buttonVariants(),
                "mt-6 h-12 rounded-xl bg-primary-rose px-6 text-white hover:bg-primary-rose-dark"
              )}
            >
              Analisar laudo
            </Link>
          </BentoCard>

          <SafetyNotice />
        </div>
      </section>
    </PageShell>
  );
}
