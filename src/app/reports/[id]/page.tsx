import Link from "next/link";
import {
  BookOpenText,
  FileText,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

const findings = [
  ["Exam type", "Mammography"],
  ["BI-RADS", "Not available in this layout preview"],
  ["Breast side", "Awaiting report API data"],
  ["Location", "Awaiting report API data"],
  ["Measurements", "Awaiting report API data"],
  ["Mentioned findings", "Awaiting report API data"],
];

const terms = [
  ["BI-RADS", "A reporting category that may be mentioned in breast imaging reports."],
  ["Calcifications", "Small calcium deposits that can be described in imaging text."],
  ["Margins", "A term used to describe the border of a finding when mentioned."],
];

export default async function ReportResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                Educational only
              </Badge>
              <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                Report ID: {id}
              </Badge>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Report analysis completed
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              This route is ready for the Report Intelligence API response and
              shows the V2 result structure.
            </p>
          </div>

          <Link
            href="/new-analysis"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-12 rounded-xl border-border bg-white px-5"
            )}
          >
            New analysis
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <BentoCard className="lg:row-span-2">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <BookOpenText className="size-5" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Simple Explanation
              </h2>
            </div>

            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              The report explanation will appear here after the report API is
              connected. The copy should say what the report mentions in simple
              educational language and should be reviewed with a healthcare
              professional.
            </p>
          </BentoCard>

          <SafetyNotice />

          <BentoCard>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-secondary-teal-soft text-secondary-teal-dark">
                <ListChecks className="size-5" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Structured Findings
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {findings.map(([label, value]) => (
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
          </BentoCard>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <BentoCard>
            <div className="flex items-center gap-3">
              <Sparkles className="size-5 text-primary-rose" />
              <h2 className="text-xl font-semibold text-foreground">
                Important Terms
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {terms.map(([term, explanation]) => (
                <div key={term}>
                  <p className="font-semibold text-foreground">{term}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {explanation}
                  </p>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-3">
              <FileText className="size-5 text-accent-blue" />
              <h2 className="text-xl font-semibold text-foreground">
                WDBC Compatibility
              </h2>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
              <p className="font-semibold text-foreground">
                Can run WDBC prediction? No
              </p>
              <p className="mt-2">
                This report can be explained educationally, but it cannot be
                used for WDBC prediction until the required 30 numerical
                features are available.
              </p>
            </div>
          </BentoCard>

          <BentoCard>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-secondary-teal-dark" />
              <h2 className="text-xl font-semibold text-foreground">
                Safety Notes
              </h2>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>This system is educational only.</li>
              <li>It does not provide diagnosis.</li>
              <li>It does not replace a healthcare professional.</li>
            </ul>
          </BentoCard>
        </div>
      </section>
    </PageShell>
  );
}
