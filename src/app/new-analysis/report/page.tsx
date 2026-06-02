"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck,
} from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { BentoCard } from "@/components/v2/bento-card";
import { ReportInputForm } from "@/components/v2/report-input-form";
import { SafetyNotice } from "@/components/v2/safety-notice";
import { useTranslations } from "@/i18n/use-translations";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReportInputPage() {
  const { t } = useTranslations();
  const doesItems = [
    "report.receive.1",
    "report.receive.2",
    "report.receive.3",
  ];

  return (
    <PageShell>
      <section className="mx-auto w-full max-w-7xl px-2 py-10 lg:py-14">
        <div className="mb-8 flex justify-end">
          <Link
            href="/new-analysis"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-xl border-border bg-white px-4"
            )}
          >
            <ArrowLeft className="mr-2 size-4" />
            {t("common.backModes")}
          </Link>
        </div>

        <div className="animate-slide-up">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {t("report.title")}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("report.subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-6 rounded-[2rem] border border-border bg-white p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[minmax(0,1fr)_20rem] lg:p-6">
          <div className="animate-slide-up">
            <ReportInputForm />
          </div>

          <aside className="space-y-5">
            <BentoCard className="rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-blue-soft text-accent-blue">
                <FileText className="size-5" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                {t("report.receive")}
              </h2>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              {doesItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary-teal-dark" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </BentoCard>

            <BentoCard className="rounded-2xl border-accent-blue-soft bg-accent-blue-soft/30">
              <div className="flex gap-3">
                <FileText className="mt-0.5 size-5 shrink-0 text-accent-blue" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {t("report.sparseHelper")}
                </p>
              </div>
            </BentoCard>

            <BentoCard className="rounded-2xl border-secondary-teal-soft bg-secondary-teal-soft/30">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-secondary-teal-dark" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {t("report.bottomNote")}
                </p>
              </div>
            </BentoCard>

            <SafetyNotice />
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
