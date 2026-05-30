import { FileText, ShieldCheck, XCircle } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { BentoCard } from "@/components/v2/bento-card";
import { ReportInputForm } from "@/components/v2/report-input-form";
import { SafetyNotice } from "@/components/v2/safety-notice";

const doesItems = [
  "Extracts key findings",
  "Identifies BI-RADS when mentioned",
  "Explains medical terms",
  "Checks WDBC compatibility",
  "Keeps safety notes visible",
];

const doesNotItems = [
  "Does not diagnose",
  "Does not replace a healthcare professional",
  "Does not recommend treatment",
  "Does not invent WDBC features",
];

export default function ReportInputPage() {
  return (
    <PageShell>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-2 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-rose">
            Report Intelligence
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Analyze medical report
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Paste a breast exam report and receive a structured educational
            explanation.
          </p>

          <div className="mt-8">
            <ReportInputForm />
          </div>
        </div>

        <div className="space-y-5 lg:pt-28">
          <SafetyNotice />

          <BentoCard>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <FileText className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                What this analysis does
              </h2>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              {doesItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-secondary-teal-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
                <XCircle className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                What it does not do
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
