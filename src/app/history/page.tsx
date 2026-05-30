import Link from "next/link";
import { Clock3, FileText, HeartPulse, Plus } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BentoCard } from "@/components/v2/bento-card";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { cn } from "@/lib/utils";

const previewItems = [
  {
    id: "report-preview",
    type: "Report Intelligence analysis",
    date: "Awaiting report API data",
    status: "Layout ready",
    detail: "WDBC compatible: pending",
    href: "/reports/report-preview",
    icon: FileText,
  },
  {
    id: "wdbc-history",
    type: "WDBC prediction",
    date: "Existing V1 history",
    status: "Available",
    detail: "Structured model outputs remain accessible",
    href: "/analysis/history",
    icon: HeartPulse,
  },
];

export default function UnifiedHistoryPage() {
  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
              Unified history
            </Badge>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Report History
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Review Report Intelligence analyses and WDBC prediction records
              from one educational workspace.
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
            New analysis
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <SafetyNotice />

          <BentoCard>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <Clock3 className="size-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  History records
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  API-backed report records can connect here when the report
                  service is available.
                </p>
              </div>
            </div>
          </BentoCard>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {previewItems.map((item) => {
            const Icon = item.icon;

            return (
              <BentoCard key={item.id}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge className="rounded-full bg-accent-blue-soft px-3 py-1 text-accent-blue hover:bg-accent-blue-soft">
                      {item.type}
                    </Badge>
                    <h2 className="mt-4 text-xl font-semibold text-foreground">
                      {item.status}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.date}
                    </p>
                  </div>

                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
                    <Icon className="size-5" />
                  </div>
                </div>

                <p className="mt-5 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
                  {item.detail}
                </p>

                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "mt-5 h-11 w-full rounded-xl border-border bg-white"
                  )}
                >
                  View details
                </Link>
              </BentoCard>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
