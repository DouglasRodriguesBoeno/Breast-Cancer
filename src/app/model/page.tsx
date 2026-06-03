"use client";

import Link from "next/link";
import {
  Activity,
  BarChart3,
  Brain,
  Database,
  FileText,
  Gauge,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "@/i18n/use-translations";
import { cn } from "@/lib/utils";

const metricCards = [
  {
    labelKey: "model.metrics.accuracy.label",
    value: "99.12%",
    descriptionKey: "model.metrics.accuracy.description",
    icon: Gauge,
    progress: 99.12,
  },
  {
    labelKey: "model.metrics.roc.label",
    value: "99.77%",
    descriptionKey: "model.metrics.roc.description",
    icon: LineChart,
    progress: 99.77,
  },
  {
    labelKey: "model.metrics.recall.label",
    value: "97.62%",
    descriptionKey: "model.metrics.recall.description",
    icon: Activity,
    progress: 97.62,
  },
];

const featureGroups = [
  {
    id: "mean",
    titleKey: "model.features.mean.title",
    descriptionKey: "model.features.mean.description",
    features: [
      "radius_mean",
      "texture_mean",
      "perimeter_mean",
      "area_mean",
      "smoothness_mean",
      "compactness_mean",
      "concavity_mean",
      "concave_points_mean",
      "symmetry_mean",
      "fractal_dimension_mean",
    ],
  },
  {
    id: "se",
    titleKey: "model.features.se.title",
    descriptionKey: "model.features.se.description",
    features: [
      "radius_se",
      "texture_se",
      "perimeter_se",
      "area_se",
      "smoothness_se",
      "compactness_se",
      "concavity_se",
      "concave_points_se",
      "symmetry_se",
      "fractal_dimension_se",
    ],
  },
  {
    id: "worst",
    titleKey: "model.features.worst.title",
    descriptionKey: "model.features.worst.description",
    features: [
      "radius_worst",
      "texture_worst",
      "perimeter_worst",
      "area_worst",
      "smoothness_worst",
      "compactness_worst",
      "concavity_worst",
      "concave_points_worst",
      "symmetry_worst",
      "fractal_dimension_worst",
    ],
  },
];

export default function ModelPage() {
  const { t } = useTranslations();

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge className="rounded-2xl bg-primary-rose-soft px-4 py-2 text-primary-rose hover:bg-primary-rose-soft">
              {t("model.badge")}
            </Badge>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {t("model.title")}
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {t("model.subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/analysis/new"
                className={cn(
                  buttonVariants(),
                  "h-14 rounded-2xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 hover:bg-primary-rose-dark"
                )}
              >
                <Sparkles className="mr-2 size-5" />
                {t("model.cta.run")}
              </Link>

              <Link
                href="/analysis/history"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-14 rounded-2xl border-border bg-white px-8 text-base font-semibold"
                )}
              >
                {t("model.cta.history")}
              </Link>
            </div>
          </div>

          <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <CardHeader className="px-6 pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Brain className="size-6 text-primary-rose" />
                    {t("model.current.title")}
                  </CardTitle>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {t("model.current.description")}
                  </p>
                </div>

                <Badge className="rounded-xl bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
                  {t("model.current.active")}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 px-6 pb-6">
              <div className="rounded-3xl bg-muted p-5">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("model.current.type")}
                </p>
                <p className="mt-2 break-words text-lg font-semibold text-foreground">
                  ensemble_mean_logistic_random_forest
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-primary-rose-soft/60 p-5">
                  <p className="text-sm font-medium text-primary-rose">
                    {t("model.current.threshold")}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-primary-rose">
                    34.33%
                  </p>
                </div>

                <div className="rounded-3xl bg-secondary-teal-soft/70 p-5">
                  <p className="text-sm font-medium text-secondary-teal-dark">
                    {t("model.current.inputFeatures")}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-secondary-teal-dark">
                    30
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-2 pb-12 md:grid-cols-3">
        {metricCards.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card
              key={metric.labelKey}
              className="rounded-3xl border-border bg-card/95 p-2 shadow-sm"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {t(metric.labelKey)}
                    </p>

                    <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
                      {metric.value}
                    </p>
                  </div>

                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
                    <Icon className="size-6" />
                  </div>
                </div>

                <Progress
                  value={metric.progress}
                  className="mt-5 h-2 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-primary-rose"
                />

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {t(metric.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-2 pb-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Database className="size-6 text-primary-rose" />
              {t("model.dataset.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 px-6 pb-6 text-sm leading-6 text-muted-foreground">
            <p>
              {t("model.dataset.p1")}
            </p>

            <div className="rounded-3xl bg-muted p-5">
              <p className="font-medium text-foreground">
                {t("model.goal.title")}
              </p>
              <p className="mt-2">
                {t("model.goal.description")}
              </p>
            </div>

            <div className="rounded-3xl bg-primary-rose-soft/40 p-5">
              <p className="font-medium text-primary-rose">
                {t("model.limitation.title")}
              </p>
              <p className="mt-2">
                {t("model.limitation.description")}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <BarChart3 className="size-6 text-primary-rose" />
              {t("model.features.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 px-6 pb-6">
            {featureGroups.map((group) => (
              <div key={group.id} className="rounded-3xl bg-muted p-5">
                <h3 className="font-semibold text-foreground">
                  {t(group.titleKey)}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(group.descriptionKey)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.features.map((feature) => (
                    <Badge
                      key={feature}
                      className="rounded-xl bg-white px-3 py-1 text-muted-foreground hover:bg-white"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-2 pb-12 lg:grid-cols-2">
        <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileText className="size-6 text-primary-rose" />
              {t("model.interpret.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6 text-sm leading-6 text-muted-foreground">
            <p>
              {t("model.interpret.p1")}
            </p>

            <p>
              {t("model.interpret.p2")}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-primary-rose-soft bg-primary-rose-soft/30 p-2 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ShieldCheck className="size-6 text-primary-rose" />
              {t("model.safety.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-6 pb-6 text-sm leading-6 text-muted-foreground">
            <p>
              {t("model.safety.p1")}
            </p>

            <p>
              {t("model.safety.p2")}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto w-full max-w-7xl px-2 pb-12">
        <div className="rounded-3xl border border-primary-rose-soft bg-white/75 p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h3 className="font-semibold text-foreground">
                {t("model.disclaimer.title")}
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                {t("model.disclaimer.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
