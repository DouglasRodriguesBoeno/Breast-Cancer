"use client";

import Link from "next/link";
import {
  BarChart3,
  BookOpenText,
  BrainCircuit,
  Database,
  FileText,
  Globe2,
  Layers3,
  LockKeyhole,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { AppHeader } from "@/components/layout/app-header";
import { V2FeatureCard, V2IconBubble } from "@/components/v2/v2-primitives";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "@/i18n/use-translations";
import { cn } from "@/lib/utils";

function HeroVisual() {
  const { t } = useTranslations();
  const pipeline = [
    ["home.pipeline.report", "home.pipeline.report.desc", FileText, "bg-primary-rose-soft text-primary-rose"],
    ["home.pipeline.findings", "home.pipeline.findings.desc", Layers3, "bg-accent-blue-soft text-accent-blue"],
    ["home.pipeline.explanation", "home.pipeline.explanation.desc", BookOpenText, "bg-secondary-teal-soft text-secondary-teal-dark"],
    ["home.pipeline.wdbc", "home.pipeline.wdbc.desc", Target, "bg-muted text-muted-foreground"],
  ] as const;

  return (
    <div className="animate-slide-up relative">
      <div className="rounded-[2rem] border border-border bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className="rounded-full bg-secondary-teal-soft px-3 py-1 text-secondary-teal-dark hover:bg-secondary-teal-soft">
              {t("result.done")}
            </Badge>
            <h2 className="mt-5 text-2xl font-semibold text-foreground">
              {t("home.pipeline.title")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t("home.feature.report.desc")}
            </p>
          </div>
          <V2IconBubble
            icon={BrainCircuit}
            className="animate-soft-pulse bg-primary-rose-soft text-primary-rose"
          />
        </div>

        <div className="mt-7 space-y-3">
          {pipeline.map(([titleKey, descKey, Icon, className], index) => (
            <div key={titleKey} className="relative">
              {index < pipeline.length - 1 ? (
                <div className="absolute left-6 top-14 h-6 w-px bg-border" />
              ) : null}
              <div
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
              >
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white shadow-sm",
                    className
                  )}
                >
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-primary-rose text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-foreground">
                      {t(titleKey)}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {t(descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslations();

  const strip = [
    ["home.feature.report", "home.feature.report.desc", FileText, "bg-primary-rose-soft text-primary-rose"],
    ["home.feature.ml", "home.feature.ml.desc", BarChart3, "bg-secondary-teal-soft text-secondary-teal-dark"],
    ["home.feature.multi", "home.feature.multi.desc", Globe2, "bg-accent-blue-soft text-accent-blue"],
    ["home.feature.safety", "home.feature.safety.desc", ShieldCheck, "bg-primary-rose-soft text-primary-rose"],
    ["home.feature.prod", "home.feature.prod.desc", Database, "bg-muted text-muted-foreground"],
  ] as const;

  const cards = [
    ["home.card.upload", "home.card.upload.desc", FileText, "bg-primary-rose-soft text-primary-rose"],
    ["home.card.explain", "home.card.explain.desc", BookOpenText, "bg-secondary-teal-soft text-secondary-teal-dark"],
    ["home.card.compat", "home.card.compat.desc", Target, "bg-accent-blue-soft text-accent-blue"],
    ["home.card.structured", "home.card.structured.desc", Layers3, "bg-primary-rose-soft text-primary-rose"],
  ] as const;

  const trust = [
    ["home.trust.privacy", LockKeyhole],
    ["home.trust.secure", ShieldCheck],
    ["home.trust.noDiagnosis", Sparkles],
    ["home.trust.educational", BookOpenText],
  ] as const;

  return (
    <main className="min-h-screen overflow-hidden bg-background px-5 py-6 text-foreground">
      <AppHeader />

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-2 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-20">
        <div className="animate-slide-up">
          <Badge className="rounded-full border border-primary-rose-soft bg-white px-4 py-2 text-primary-rose hover:bg-white">
            {t("home.eyebrow")}
          </Badge>

          <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            {t("home.title")}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-9 text-muted-foreground">
            {t("home.subtitle")}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/new-analysis/report"
              className={cn(
                buttonVariants(),
                "h-14 rounded-xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 transition hover:-translate-y-0.5 hover:bg-primary-rose-dark"
              )}
            >
              <FileText className="mr-2 size-5" />
              {t("home.primary")}
            </Link>
            <Link
              href="/new-analysis/demo"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-14 rounded-xl border-border bg-white px-8 text-base font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-muted"
              )}
            >
              <PlayCircle className="mr-2 size-5" />
              {t("home.secondary")}
            </Link>
          </div>

          <div className="mt-8 rounded-2xl border border-primary-rose-soft bg-white p-5 shadow-sm">
            <div className="flex gap-4">
              <V2IconBubble
                icon={ShieldCheck}
                className="bg-primary-rose-soft text-primary-rose"
              />
              <div>
                <h2 className="font-semibold text-foreground">
                  {t("home.bannerTitle")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t("home.bannerText")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <HeroVisual />
      </section>

      <section
        id="features"
        className="mx-auto w-full max-w-7xl px-2 pb-10"
      >
        <div className="grid overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm md:grid-cols-5">
          {strip.map(([titleKey, descKey, Icon, className], index) => (
            <div
              key={titleKey}
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-slide-up border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <V2IconBubble icon={Icon} className={className} />
              <h3 className="mt-4 font-semibold text-foreground">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t(descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto w-full max-w-7xl px-2 pb-12">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
          {t("home.confidence")}
        </h2>

        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(([titleKey, descKey, Icon, className], index) => (
            <V2FeatureCard
              key={titleKey}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <V2IconBubble icon={Icon} className={className} />
              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t(descKey)}
              </p>
            </V2FeatureCard>
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:grid-cols-4">
          {trust.map(([titleKey, Icon]) => (
            <div
              key={titleKey}
              className="flex items-center gap-3 border-b border-border p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <Icon className="size-5 text-secondary-teal-dark" />
              <span className="text-sm font-semibold text-foreground">
                {t(titleKey)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
