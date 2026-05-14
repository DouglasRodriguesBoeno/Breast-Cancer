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

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
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

function getRiskDescription(riskBand: string) {
  const normalized = riskBand.toLowerCase();

  if (normalized.includes("high") || normalized.includes("alto")) {
    return "The model output is above the malignant threshold and is more compatible with a malignant pattern.";
  }

  if (normalized.includes("medium") || normalized.includes("intermediate")) {
    return "The model output is close to the decision region and should be interpreted with extra caution.";
  }

  return "The model output is below the malignant threshold and is more compatible with a benign pattern.";
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
            : "Unable to load prediction detail."
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
          Loading prediction detail...
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
              Unable to load analysis
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
                  {prediction.risk_band}
                </Badge>

                <CardTitle className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
                  Compatible with {prediction.predicted_label_name} pattern
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
                Malignant probability
              </p>

              <p className="mt-2 text-6xl font-semibold tracking-tight text-primary-rose">
                {formatPercent(prediction.probability_malignant)}
              </p>

              <Progress
                value={malignantPercent}
                className="mt-6 h-3 bg-slate-200 [&_[data-slot=progress-indicator]]:bg-primary-rose"
              />

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Benign: {formatPercent(prediction.probability_benign)}</span>
                <span>
                  Threshold: {formatPercent(prediction.used_threshold_malignant)}
                </span>
              </div>

              <div className="mt-6 rounded-3xl border border-border bg-muted p-5">
                <div className="flex items-start gap-3">
                  <Gauge className="mt-0.5 size-5 shrink-0 text-primary-rose" />

                  <div>
                    <p className="font-medium text-foreground">
                      Threshold interpretation
                    </p>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {getRiskDescription(prediction.risk_band)}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>0%</span>
                    <span>Decision threshold</span>
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
            label="Benign probability"
            value={formatPercent(prediction.probability_benign)}
            description="Estimated probability for the benign pattern according to the model output."
            icon={ShieldCheck}
            className="text-secondary-teal-dark"
          />

          <MetricCard
            label="Decision threshold"
            value={formatPercent(prediction.used_threshold_malignant)}
            description="Configured malignant threshold used to select the final predicted label."
            icon={Gauge}
            className="text-foreground"
          />

          <div className="flex items-center gap-3 rounded-3xl border border-border bg-white/75 p-5 text-sm text-muted-foreground shadow-sm">
            <Calendar className="size-5 text-primary-rose" />
            Created at {formatDate(prediction.created_at)}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Brain className="size-5 text-primary-rose" />
              Model information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-5 pb-5 text-sm leading-6 text-muted-foreground">
            <div className="rounded-2xl bg-muted p-4">
              <p className="font-medium text-foreground">Model type</p>
              <p className="mt-1 break-words">{prediction.model_type}</p>
            </div>

            <div className="rounded-2xl bg-muted p-4">
              <p className="font-medium text-foreground">Predicted label</p>
              <p className="mt-1">
                {prediction.predicted_label} — {prediction.predicted_label_name}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-5 pt-5">
            <CardTitle className="flex items-center gap-3 text-xl">
              <CheckCircle2 className="size-5 text-secondary-teal-dark" />
              Confidence note
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
              Input quality
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
          title="Used features"
          description="Features that were accepted and used by the model during this prediction."
          items={prediction.used_features}
          emptyMessage="No used features were returned by the API."
          icon={ListChecks}
          variant="success"
        />

        <FeatureListCard
          title="Imputed features"
          description="Features that needed fallback or imputation before the prediction."
          items={prediction.imputed_features}
          emptyMessage="No features were imputed for this analysis."
          icon={Sparkles}
          variant="default"
        />

        <FeatureListCard
          title="Ignored features"
          description="Features that were not used by the model or were ignored during preprocessing."
          items={prediction.ignored_features}
          emptyMessage="No features were ignored for this analysis."
          icon={FileWarning}
          variant="warning"
        />

        <FeatureListCard
          title="Warnings"
          description="Safety or model-related warnings returned by the prediction service."
          items={prediction.warnings}
          emptyMessage="No warnings were returned for this analysis."
          icon={ShieldAlert}
          variant="warning"
        />
      </div>

      <Card className="rounded-3xl border-primary-rose-soft bg-primary-rose-soft/30 p-2 shadow-sm">
        <CardHeader className="px-5 pt-5">
          <CardTitle className="flex items-center gap-3 text-xl">
            <ShieldCheck className="size-5 text-primary-rose" />
            Educational warning
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