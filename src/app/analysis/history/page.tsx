import Link from "next/link";
import { History, Plus } from "lucide-react";

import { HistoryList } from "@/components/history/history-list";
import { PageShell } from "@/components/layout/page-shell";
import { EducationalDisclaimer } from "@/components/shared/educational-disclaimer";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AnalysisHistoryPage() {
  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
              Prediction history
            </Badge>

            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Analysis history
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Review previous educational predictions, risk bands and model
              probabilities created through the guided analysis flow.
            </p>
          </div>

          <Link
            href="/analysis/new"
            className={cn(
              buttonVariants(),
              "h-14 rounded-2xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 hover:bg-primary-rose-dark"
            )}
          >
            <Plus className="mr-2 size-5" />
            New analysis
          </Link>
        </div>

        <div className="mt-10">
          <div className="mb-6 flex items-center gap-3 rounded-3xl border border-border bg-white/75 p-5 text-sm text-muted-foreground shadow-sm">
            <History className="size-5 text-primary-rose" />
            The history is ordered by creation date, with the most recent
            analyses first.
          </div>

          <HistoryList />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <EducationalDisclaimer />
      </section>
    </PageShell>
  );
}