"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Languages,
  Loader2,
  Upload,
} from "lucide-react";

import { analyzeReport } from "@/services/report-intelligence-service";
import type { ReportLanguage, ReportType } from "@/types/report-intelligence";
import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "@/i18n/use-translations";
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
  const { locale, t } = useTranslations();
  const [reportText, setReportText] = useState("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<ReportLanguage | null>(null);
  const [reportType, setReportType] = useState<ReportType>("MAMMOGRAPHY");
  const [acknowledged, setAcknowledged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => reportText.trim().length > 0 && acknowledged && !isSubmitting,
    [acknowledged, isSubmitting, reportText]
  );

  const outputLanguage = selectedLanguage ?? locale;

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
          : t("common.error")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-border bg-white p-5 shadow-sm md:p-7"
    >
      <div className="mb-6 flex items-start gap-4 rounded-2xl border border-accent-blue-soft bg-accent-blue-soft/70 p-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-accent-blue">
          <FileText className="size-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {t("report.panelTitle")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {t("report.subtitle")}
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="report-text"
          className="text-sm font-semibold text-foreground"
        >
          {t("report.textLabel")}
        </label>

        <textarea
          id="report-text"
          value={reportText}
          onChange={(event) => setReportText(event.target.value)}
          placeholder={t("report.placeholder")}
          className="mt-3 min-h-72 w-full resize-y rounded-xl border border-border bg-white p-4 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft focus:shadow-[0_0_0_6px_rgba(225,29,72,0.08)]"
        />
        <p className="mt-2 text-right text-xs font-medium text-muted-foreground">
          {reportText.length.toLocaleString()} / 50.000 {t("report.count")}
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-dashed border-border bg-background p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary-rose-soft text-primary-rose">
            <Upload className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {t("report.upload")}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {t("report.uploadSoon")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-foreground">
          {t("report.language")}
          <select
            value={outputLanguage}
            onChange={(event) =>
              setSelectedLanguage(event.target.value as ReportLanguage)
            }
            className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
          >
            {languages.map((language) => (
              <option key={language} value={language}>
                {t(`report.language.${language}`)}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-foreground">
          {t("report.type")}
          <select
            value={reportType}
            onChange={(event) => setReportType(event.target.value as ReportType)}
            className="mt-2 h-12 w-full rounded-xl border border-border bg-white px-4 text-sm font-medium text-foreground outline-none focus:border-primary-rose focus:ring-4 focus:ring-primary-rose-soft"
          >
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {t(`report.type.${type}`)}
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
          {t("report.ack")}
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
            {t("mode.report.b3")}
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
        {t("report.submit")}
      </button>

      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Languages className="size-4 text-accent-blue" />
        {t("home.feature.multi")}
      </div>
    </form>
  );
}
