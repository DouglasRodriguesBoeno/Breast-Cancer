import Link from "next/link";
import { ArrowLeft, Database, FileUp } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

export default function StructuredDataImportPage() {
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
          <div className="flex size-14 items-center justify-center rounded-2xl bg-accent-blue-soft text-accent-blue">
            <Database className="size-7" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary-rose">
            Dados estruturados
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Importação WDBC em preparação
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Este caminho será usado para CSV ou JSON com variáveis compatíveis
            com o modelo WDBC. Ele permanece como uma etapa avançada e
            complementar ao fluxo de laudo.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-[1fr_0.8fr]">
          <BentoCard className="rounded-[2rem]">
            <div className="flex items-center gap-3">
              <FileUp className="size-5 text-accent-blue" />
              <h2 className="text-xl font-semibold text-foreground">
                Use o fluxo disponível agora
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Para inserir manualmente as 30 variáveis WDBC, acesse o fluxo
              avançado preservado da V1.
            </p>

            <Link
              href="/new-analysis/advanced"
              className={cn(
                buttonVariants(),
                "mt-6 h-12 rounded-xl bg-primary-rose px-6 text-white hover:bg-primary-rose-dark"
              )}
            >
              Abrir WDBC avançado
            </Link>
          </BentoCard>

          <SafetyNotice />
        </div>
      </section>
    </PageShell>
  );
}
