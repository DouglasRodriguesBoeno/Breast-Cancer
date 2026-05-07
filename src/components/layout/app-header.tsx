import Link from "next/link";
import { Clock3, Grid2X2, HeartPulse } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function AppHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-3xl border border-border bg-card/90 px-6 py-4 shadow-sm backdrop-blur">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
          <HeartPulse className="size-5" />
        </div>

        <span className="text-lg font-semibold tracking-tight text-foreground">
          BreastCare <span className="text-primary-rose">AI</span>
        </span>
      </Link>

      <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
        <Link
          href="/analysis/new"
          className="flex items-center gap-2 transition hover:text-foreground"
        >
          <HeartPulse className="size-4" />
          New analysis
        </Link>

        <Link
          href="/analysis/history"
          className="flex items-center gap-2 transition hover:text-foreground"
        >
          <Clock3 className="size-4" />
          History
        </Link>

        <Link
          href="/model"
          className="flex items-center gap-2 transition hover:text-foreground"
        >
          <Grid2X2 className="size-4" />
          Model
        </Link>
      </nav>

      <Badge className="rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
        Educational AI Project
      </Badge>
    </header>
  );
}
