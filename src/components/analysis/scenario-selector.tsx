"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Brain,
  Calculator,
  CheckCircle2,
  Eye,
  HeartPulse,
  ListChecks,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import {
  predictionSamples,
  type PredictionSampleId,
} from "@/data/prediction-samples";
import { useTranslations } from "@/i18n/use-translations";
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
  titleKey: string;
  descriptionKey: string;
  badgeKey: string;
  probability: string;
  icon: LucideIcon;
  iconClassName: string;
  borderClassName: string;
};

type FeatureGroup = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  features: string[];
};

type Step = {
  id: number;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    id: 0,
    titleKey: "scenario.steps.sample.title",
    descriptionKey: "scenario.steps.sample.description",
    icon: HeartPulse,
  },
  {
    id: 1,
    titleKey: "scenario.steps.review.title",
    descriptionKey: "scenario.steps.review.description",
    icon: Eye,
  },
  {
    id: 2,
    titleKey: "scenario.steps.features.title",
    descriptionKey: "scenario.steps.features.description",
    icon: SlidersHorizontal,
  },
  {
    id: 3,
    titleKey: "scenario.steps.run.title",
    descriptionKey: "scenario.steps.run.description",
    icon: Brain,
  },
];

const scenarios: Scenario[] = [
  {
    id: "benign",
    titleKey: "scenario.samples.benign.title",
    descriptionKey: "scenario.samples.benign.description",
    badgeKey: "scenario.samples.benign.badge",
    probability: "12.4%",
    icon: ShieldCheck,
    iconClassName: "bg-risk-low-soft text-risk-low",
    borderClassName: "border-risk-low/30",
  },
  {
    id: "intermediate",
    titleKey: "scenario.samples.intermediate.title",
    descriptionKey: "scenario.samples.intermediate.description",
    badgeKey: "scenario.samples.intermediate.badge",
    probability: "41.8%",
    icon: Activity,
    iconClassName: "bg-risk-medium-soft text-risk-medium",
    borderClassName: "border-risk-medium/30",
  },
  {
    id: "malignant",
    titleKey: "scenario.samples.malignant.title",
    descriptionKey: "scenario.samples.malignant.description",
    badgeKey: "scenario.samples.malignant.badge",
    probability: "97.3%",
    icon: HeartPulse,
    iconClassName: "bg-risk-high-soft text-risk-high",
    borderClassName: "border-risk-high/30",
  },
];

