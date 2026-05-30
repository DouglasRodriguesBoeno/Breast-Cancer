"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { analyzeReport } from "@/services/report-intelligence-service";
import type { ReportLanguage, ReportType } from "@/types/report-intelligence";
import {
  REPORT_LANGUAGE_LABELS,
  REPORT_TYPE_LABELS,
} from "@/types/report-intelligence";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const languages: ReportLanguage[] = ["pt-BR", "en", "es"];
const reportTypes: ReportType[] = [
  "MAMMOGRAPHY",
  "ULTRASOUND",
  "MRI",
  "BIOPSY",
  "UNKNOWN",
];

export function ReportInputForm() {
  const router = useRouter();
  const [reportText, setReportText] = useState("");
  const [outputLanguage, setOutputLanguage] =
    useState<ReportLanguage>("pt-BR");
  const [reportType, setReportType] = useState<ReportType>("MAMMOGRAPHY");
  const [acknowledged, setAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => reportText.trim().length > 0 && acknowledged && !isSubmitting,
    [acknowledged, isSubmitting, reportText]
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const response = await analyzeReport({
        inputType: "TEXT",
        targetLanguage: outputLanguage,
        reportType,
        reportText,
        persistRawText: false,
      });

      router.push(`/reports/${response.id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit the report analysis."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-white p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="report-text"
          className="text-sm font-semibold text-foreground"
        >
          Report text
        </label>

        <textarea
          id="report-text"
          value={reportText}
          onChange={(event) => setReportText(event.target.value)}
          placeholder="Paste the breast exam report text here..."
          className="mt-3 min-h-72 w-full resize-y rounded-xl border border-border bg-white p-4 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">
          Output language
          <select
            value={outputLanguage}
            onChange={(event) =>
              setOutputLanguage(event.target.value as ReportLanguage)
            }
            className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {REPORT_LANGUAGE_LABELS[language]}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-foreground">
          Report type
          <select
            value={reportType}
            onChange={(event) => setReportType(event.target.value as ReportType)}
            className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
          >
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {REPORT_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 flex gap-3 rounded-xl border border-border bg-background p-4 text-sm leading-6 text-muted-foreground">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(event) => setAcknowledged(event.target.checked)}
          className="mt-1 size-4 rounded border-border accent-primary-rose"
        />
        <span>
          I understand this is educational and not a medical diagnosis.
        </span>
      </label>

      {errorMessage ? (
        <div className="mt-5 flex gap-3 rounded-xl border border-risk-medium-soft bg-risk-medium-soft p-4 text-sm leading-6 text-risk-medium">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      ) : (
        <div className="mt-5 flex gap-3 rounded-xl border border-secondary-teal-soft bg-secondary-teal-soft p-4 text-sm leading-6 text-secondary-teal-dark">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <span>
            The system will structure the report for educational explanation and
            will not invent missing WDBC features.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          buttonVariants(),
          "mt-6 h-12 w-full rounded-xl bg-primary-rose text-base font-semibold text-white hover:bg-primary-rose-dark"
        )}
      >
        {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        Analyze report
      </button>
    </form>
  );
}
