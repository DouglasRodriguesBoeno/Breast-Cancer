import Link from "next/link";
import {
  BookOpenText,
  BrainCircuit,
  Clock3,
  Database,
  FileText,
  Languages,
  ListChecks,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import { AppHeader } from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const productPillars = [
  {
    title: "Inteligência de laudos",
    description:
      "Estrutura o texto do exame e destaca achados mencionados, medidas e termos importantes.",
    icon: FileText,
    className: "bg-primary-rose-soft text-primary-rose",
  },
  {
    title: "Explicação educacional",
    description:
      "Transforma linguagem técnica em uma leitura simples para apoiar a conversa com profissionais de saúde.",
    icon: BookOpenText,
    className: "bg-accent-blue-soft text-accent-blue",
  },
  {
    title: "Experiência multilíngue",
    description:
      "Gera explicações em português, inglês ou espanhol conforme o fluxo escolhido.",
    icon: Languages,
    className: "bg-secondary-teal-soft text-secondary-teal-dark",
  },
  {
    title: "WDBC complementar",
    description:
      "Mantém o modelo estruturado disponível quando os dados numéricos compatíveis existem.",
    icon: Database,
    className: "bg-muted text-muted-foreground",
  },
];

const steps = [
  "Cole o texto do laudo",
  "A IA organiza os achados",
  "Revise a explicação educacional",
  "Confira a compatibilidade WDBC",
];

function ProductPillar({
  title,
  description,
  icon: Icon,
  className,
}: {
  title: string;
  description: string;
  icon: typeof FileText;
  className: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className={cn("flex size-11 items-center justify-center rounded-xl", className)}>
        <Icon className="size-5" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}

function ReportPreviewPanel() {
  return (
    <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
            Análise educacional
          </Badge>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground">
            Resumo do laudo
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            O laudo menciona achados, localização e termos que podem ser
            organizados em linguagem simples.
          </p>
        </div>

        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
          <BrainCircuit className="size-6" />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            BI-RADS
          </p>
          <p className="mt-2 text-lg font-semibold text-secondary-teal-dark">
            Quando mencionado
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            WDBC
          </p>
          <p className="mt-2 text-lg font-semibold text-accent-blue">
            Painel avançado
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {[
          "Achados principais descritos no texto",
          "Termos importantes explicados",
          "Lembretes educacionais sempre visíveis",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background p-4"
          >
            <ListChecks className="size-4 shrink-0 text-secondary-teal-dark" />
            <span className="text-sm font-medium text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationalNotice() {
  return (
    <div className="rounded-2xl border border-primary-rose-soft bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <h2 className="font-semibold text-foreground">
            Conteúdo educacional.
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            O BreastCare AI ajuda a organizar informações do laudo e não
            substitui avaliação de um profissional de saúde.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground">
      <AppHeader />

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-2 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-20">
        <div>
          <Badge className="rounded-full bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
            Report Intelligence & Explainable AI
          </Badge>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Entenda seu laudo de mama com apoio de IA educacional
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted-foreground">
            Cole o texto do laudo, veja os principais achados estruturados e
            receba uma explicação simples e não diagnóstica.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/new-analysis"
              className={cn(
                buttonVariants(),
                "h-14 rounded-xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 hover:bg-primary-rose-dark"
              )}
            >
              <FileText className="mr-2 size-5" />
              Analisar laudo
            </Link>

            <Link
              href="/history"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-14 rounded-xl border-border bg-white px-8 text-base font-semibold text-foreground shadow-sm hover:bg-muted"
              )}
            >
              <Clock3 className="mr-2 size-5" />
              Ver histórico
            </Link>
          </div>

          <div className="mt-10">
            <EducationalNotice />
          </div>
        </div>

        <ReportPreviewPanel />
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-10">
        <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-blue">
                Fluxo principal V2
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                Uma jornada guiada para entender o laudo
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground">
              A predição WDBC continua disponível como etapa avançada quando há
              dados numéricos compatíveis.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary-rose text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 font-semibold text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {productPillars.map((pillar) => (
            <ProductPillar key={pillar.title} {...pillar} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <SlidersHorizontal className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  Precisa do fluxo WDBC avançado?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  O editor técnico antigo foi preservado para uso complementar.
                </p>
              </div>
            </div>

            <Link
              href="/new-analysis/advanced"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 rounded-xl border-border bg-white px-5"
              )}
            >
              Abrir WDBC avançado
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