const featureGroups: FeatureGroup[] = [
  {
    id: "mean",
    titleKey: "scenario.featureGroups.mean.title",
    descriptionKey: "scenario.featureGroups.mean.description",
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
    id: "se",
    titleKey: "scenario.featureGroups.se.title",
    descriptionKey: "scenario.featureGroups.se.description",
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
    id: "worst",
    titleKey: "scenario.featureGroups.worst.title",
    descriptionKey: "scenario.featureGroups.worst.description",
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

const keyReviewFeatures = [
  "radius_mean",
  "texture_mean",
  "perimeter_mean",
  "area_mean",
  "concavity_mean",
  "concave_points_mean",
  "radius_worst",
  "texture_worst",
  "perimeter_worst",
  "area_worst",
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

function formatFeatureLabel(feature: string) {
  return feature.replaceAll("_", " ");
}

export function ScenarioSelector() {
  const router = useRouter();
  const { t } = useTranslations();

  const [currentStep, setCurrentStep] = useState(0);
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

  const isLastStep = currentStep === steps.length - 1;
  const canGoBack = currentStep > 0;

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

  function handleGoBack() {
    setErrorMessage(null);
    setCurrentStep((step) => Math.max(step - 1, 0));
  }

  function handleGoNext() {
    setErrorMessage(null);

    if (currentStep === 2 && invalidFeatures.length > 0) {
      setErrorMessage(
        `${t("scenario.error.reviewFields")} ${invalidFeatures
          .slice(0, 5)
          .join(", ")}${invalidFeatures.length > 5 ? "..." : ""}`
      );
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  }

  async function handleRunAnalysis() {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      const invalid = getInvalidFeatures(featureValues);

      if (invalid.length > 0) {
        setErrorMessage(
          `${t("scenario.error.reviewFields")} ${invalid
            .slice(0, 5)
            .join(", ")}${invalid.length > 5 ? "..." : ""}`
        );
        setCurrentStep(2);
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
          : t("scenario.error.run")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-3 md:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    "rounded-3xl border p-4 text-left transition hover:bg-muted/70",
                    isActive
                      ? "border-primary-rose bg-primary-rose-soft/50"
                      : "border-border bg-white/70"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-2xl",
                        isActive || isCompleted
                          ? "bg-primary-rose text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        <Icon className="size-5" />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t(step.titleKey)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(step.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {currentStep === 0 ? (
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
                      {t(scenario.titleKey)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-5 pb-5">
                    <Badge className="rounded-xl bg-muted px-3 py-1 text-muted-foreground hover:bg-muted">
                      {t(scenario.badgeKey)}
                    </Badge>

                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {t(scenario.descriptionKey)}
                    </p>

                    <div className="mt-6 rounded-2xl bg-muted p-4">
                      <p className="text-xs font-medium text-muted-foreground">
                        {t("scenario.previewProbability")}
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
      ) : null}

      {currentStep === 1 ? (
        <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <ListChecks className="size-6 text-primary-rose" />
              {t("scenario.review.title")}
            </CardTitle>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              {t("scenario.review.description")}
            </p>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <div className="mb-6 rounded-3xl bg-muted p-5">
              <Badge className="rounded-xl bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                {t(selected.badgeKey)}
              </Badge>

              <h3 className="mt-4 text-2xl font-semibold text-foreground">
                {t(selected.titleKey)}
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {t(selected.descriptionKey)}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {keyReviewFeatures.map((feature) => (
                <div key={feature} className="rounded-2xl border border-border bg-white p-4">
                  <p className="text-xs font-medium capitalize text-muted-foreground">
                    {formatFeatureLabel(feature)}
                  </p>

                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {featureValues[feature]}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {currentStep === 2 ? (
        <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-sm">
          <CardHeader className="px-6 pt-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <SlidersHorizontal className="size-6 text-primary-rose" />
                  {t("scenario.editor.title")}
                </CardTitle>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {t("scenario.editor.description")}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="rounded-2xl bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
                  {filledFeatureCount}/30 {t("scenario.editor.validFields")}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetScenarioValues}
                  className="h-11 rounded-2xl border-border bg-white px-4"
                >
                  <RotateCcw className="mr-2 size-4" />
                  {t("scenario.editor.reset")}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <Accordion className="rounded-3xl border border-border bg-white/70 px-4">
              {featureGroups.map((group) => (
                <AccordionItem key={group.id} value={group.id}>
                  <AccordionTrigger>{t(group.titleKey)}</AccordionTrigger>

                  <AccordionContent>
                    <p className="mb-5 text-sm leading-6 text-muted-foreground">
                      {t(group.descriptionKey)}
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
                                {t("scenario.editor.invalidNumber")}
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
                {t("scenario.editor.payloadNote")}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {currentStep === 3 ? (
        <Card className="rounded-[2rem] border-border bg-card/95 p-2 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
          <CardContent className="p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <Badge className="rounded-xl bg-primary-rose-soft px-3 py-1 text-primary-rose hover:bg-primary-rose-soft">
                  {t("scenario.run.badge")}
                </Badge>

                <h3 className="mt-4 text-3xl font-semibold text-foreground">
                  {t("scenario.run.title")} {t(selected.titleKey)}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {t("scenario.run.description")}
                </p>

                {errorMessage ? (
                  <p className="mt-4 rounded-2xl border border-risk-high-soft bg-risk-high-soft px-4 py-3 text-sm font-medium text-risk-high">
                    {errorMessage}
                  </p>
                ) : null}
              </div>

              <div className="rounded-3xl bg-muted p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("scenario.run.validFeatures")}
                  </span>
                  <span className="text-2xl font-semibold text-foreground">
                    {filledFeatureCount}/30
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("scenario.previewProbability")}
                  </span>
                  <span className="text-2xl font-semibold text-primary-rose">
                    {selected.probability}
                  </span>
                </div>

                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleRunAnalysis}
                  className="mt-6 h-14 w-full rounded-2xl bg-primary-rose px-8 text-base font-semibold text-white shadow-lg shadow-primary-rose/20 hover:bg-primary-rose-dark disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Brain className="mr-2 size-5" />
                  {isSubmitting ? t("scenario.run.running") : t("scenario.run.cta")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {errorMessage && currentStep !== 3 ? (
        <p className="rounded-2xl border border-risk-high-soft bg-risk-high-soft px-4 py-3 text-sm font-medium text-risk-high">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={!canGoBack || isSubmitting}
          onClick={handleGoBack}
          className="h-12 rounded-2xl border-border bg-white px-6 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="mr-2 size-4" />
          {t("scenario.nav.back")}
        </Button>

        {!isLastStep ? (
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleGoNext}
            className="h-12 rounded-2xl bg-primary-rose px-6 text-white hover:bg-primary-rose-dark"
          >
            {t("scenario.nav.continue")}
            <ArrowRight className="ml-2 size-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
