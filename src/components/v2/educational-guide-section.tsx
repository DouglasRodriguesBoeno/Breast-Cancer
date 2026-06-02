"use client";

import {
  BookOpenText,
  CheckCircle2,
  HelpCircle,
  ListChecks,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { BentoCard } from "@/components/v2/bento-card";
import { buildEducationalGuide, type EducationalGuideItem } from "@/lib/educational-guide";
import type { ReportAnalysis } from "@/types/report-intelligence";
import { useTranslations } from "@/i18n/use-translations";

function GuideList({
  items,
  variant = "default",
}: {
  items: EducationalGuideItem[];
  variant?: "default" | "soft";
}) {
  return (
    <div className="mt-5 grid gap-3">
      {items.map((item) => (
        <div
          key={`${item.title}-${item.description ?? ""}`}
          className={
            variant === "soft"
              ? "rounded-2xl border border-secondary-teal-soft bg-secondary-teal-soft/35 p-4"
              : "rounded-2xl border border-border bg-background p-4"
          }
        >
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary-teal-dark" />
            <div>
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              {item.description ? (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function EducationalGuideSection({ report }: { report: ReportAnalysis }) {
  const { locale } = useTranslations();
  const guide = buildEducationalGuide(report, locale);

  return (
    <section className="mt-5 rounded-[2rem] border border-border bg-white p-5 shadow-sm md:p-7">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-rose">
                BreastCare Guide
              </p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
                {guide.title}
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            {guide.subtitle}
          </p>
        </div>

        <div className="rounded-2xl border border-primary-rose-soft bg-primary-rose-soft/40 p-4 text-sm leading-6 text-foreground md:max-w-sm">
          <ShieldCheck className="mb-2 size-5 text-primary-rose" />
          {guide.disclaimer}
        </div>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <BentoCard className="rounded-[1.5rem]">
          <div className="flex items-center gap-3">
            <ListChecks className="size-5 text-secondary-teal-dark" />
            <h3 className="text-xl font-semibold text-foreground">
              {guide.informedTitle}
            </h3>
          </div>
          <GuideList items={guide.informed} variant="soft" />
        </BentoCard>

        <BentoCard className="rounded-[1.5rem]">
          <div className="flex items-center gap-3">
            <HelpCircle className="size-5 text-accent-blue" />
            <h3 className="text-xl font-semibold text-foreground">
              {guide.missingTitle}
            </h3>
          </div>
          <GuideList items={guide.missing} />
        </BentoCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <BentoCard className="rounded-[1.5rem] border-risk-medium-soft bg-risk-medium-soft/45">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-risk-medium" />
            <h3 className="text-xl font-semibold text-foreground">
              {guide.cannotConcludeTitle}
            </h3>
          </div>
          <GuideList items={guide.cannotConclude} />
        </BentoCard>

        <BentoCard className="rounded-[1.5rem]">
          <div className="flex items-center gap-3">
            <HelpCircle className="size-5 text-primary-rose" />
            <h3 className="text-xl font-semibold text-foreground">
              {guide.questionsTitle}
            </h3>
          </div>
          <GuideList items={guide.questions} />
        </BentoCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <BentoCard className="rounded-[1.5rem]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5 text-secondary-teal-dark" />
            <h3 className="text-xl font-semibold text-foreground">
              {guide.preventionTitle}
            </h3>
          </div>
          <GuideList items={guide.prevention} />
        </BentoCard>

        <BentoCard className="rounded-[1.5rem]">
          <div className="flex items-center gap-3">
            <BookOpenText className="size-5 text-accent-blue" />
            <h3 className="text-xl font-semibold text-foreground">
              {guide.glossaryTitle}
            </h3>
          </div>
          <GuideList items={guide.glossary} />
        </BentoCard>
      </div>
    </section>
  );
}
