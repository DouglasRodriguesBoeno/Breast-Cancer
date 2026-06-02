"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  GraduationCap,
  HeartPulse,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { V2LanguageSwitcher } from "@/components/v2/language-switcher";
import { V2IconBubble } from "@/components/v2/v2-primitives";
import { useTranslations } from "@/i18n/use-translations";
import { cn } from "@/lib/utils";

const modeConfig = [
  {
    href: "/new-analysis/report",
    titleKey: "mode.report.title",
    descKey: "mode.report.desc",
    bullets: ["mode.report.b1", "mode.report.b2", "mode.report.b3"],
    icon: FileText,
    bubble: "bg-primary-rose-soft text-primary-rose",
    border: "border-primary-rose/60",
    recommended: true,
  },
  {
    href: "/new-analysis/demo",
    titleKey: "mode.demo.title",
    descKey: "mode.demo.desc",
    bullets: ["mode.demo.b1", "mode.demo.b2", "mode.demo.b3"],
    icon: GraduationCap,
    bubble: "bg-secondary-teal-soft text-secondary-teal-dark",
    border: "border-secondary-teal-soft",
    recommended: false,
  },
  {
    href: "/new-analysis/import",
    titleKey: "mode.import.title",
    descKey: "mode.import.desc",
    bullets: ["mode.import.b1", "mode.import.b2", "mode.import.b3"],
    icon: Database,
    bubble: "bg-accent-blue-soft text-accent-blue",
    border: "border-accent-blue-soft",
    recommended: false,
  },
  {
    href: "/new-analysis/advanced",
    titleKey: "mode.advanced.title",
    descKey: "mode.advanced.desc",
    bullets: ["mode.advanced.b1", "mode.advanced.b2", "mode.advanced.b3"],
    icon: SlidersHorizontal,
    bubble: "bg-violet-100 text-violet-700",
    border: "border-violet-100",
    recommended: false,
  },
];

export function AnalysisModeSelection() {
  const { t } = useTranslations();

  const [primaryMode, ...secondaryModes] = modeConfig;
  const journeySteps = [
    "mode.journey.step1",
    "mode.journey.step2",
    "mode.journey.step3",
    "mode.journey.step4",
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-2 py-10 lg:py-14">
      <section className="animate-slide-up rounded-[2rem] border border-border bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] md:p-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
              <HeartPulse className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              BreastCare <span className="text-primary-rose">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <V2LanguageSwitcher />
            <Link
              href="/"
              className="flex size-10 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground transition hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t("mode.title")}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {t("mode.subtitle")}
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Link
            href={primaryMode.href}
            className="card-hover-lift group relative overflow-hidden rounded-[1.75rem] border border-primary-rose/60 bg-white p-6 shadow-[0_18px_50px_rgba(225,29,72,0.10)] transition hover:-translate-y-1 md:p-7"
          >
            <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-full bg-primary-rose-soft/60" />
            <Badge className="relative rounded-full bg-primary-rose px-3 py-1 text-white hover:bg-primary-rose">
              {t("common.recommended")}
            </Badge>

            <div className="relative mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <V2IconBubble
                  icon={primaryMode.icon}
                  className="animate-soft-pulse bg-primary-rose-soft text-primary-rose"
                />
                <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
                  {t(primaryMode.titleKey)}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                  {t(primaryMode.descKey)}
                </p>
              </div>

              <div className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary-rose px-4 text-sm font-semibold text-white shadow-lg shadow-primary-rose/20 transition group-hover:bg-primary-rose-dark">
                {t("mode.primaryCta")}
                <ArrowRight className="size-4" />
              </div>
            </div>

            <ul className="relative mt-6 grid gap-3 sm:grid-cols-3">
              {primaryMode.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="rounded-2xl border border-primary-rose-soft bg-primary-rose-soft/30 p-3 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="mb-2 size-4 text-secondary-teal-dark" />
                  {t(bullet)}
                </li>
              ))}
            </ul>
          </Link>

          <div className="rounded-[1.75rem] border border-border bg-background p-5">
            <h2 className="text-lg font-semibold text-foreground">
              {t("mode.journey.title")}
            </h2>
            <div className="mt-5 space-y-3">
              {journeySteps.map((step, index) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary-rose shadow-sm">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    {t(step)}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 rounded-2xl border border-accent-blue-soft bg-accent-blue-soft/50 p-4 text-sm leading-6 text-muted-foreground">
              {t("mode.wdbcOptional")}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-sm font-semibold text-muted-foreground">
            {t("mode.secondaryPaths")}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {secondaryModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <Link
                  key={mode.titleKey}
                  href={mode.href}
                  className={cn(
                    "group rounded-2xl border bg-white/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md",
                    mode.border
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <V2IconBubble icon={Icon} className={mode.bubble} />
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition group-hover:border-primary-rose group-hover:text-primary-rose">
                      <ArrowRight className="size-4" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {t(mode.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {t(mode.descKey)}
                  </p>
                  {mode.href.includes("advanced") ? (
                    <Badge className="mt-4 rounded-full bg-muted px-3 py-1 text-muted-foreground hover:bg-muted">
                      {t("mode.advancedOptional")}
                    </Badge>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          <div className="rounded-2xl border border-primary-rose-soft bg-primary-rose-soft/40 p-5 text-center text-sm font-medium text-foreground">
            {t("mode.disclaimer")}
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 text-center text-sm text-muted-foreground">
            {t("mode.tip")}
          </div>
        </div>
      </section>
    </div>
  );
}
