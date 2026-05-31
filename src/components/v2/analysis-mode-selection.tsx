"use client";

import Link from "next/link";
import {
  ArrowRight,
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

        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {modeConfig.map((mode, index) => {
            const Icon = mode.icon;

            return (
              <Link
                key={mode.titleKey}
                href={mode.href}
                style={{ animationDelay: `${index * 90}ms` }}
                className={cn(
                  "card-hover-lift animate-slide-up group relative rounded-2xl border bg-white p-6",
                  mode.border
                )}
              >
                {mode.recommended ? (
                  <Badge className="absolute right-5 top-5 rounded-full bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                    {t("common.recommended")}
                  </Badge>
                ) : null}

                <V2IconBubble
                  icon={Icon}
                  className={cn(mode.bubble, mode.recommended && "animate-soft-pulse")}
                />

                <div className="mt-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-primary-rose">
                      {index + 1}.
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-foreground">
                      {t(mode.titleKey)}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {t(mode.descKey)}
                    </p>
                  </div>

                  <div className="mt-2 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border text-primary-rose transition group-hover:border-primary-rose group-hover:bg-primary-rose group-hover:text-white">
                    <ArrowRight className="size-4" />
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {mode.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="size-1.5 rounded-full bg-secondary-teal-dark" />
                      {t(bullet)}
                    </li>
                  ))}
                </ul>
              </Link>
            );
          })}
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
