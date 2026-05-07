import Link from "next/link";
import {
  Activity,
  Brain,
  Clock3,
  Grid2X2,
  HeartPulse,
  History,
  Info,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const insights = [
  {
    title: "AI-Powered Insights",
    description:
      "Machine learning predictions with explainability and transparency.",
    icon: Brain,
    className: "bg-primary-rose-soft text-primary-rose",
  },
  {
    title: "Safe & Educational",
    description:
      "Built for learning and exploration using public medical datasets.",
    icon: ShieldCheck,
    className: "bg-secondary-teal-soft text-secondary-teal-dark",
  },
  {
    title: "Understand with Confidence",
    description:
      "See probabilities, risk bands and model reasoning in plain language.",
    icon: Activity,
    className: "bg-accent-blue-soft text-accent-blue",
  },
];

function AppHeader() {
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

function InsightItem({
  title,
  description,
  icon: Icon,
  className,
}: {
  title: string;
  description: string;
  icon: typeof Brain;
  className: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${className}`}
      >
        <Icon className="size-5" />
      </div>

      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function QuickPredictionPreviewCard() {
  return (
    <Card className="w-full max-w-sm rounded-3xl border-border bg-card/95 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pt-5">
        <CardTitle className="text-base font-semibold">
          Quick prediction preview
        </CardTitle>
        <Info className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="mt-2 space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Predicted pattern
            </p>

            <Badge className="mt-3 rounded-xl bg-risk-low-soft px-3 py-1 text-risk-low hover:bg-risk-low-soft">
              Benign
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Malignant probability
            </p>

            <p className="mt-2 text-4xl font-semibold tracking-tight text-secondary-teal-dark">
              12.4%
            </p>

            <Progress
              value={12.4}
              className="mt-4 h-3 bg-slate-200 [&>div]:bg-secondary-teal"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Risk band
            </span>

            <Badge className="rounded-xl bg-risk-low-soft px-3 py-1 text-risk-low hover:bg-risk-low-soft">
              <ShieldCheck className="mr-1 size-3" />
              Low
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EducationalDisclaimer() {
  return (
    <div className="rounded-3xl border border-primary-rose-soft bg-white/75 p-6 shadow-sm">
      <div className="flex gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
          <ShieldCheck className="size-5" />
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Educational only — not a medical diagnosis.
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            BreastCare AI provides model predictions for educational purposes
            only. Always consult qualified healthcare professionals for medical
            evaluation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_80%_15%,#ffe4e6_0,transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] px-5 py-6 text-foreground">
      <AppHeader />

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-2 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
        <div>
          <Badge className="mb-8 rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
            Educational AI Project
          </Badge>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            BreastCare <span className="text-primary-rose">AI</span>
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted-foreground">
            Educational AI platform for breast cancer prediction and model
            explainability.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/analysis/new"
              className={cn(
                buttonVariants(),
                "h-14 rounded-2xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 hover:bg-primary-rose-dark"
              )}
            >
              <Brain className="mr-2 size-5" />
              Start analysis
            </Link>

            <Link
              href="/analysis/history"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-14 rounded-2xl border-border bg-white px-8 text-base font-semibold text-foreground shadow-sm hover:bg-muted"
              )}
            >
              <History className="mr-2 size-5" />
              View history
            </Link>
          </div>

          <div className="mt-16 grid gap-7">
            {insights.map((insight) => (
              <InsightItem key={insight.title} {...insight} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-10 -top-16 hidden size-32 rounded-full border border-primary-rose-soft bg-primary-rose-soft/40 blur-2xl lg:block" />
          <div className="absolute left-6 top-8 hidden size-24 rounded-full bg-secondary-teal-soft/60 blur-2xl lg:block" />

          <div className="relative mx-auto flex max-w-lg flex-col gap-6">
            <div className="rounded-[2rem] border border-primary-rose-soft bg-white/80 p-6 shadow-[0_24px_80px_rgba(244,20,79,0.10)] backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    AI model status
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-foreground">
                    Ready for guided analysis
                  </h2>
                </div>

                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
                  <HeartPulse className="size-7" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs text-muted-foreground">Model</p>
                  <p className="mt-1 text-sm font-semibold">Ensemble</p>
                </div>

                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs text-muted-foreground">Threshold</p>
                  <p className="mt-1 text-sm font-semibold">34.3%</p>
                </div>

                <div className="rounded-2xl bg-muted p-4">
                  <p className="text-xs text-muted-foreground">Mode</p>
                  <p className="mt-1 text-sm font-semibold">Guided</p>
                </div>
              </div>
            </div>

            <QuickPredictionPreviewCard />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <EducationalDisclaimer />
      </section>
    </main>
  );
}