import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Database,
  FileText,
  GraduationCap,
  ListChecks,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { ModeSelectionCard } from "@/components/v2/mode-selection-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modes = [
  {
    href: "/new-analysis/report",
    title: "Analisar laudo",
    description:
      "Cole o texto do exame e receba uma explicação educacional organizada.",
    cta: "Começar pelo laudo",
    icon: FileText,
    recommended: true,
    bullets: [
      "Identifica achados mencionados",
      "Destaca BI-RADS quando informado",
      "Explica termos em linguagem simples",
      "Verifica compatibilidade WDBC",
    ],
  },
  {
    href: "/new-analysis/demo",
    title: "Demonstração educacional",
    description: "Use exemplos guiados para entender a experiência.",
    cta: "Explorar demo",
    icon: GraduationCap,
  },
  {
    href: "/new-analysis/import",
    title: "Importar dados estruturados",
    description: "Prepare dados CSV ou JSON compatíveis com WDBC.",
    cta: "Preparar importação",
    icon: Database,
  },
  {
    href: "/new-analysis/advanced",
    title: "Entrada WDBC avançada",
    description: "Acesse o fluxo técnico das 30 variáveis do modelo.",
    cta: "Abrir fluxo avançado",
    icon: SlidersHorizontal,
  },
];

const steps = [
  {
    title: "Cole o laudo",
    description: "Comece com o texto do exame, sem preencher variáveis técnicas.",
    icon: MessageSquareText,
  },
  {
    title: "A IA estrutura achados",
    description: "O sistema organiza termos, medidas e menções relevantes.",
    icon: BrainCircuit,
  },
  {
    title: "Revise a explicação",
    description: "Receba uma leitura educacional em linguagem simples.",
    icon: ListChecks,
  },
  {
    title: "Cheque WDBC",
    description: "Veja se há dados suficientes para o modelo estruturado.",
    icon: ShieldCheck,
  },
];

export function AnalysisModeSelection() {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 py-10 lg:py-14">
      <section className="rounded-[2rem] border border-border bg-white px-6 py-8 shadow-sm md:px-10 lg:px-12 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-rose">
              BreastCare AI V2
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Entenda seu laudo de mama com apoio de IA educacional
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Cole o texto do laudo, veja os principais achados estruturados e
              receba uma explicação simples e não diagnóstica.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new-analysis/report"
                className={cn(
                  buttonVariants(),
                  "h-12 rounded-xl bg-primary-rose px-6 text-base font-semibold text-white hover:bg-primary-rose-dark"
                )}
              >
                Analisar laudo
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="/new-analysis/report"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 rounded-xl border-border bg-white px-6 text-base font-semibold text-foreground"
                )}
              >
                Ver demonstração educacional
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background p-5">
            <SafetyNotice />
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-border bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-blue">
              Fluxo guiado
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Do texto do laudo à explicação educacional
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            O caminho principal prioriza compreensão antes de qualquer recurso
            técnico avançado.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-border bg-background p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary-rose text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <Icon className="size-5 text-accent-blue" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-rose">
            Escolha seu caminho
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Comece pelo modo mais confortável para você
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
        {modes.map((mode) => (
          <ModeSelectionCard key={mode.title} {...mode} />
        ))}
        </div>
      </section>
    </div>
  );
}
