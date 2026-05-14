"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Brain,
  Calculator,
  CheckCircle2,
  HeartPulse,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import {
  predictionSamples,
  type PredictionSampleId,
} from "@/data/prediction-samples";
import { createPrediction } from "@/services/prediction-service";
import type { PredictionFeatures } from "@/types/prediction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

type FeatureGroup = {
  title: string;
  description: string;
  features: string[];
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

const featureGroups: FeatureGroup[] = [
  {
    title: "Mean features",
    description:
      "Average values extracted from the cell nuclei measurements.",
    features: [
      "radius_mean",
      "texture_mean",
      "perimeter_mean",
      "area_mean",
      "smoothness_mean",
      "compactness_mean",
      "concavity_mean",
      "concave_points_mean",
      "symmetry_mean",
      "fractal_dimension_mean",
    ],
  },
  {
    title: "Standard error features",
    description:
      "Variation measurements related to each nucleus characteristic.",
    features: [
      "radius_se",
      "texture_se",
      "perimeter_se",
      "area_se",
      "smoothness_se",
      "compactness_se",
      "concavity_se",
      "concave_points_se",
      "symmetry_se",
      "fractal_dimension_se",
    ],
  },
  {
    title: "Worst features",
    description:
      "Largest or most severe values observed for each characteristic.",
    features: [
      "radius_worst",
      "texture_worst",
      "perimeter_worst",
      "area_worst",
      "smoothness_worst",
      "compactness_worst",
      "concavity_worst",
      "concave_points_worst",
      "symmetry_worst",
      "fractal_dimension_worst",
    ],
  },
];

function toEditableValues(features: PredictionFeatures) {
  return Object.fromEntries(
    Object.entries(features).map(([key, value]) => [key, String(value)])
  ) as Record<string, string>;
}

function toPredictionFeatures(values: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, Number(value)])
  ) as PredictionFeatures;
}

function getInvalidFeatures(values: Record<string, string>) {
  return Object.entries(values)
    .filter(([, value]) => value.trim() === "" || !Number.isFinite(Number(value)))
    .map(([key]) => key);
}

export function ScenarioSelector() {
  const router = useRouter();

  const [selectedScenario, setSelectedScenario] =
    useState<PredictionSampleId>("benign");

  const [featureValues, setFeatureValues] = useState<Record<string, string>>(
    () => toEditableValues(predictionSamples.benign)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selected =
    scenarios.find((scenario) => scenario.id === selectedScenario) ??
    scenarios[0];

  const invalidFeatures = useMemo(
    () => getInvalidFeatures(featureValues),
    [featureValues]
  );

  const filledFeatureCount = useMemo(
    () =>
      Object.values(featureValues).filter(
        (value) => value.trim() !== "" && Number.isFinite(Number(value))
      ).length,
    [featureValues]
  );

  function handleSelectScenario(scenarioId: PredictionSampleId) {
    setSelectedScenario(scenarioId);
    setFeatureValues(toEditableValues(predictionSamples[scenarioId]));
    setErrorMessage(null);
  }

  function handleResetScenarioValues() {
    setFeatureValues(toEditableValues(predictionSamples[selectedScenario]));
    setErrorMessage(null);
  }

  function handleFeatureChange(feature: string, value: string) {
    setFeatureValues((currentValues) => ({
      ...currentValues,
      [feature]: value,
    }));
  }

  async function handleRunAnalysis() {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const invalid = getInvalidFeatures(featureValues);

      if (invalid.length > 0) {
        setErrorMessage(
          `Please review the following numeric fields: ${invalid
            .slice(0, 5)
            .join(", ")}${invalid.length > 5 ? "..." : ""}`
        );
        return;
      }

      const response = await createPrediction({
        features: toPredictionFeatures(featureValues),
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
              onClick={() => handleSelectScenario(scenario.id)}
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
              The selected sample pre-fills all 30 model features. You can keep
              the guided values or adjust them manually in the advanced editor
              below before running the analysis.
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

      <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-sm">
        <CardHeader className="px-6 pt-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <SlidersHorizontal className="size-6 text-primary-rose" />
                Advanced feature editor
              </CardTitle>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                Edit the 30 numeric features used by the model. Values are
                grouped using the WDBC structure: mean, standard error and worst
                measurements.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-2xl bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
                {filledFeatureCount}/30 valid fields
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleResetScenarioValues}
                className="h-11 rounded-2xl border-border bg-white px-4"
              >
                <RotateCcw className="mr-2 size-4" />
                Reset sample
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <Accordion className="rounded-3xl border border-border bg-white/70 px-4">
            {featureGroups.map((group) => (
              <AccordionItem key={group.title} value={group.title}>
                <AccordionTrigger>{group.title}</AccordionTrigger>

                <AccordionContent>
                  <p className="mb-5 text-sm leading-6 text-muted-foreground">
                    {group.description}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {group.features.map((feature) => {
                      const hasError = invalidFeatures.includes(feature);

                      return (
                        <label key={feature} className="block">
                          <span className="text-xs font-medium text-muted-foreground">
                            {feature}
                          </span>

                          <input
                            type="number"
                            step="any"
                            value={featureValues[feature] ?? ""}
                            onChange={(event) =>
                              handleFeatureChange(feature, event.target.value)
                            }
                            className={cn(
                              "mt-2 h-11 w-full rounded-2xl border bg-white px-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary-rose focus:ring-4 focus:ring-primary-rose/10",
                              hasError
                                ? "border-risk-high bg-risk-high-soft/30"
                                : "border-border"
                            )}
                          />

                          {hasError ? (
                            <span className="mt-1 block text-xs font-medium text-risk-high">
                              Enter a valid number.
                            </span>
                          ) : null}
                        </label>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 flex items-start gap-3 rounded-3xl border border-secondary-teal-soft bg-secondary-teal-soft/35 p-5 text-sm leading-6 text-muted-foreground">
            <Calculator className="mt-0.5 size-5 shrink-0 text-secondary-teal-dark" />
            <p>
              These values are sent as a structured feature payload to the
              Spring Boot API. The backend calls the ML service, persists the
              result and returns the analysis identifier.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}