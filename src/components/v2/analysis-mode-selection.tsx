import { Database, FileText, GraduationCap, SlidersHorizontal } from "lucide-react";

import { ModeSelectionCard } from "@/components/v2/mode-selection-card";
import { SafetyNotice } from "@/components/v2/safety-notice";

const modes = [
  {
    href: "/new-analysis/report",
    title: "Analyze medical report",
    description:
      "Paste or upload a breast report and receive a structured educational explanation.",
    cta: "Start with report",
    icon: FileText,
    recommended: true,
    bullets: [
      "Extract key findings",
      "Identify BI-RADS when mentioned",
      "Explain terms in simple language",
      "Check WDBC compatibility",
    ],
  },
  {
    href: "/new-analysis/report",
    title: "Educational demo",
    description: "Use guided examples to understand how the model works.",
    cta: "Explore demo path",
    icon: GraduationCap,
  },
  {
    href: "/new-analysis/report",
    title: "Import structured data",
    description: "Upload WDBC-compatible CSV or JSON data.",
    cta: "Prepare import",
    icon: Database,
  },
  {
    href: "/new-analysis/advanced",
    title: "Advanced manual input",
    description: "Manually fill all 30 model features.",
    cta: "Open advanced flow",
    icon: SlidersHorizontal,
  },
];

export function AnalysisModeSelection() {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 py-12 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary-rose">
            New analysis
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            How would you like to start?
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Choose a guided path. You can analyze a report, explore educational
            examples or use structured WDBC data.
          </p>
        </div>

        <div className="lg:max-w-md">
          <SafetyNotice />
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {modes.map((mode) => (
          <ModeSelectionCard key={mode.title} {...mode} />
        ))}
      </div>
    </div>
  );
}
