"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  CheckCircle2,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import {
  predictionSamples,
  type PredictionSampleId,
} from "@/data/prediction-samples";
import { createPrediction } from "@/services/prediction-service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Scenario = {
  id: PredictionSampleId;
  title: string;
  description: string;
  badge: string;
  probability: string;
  icon: LucideIcon;
  iconClassName: string;
  borderClassName: string;
};

const scenarios: Scenario[] = [
  {
    id: "benign",
    title: "Benign sample",
    description:
      "Lower measurements with a pattern compatible with benign examples from the educational dataset.",
    badge: "Low risk pattern",
    probability: "12.4%",
    icon: ShieldCheck,
    iconClassName: "bg-risk-low-soft text-risk-low",
    borderClassName: "border-risk-low/30",
  },
  {
    id: "intermediate",
    title: "Intermediate sample",
    description:
      "Mixed values that help demonstrate how the model behaves close to the decision threshold.",
    badge: "Mixed pattern",
    probability: "41.8%",
    icon: Activity,
    iconClassName: "bg-risk-medium-soft text-risk-medium",
    borderClassName: "border-risk-medium/30",
  },
  {
    id: "malignant",
    title: "Malignant sample",
    description:
      "Higher measurements with a pattern compatible with malignant examples from the educational dataset.",
    badge: "High risk pattern",
    probability: "97.3%",
    icon: HeartPulse,
    iconClassName: "bg-risk-high-soft text-risk-high",
    borderClassName: "border-risk-high/30",
  },
];

export function ScenarioSelector() {
  const router = useRouter();

  const [selectedScenario, setSelectedScenario] =
    useState<PredictionSampleId>("benign");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selected =
    scenarios.find((scenario) => scenario.id === selectedScenario) ??
    scenarios[0];

  async function handleRunAnalysis() {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const response = await createPrediction({
        features: predictionSamples[selectedScenario],
      });

      router.push(`/analysis/${response.id}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to run the selected analysis."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = selectedScenario === scenario.id;

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setSelectedScenario(scenario.id)}
              className="text-left"
            >
              <Card
                className={cn(
                  "h-full rounded-3xl border bg-card/95 p-2 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl",
                  isSelected
                    ? `${scenario.borderClassName} ring-2 ring-primary-rose/20`
                    : "border-border"
                )}
              >
                <CardHeader className="px-5 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={cn(
                        "flex size-12 items-center justify-center rounded-2xl",
                        scenario.iconClassName
                      )}
                    >
                      <Icon className="size-5" />
                    </div>

                    {isSelected ? (
                      <CheckCircle2 className="size-5 text-primary-rose" />
                    ) : null}
                  </div>

                  <CardTitle className="mt-4 text-xl font-semibold">
                    {scenario.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <Badge className="rounded-xl bg-muted px-3 py-1 text-muted-foreground hover:bg-muted">
                    {scenario.badge}
                  </Badge>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {scenario.description}
                  </p>

                  <div className="mt-6 rounded-2xl bg-muted p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Preview malignant probability
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">
                      {scenario.probability}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </button>
          );
        })}
      </div>

      <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
        <CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="rounded-xl bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
              Selected scenario
            </Badge>

            <h3 className="mt-3 text-2xl font-semibold text-foreground">
              {selected.title}
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              The selected sample will be sent to the Spring Boot API, which
              calls the ML service, persists the prediction and returns the
              analysis identifier.
            </p>

            {errorMessage ? (
              <p className="mt-4 rounded-2xl border border-risk-high-soft bg-risk-high-soft px-4 py-3 text-sm font-medium text-risk-high">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleRunAnalysis}
            className="h-14 rounded-2xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 hover:bg-primary-rose-dark disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Brain className="mr-2 size-5" />
            {isSubmitting ? "Running analysis..." : "Run analysis"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}