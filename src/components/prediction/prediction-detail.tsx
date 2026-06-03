"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle2,
  FileWarning,
  Gauge,
  HeartPulse,
  Info,
  ListChecks,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useTranslations } from "@/i18n/use-translations";
import { getPredictionById } from "@/services/prediction-service";
import type { PredictionResponse } from "@/types/prediction";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function toPercent(value: number) {
  return value <= 1 ? value * 100 : value;
}

function formatPercent(value: number) {
  return `${toPercent(value).toFixed(1)}%`;
}

function formatDate(value: string, locale: string) {
  return new Date(value).toLocaleString(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatFeatureLabel(feature: string) {
  return feature.replaceAll("_", " ");
}

function getRiskClassName(riskBand: string) {
  const normalized = riskBand.toLowerCase();

  if (normalized.includes("high") || normalized.includes("alto")) {
    return "bg-risk-high-soft text-risk-high";
  }

  if (normalized.includes("medium") || normalized.includes("intermediate")) {
    return "bg-risk-medium-soft text-risk-medium";
  }

  return "bg-risk-low-soft text-risk-low";
}

function getRiskDescriptionKey(riskBand: string) {
  const normalized = riskBand.toLowerCase();

  if (normalized.includes("high") || normalized.includes("alto")) {
    return "prediction.risk.high";
  }

  if (normalized.includes("medium") || normalized.includes("intermediate")) {
    return "prediction.risk.medium";
  }

  return "prediction.risk.low";
}

function getRiskBandKey(riskBand: string) {
  const normalized = riskBand.toLowerCase();

  if (normalized.includes("high") || normalized.includes("alto")) {
    return "prediction.riskBand.high";
  }

  if (normalized.includes("medium") || normalized.includes("intermediate")) {
    return "prediction.riskBand.medium";
  }

  return "prediction.riskBand.low";
}

function getPatternKey(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("malignant") || normalized.includes("maligno")) {
    return "prediction.pattern.malignant";
  }

  if (normalized.includes("benign") || normalized.includes("benigno")) {
    return "prediction.pattern.benign";
  }

  return "prediction.pattern.dataset";
}

function MetricCard({
  label,
  value,
  description,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className={cn("mt-3 text-3xl font-semibold", className)}>
              {value}
            </p>
          </div>

          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
            <Icon className="size-6" />
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function FeatureListCard({
  title,
  description,
  items,
  emptyMessage,
  icon: Icon,
  variant = "default",
}: {
  title: string;
  description: string;
  items: string[];
  emptyMessage: string;
  icon: LucideIcon;
  variant?: "default" | "warning" | "success";
}) {
  const iconClassName = {
    default: "bg-primary-rose-soft text-primary-rose",
    warning: "bg-risk-medium-soft text-risk-medium",
    success: "bg-secondary-teal-soft text-secondary-teal-dark",
  }[variant];

  return (
    <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
      <CardHeader className="px-5 pt-5">
        <CardTitle className="flex items-center gap-3 text-xl">
          <span
            className={cn(
              "flex size-10 items-center justify-center rounded-2xl",
              iconClassName
            )}
          >
            <Icon className="size-5" />
          </span>
          {title}
        </CardTitle>

        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        {items.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Badge
                key={item}
                className="rounded-xl bg-muted px-3 py-1 text-muted-foreground hover:bg-muted"
              >
                {formatFeatureLabel(item)}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-muted p-4 text-sm leading-6 text-muted-foreground">
            {emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function PredictionDetail({ id }: { id: string }) {
  const { locale, t } = useTranslations();
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrediction() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getPredictionById(id);
        setPrediction(response);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : t("prediction.error.loadDetail")
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadPrediction();
  }, [id]);

  const malignantPercent = useMemo(() => {
    if (!prediction) {
      return 0;
    }

    return toPercent(prediction.probability_malignant);
  }, [prediction]);

  const thresholdPercent = useMemo(() => {
    if (!prediction) {
      return 0;
    }

    return toPercent(prediction.used_threshold_malignant);
  }, [prediction]);

  if (isLoading) {
    return (
      <Card className="rounded-3xl border-border bg-card/95 p-8 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">
          {t("prediction.loading")}
        </p>
      </Card>
    );
  }

  if (errorMessage || !prediction) {
    return (
      <Card className="rounded-3xl border-risk-high-soft bg-risk-high-soft/50 p-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="size-6 text-risk-high" />

          <div>
            <h2 className="text-xl font-semibold text-risk-high">
              {t("prediction.error.title")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-risk-high">
              {errorMessage}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <CardHeader className="px-6 pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <Badge
                  className={cn(
                    "rounded-xl px-3 py-1 hover:opacity-90",
                    getRiskClassName(prediction.risk_band)
                  )}
                >
                  {t(getRiskBandKey(prediction.risk_band))}
                </Badge>

                <CardTitle className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                  {t("prediction.hero.compatibleWith")}{" "}
                  {t(getPatternKey(prediction.predicted_label_name))}
                </CardTitle>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {prediction.summary}
                </p>
              </div>

              <div className="flex size-16 shrink-0 items-center justify-center rounded-3xl bg-primary-rose-soft text-primary-rose">
                <HeartPulse className="size-8" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <div className="mt-6">
              <p className="text-sm font-medium text-muted-foreground">
                {t("prediction.probability.malignant")}
              </p>

              <p className="mt-2 text-6xl font-semibold tracking-tight text-primary-rose">
                {formatPercent(prediction.probability_malignant)}
              </p>

              <Progress
                value={malignantPercent}
                className="mt-6 h-3 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-primary-rose"
              />

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {t("prediction.probability.benignShort")}:{" "}
                  {formatPercent(prediction.probability_benign)}
                </span>
                <span>
                  {t("prediction.threshold.short")}:{" "}
                  {formatPercent(prediction.used_threshold_malignant)}
                </span>
              </div>

              <div className="mt-6 rounded-3xl border border-border bg-muted p-5">
                <div className="flex items-start gap-3">
                  <Gauge className="mt-0.5 size-5 shrink-0 text-primary-rose" />

                  <div>
                    <p className="font-medium text-foreground">
                      {t("prediction.threshold.interpretation")}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t(getRiskDescriptionKey(prediction.risk_band))}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>0%</span>
                    <span>{t("prediction.threshold.decision")}</span>
                    <span>100%</span>
                  </div>

                  <div className="relative h-3 rounded-full bg-slate-200">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-primary-rose"
                      style={{ width: `${malignantPercent}%` }}
                    />

                    <div
                      className="absolute top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-foreground"
                      style={{ left: `${thresholdPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <MetricCard
            label={t("prediction.probability.benign")}
            value={formatPercent(prediction.probability_benign)}
            description={t("prediction.probability.benignDescription")}
            icon={ShieldCheck}
            className="text-secondary-teal-dark"
          />

          <MetricCard
            label={t("prediction.threshold.title")}
            value={formatPercent(prediction.used_threshold_malignant)}
            description={t("prediction.threshold.description")}
            icon={Gauge}
            className="text-foreground"
          />

          <div className="flex items-center gap-3 rounded-3xl border border-border bg-white/75 p-5 text-sm text-muted-foreground shadow-sm">
            <Calendar className="size-5 text-primary-rose" />
            {t("prediction.createdAt")} {formatDate(prediction.created_at, locale)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Brain className="size-5 text-primary-rose" />
              {t("prediction.modelInfo.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-5 pb-5 text-sm leading-6 text-muted-foreground">
            <div className="rounded-2xl bg-muted p-4">
              <p className="font-medium text-foreground">
                {t("prediction.modelInfo.type")}
              </p>
              <p className="mt-1 break-words">{prediction.model_type}</p>
            </div>

            <div className="rounded-2xl bg-muted p-4">
              <p className="font-medium text-foreground">
                {t("prediction.modelInfo.label")}
              </p>
              <p className="mt-1">
                {prediction.predicted_label} -{" "}
                {t(getPatternKey(prediction.predicted_label_name))}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="flex items-center gap-3 text-xl">
              <CheckCircle2 className="size-5 text-secondary-teal-dark" />
              {t("prediction.confidence.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-5 pb-5">
            <p className="text-sm leading-6 text-muted-foreground">
              {prediction.confidence_note}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Info className="size-5 text-primary-rose" />
              {t("prediction.inputQuality.title")}
            </CardTitle>
          </CardHeader>

          <CardContent className="px-5 pb-5">
            <p className="text-sm leading-6 text-muted-foreground">
              {prediction.input_quality_note}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FeatureListCard
          title={t("prediction.features.used.title")}
          description={t("prediction.features.used.description")}
          items={prediction.used_features}
          emptyMessage={t("prediction.features.used.empty")}
          icon={ListChecks}
          variant="success"
        />

        <FeatureListCard
          title={t("prediction.features.imputed.title")}
          description={t("prediction.features.imputed.description")}
          items={prediction.imputed_features}
          emptyMessage={t("prediction.features.imputed.empty")}
          icon={Sparkles}
          variant="default"
        />

        <FeatureListCard
          title={t("prediction.features.ignored.title")}
          description={t("prediction.features.ignored.description")}
          items={prediction.ignored_features}
          emptyMessage={t("prediction.features.ignored.empty")}
          icon={FileWarning}
          variant="warning"
        />

        <FeatureListCard
          title={t("prediction.features.warnings.title")}
          description={t("prediction.features.warnings.description")}
          items={prediction.warnings}
          emptyMessage={t("prediction.features.warnings.empty")}
          icon={ShieldAlert}
          variant="warning"
        />
      </div>

      <Card className="rounded-3xl border-primary-rose-soft bg-primary-rose-soft/30 p-2 shadow-sm">
        <CardHeader className="px-5 pt-5">
          <CardTitle className="flex items-center gap-3 text-xl">
            <ShieldCheck className="size-5 text-primary-rose" />
            {t("prediction.educationalWarning.title")}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-5">
          <p className="text-sm leading-6 text-muted-foreground">
            {prediction.clinical_note}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
