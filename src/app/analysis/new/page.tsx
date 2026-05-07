import { Beaker, Brain, FlaskConical, Info } from "lucide-react";

import { ScenarioSelector } from "@/components/analysis/scenario-selector";
import { PageShell } from "@/components/layout/page-shell";
import { EducationalDisclaimer } from "@/components/shared/educational-disclaimer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const featureGroups = [
  {
    title: "Mean features",
    description:
      "Average measurements such as radius_mean, texture_mean, perimeter_mean and area_mean.",
  },
  {
    title: "Standard error features",
    description:
      "Variation measurements such as radius_se, texture_se, perimeter_se and area_se.",
  },
  {
    title: "Worst features",
    description:
      "Largest or most severe measurements such as radius_worst, texture_worst and area_worst.",
  },
];

export default function NewAnalysisPage() {
  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge className="rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
              Guided analysis
            </Badge>

            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Create a new educational analysis
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Select one of the guided examples to run the first version of the
              BreastCare AI flow without manually filling all model features.
            </p>

            <Alert className="mt-8 rounded-3xl border-primary-rose-soft bg-white/80 p-5">
              <Info className="size-5 text-primary-rose" />
              <AlertTitle>Why guided examples?</AlertTitle>
              <AlertDescription>
                The WDBC model uses 30 numeric features. The guided flow keeps
                the experience clear for the V1 while preserving an advanced
                path for technical exploration.
              </AlertDescription>
            </Alert>
          </div>

          <ScenarioSelector />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-blue-soft text-accent-blue">
                <FlaskConical className="size-5" />
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Advanced mode
                </p>
                <h2 className="text-xl font-semibold text-foreground">
                  Feature editor structure
                </h2>
              </div>
            </div>

            <Accordion className="mt-6 rounded-2xl border border-border bg-card px-4">
              {featureGroups.map((group) => (
                <AccordionItem key={group.title} value={group.title}>
                  <AccordionTrigger>{group.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {group.description} In the next step, this section will
                      receive controlled numeric inputs connected to React Hook
                      Form and Zod.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="rounded-3xl border border-secondary-teal-soft bg-secondary-teal-soft/35 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-white text-secondary-teal-dark">
                <Beaker className="size-5" />
              </div>

              <h2 className="text-xl font-semibold text-foreground">
                Next integration step
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              After this static page is validated, the Run analysis button will
              send the selected feature payload to the Spring Boot API using
              POST /api/predictions and redirect to /analysis/[id].
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/75 p-4 text-sm font-medium text-foreground">
              <Brain className="size-5 text-primary-rose" />
              Home → New analysis → Result detail
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <EducationalDisclaimer />
      </section>
    </PageShell>
  );
}
