"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Brain,
  Calendar,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
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

function toPercent(value: number) {
  return value <= 1 ? value * 100 : value;
}

function formatPercent(value: number) {
  return `${toPercent(value).toFixed(1)}%`;
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
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <CardHeader className="px-6 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge
                className={`rounded-xl px-3 py-1 hover:opacity-90 ${getRiskClassName(
                  prediction.risk_band
                )}`}
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
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
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
              <p className="mt-1">{prediction.model_type}</p>
            </div>

            <div className="rounded-2xl bg-muted p-4">
              <p className="font-medium text-foreground">Input quality</p>
              <p className="mt-1">{prediction.input_quality_note}</p>
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

        <div className="flex items-center gap-3 rounded-3xl border border-border bg-white/75 p-5 text-sm text-muted-foreground shadow-sm">
          <Calendar className="size-5 text-primary-rose" />
          Created at {new Date(prediction.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  );
}