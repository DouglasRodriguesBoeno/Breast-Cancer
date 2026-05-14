"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarClock,
  FileSearch,
  Filter,
  History,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { getPredictionHistory } from "@/services/prediction-service";
import type { PredictionListItem } from "@/types/prediction";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type RiskFilter = "all" | "low" | "medium" | "high";
type LabelFilter = "all" | "benign" | "malignant";

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

function normalizeRiskBand(riskBand: string): RiskFilter {
  const normalized = riskBand.toLowerCase();

  if (normalized.includes("high") || normalized.includes("alto")) {
    return "high";
  }

  if (
    normalized.includes("medium") ||
    normalized.includes("intermediate") ||
    normalized.includes("medio") ||
    normalized.includes("médio")
  ) {
    return "medium";
  }

  return "low";
}

function normalizeLabel(item: PredictionListItem): LabelFilter {
  const label = `${item.predicted_label} ${item.predicted_label_name}`.toLowerCase();

  if (label.includes("m") || label.includes("malign")) {
    return "malignant";
  }

  return "benign";
}

function getRiskClassName(riskBand: string) {
  const normalized = normalizeRiskBand(riskBand);

  if (normalized === "high") {
    return "bg-risk-high-soft text-risk-high";
  }

  if (normalized === "medium") {
    return "bg-risk-medium-soft text-risk-medium";
  }

  return "bg-risk-low-soft text-risk-low";
}

function EmptyHistoryState() {
  return (
    <Card className="rounded-3xl border-border bg-card/95 p-8 text-center shadow-sm">
      <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-primary-rose-soft text-primary-rose">
        <FileSearch className="size-8" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-foreground">
        No analyses yet
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        Your created analyses will appear here after running the guided
        prediction flow.
      </p>

      <Link
        href="/analysis/new"
        className={cn(
          buttonVariants(),
          "mt-6 h-12 rounded-2xl bg-primary-rose px-6 text-white hover:bg-primary-rose-dark"
        )}
      >
        <Plus className="mr-2 size-4" />
        Create first analysis
      </Link>
    </Card>
  );
}

function EmptyFilteredState({
  onClearFilters,
}: {
  onClearFilters: () => void;
}) {
  return (
    <Card className="rounded-3xl border-border bg-card/95 p-8 text-center shadow-sm">
      <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-muted text-muted-foreground">
        <Search className="size-8" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-foreground">
        No matching analyses
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        No records matched the current search and filters. Clear the filters to
        see the full history again.
      </p>

      <button
        type="button"
        onClick={onClearFilters}
        className="mt-6 h-12 rounded-2xl border border-border bg-white px-6 text-sm font-semibold text-foreground transition hover:bg-muted"
      >
        <XCircle className="mr-2 inline size-4" />
        Clear filters
      </button>
    </Card>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof History;
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

function HistoryMobileCard({ item }: { item: PredictionListItem }) {
  return (
    <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge
              className={cn(
                "rounded-xl px-3 py-1 hover:opacity-90",
                getRiskClassName(item.risk_band)
              )}
            >
              {item.risk_band}
            </Badge>

            <h3 className="mt-4 text-xl font-semibold text-foreground">
              {item.predicted_label_name}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Malignant probability: {formatPercent(item.probability_malignant)}
            </p>
          </div>

          <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-rose-soft text-primary-rose">
            <History className="size-5" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarClock className="size-4" />
          {formatDate(item.created_at)}
        </div>

        <div className="mt-5 rounded-2xl bg-muted p-4">
          <p className="text-xs font-medium text-muted-foreground">Model</p>
          <p className="mt-1 break-words text-sm font-medium text-foreground">
            {item.model_type}
          </p>
        </div>

        <Link
          href={`/analysis/${item.id}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-5 h-11 w-full rounded-2xl border-border bg-white"
          )}
        >
          View detail
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function HistoryList() {
  const [history, setHistory] = useState<PredictionListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [labelFilter, setLabelFilter] = useState<LabelFilter>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getPredictionHistory();
        setHistory(response);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load prediction history."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return history.filter((item) => {
      const riskMatches =
        riskFilter === "all" || normalizeRiskBand(item.risk_band) === riskFilter;

      const labelMatches =
        labelFilter === "all" || normalizeLabel(item) === labelFilter;

      const searchableText = [
        item.id,
        item.predicted_label,
        item.predicted_label_name,
        item.risk_band,
        item.model_type,
        formatPercent(item.probability_malignant),
        formatDate(item.created_at),
      ]
        .join(" ")
        .toLowerCase();

      const searchMatches =
        normalizedSearch === "" || searchableText.includes(normalizedSearch);

      return riskMatches && labelMatches && searchMatches;
    });
  }, [history, labelFilter, riskFilter, searchTerm]);

  const summary = useMemo(() => {
    const total = history.length;
    const highRiskCount = history.filter(
      (item) => normalizeRiskBand(item.risk_band) === "high"
    ).length;

    const malignantCount = history.filter(
      (item) => normalizeLabel(item) === "malignant"
    ).length;

    const averageMalignantProbability =
      total === 0
        ? 0
        : history.reduce(
            (sum, item) => sum + toPercent(item.probability_malignant),
            0
          ) / total;

    return {
      total,
      highRiskCount,
      malignantCount,
      averageMalignantProbability,
    };
  }, [history]);

  function clearFilters() {
    setSearchTerm("");
    setRiskFilter("all");
    setLabelFilter("all");
  }

  if (isLoading) {
    return (
      <Card className="rounded-3xl border-border bg-card/95 p-8 shadow-sm">
        <p className="text-sm font-medium text-muted-foreground">
          Loading prediction history...
        </p>
      </Card>
    );
  }

  if (errorMessage) {
    return (
      <Card className="rounded-3xl border-risk-high-soft bg-risk-high-soft/50 p-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="size-6 text-risk-high" />

          <div>
            <h2 className="text-xl font-semibold text-risk-high">
              Unable to load history
            </h2>

            <p className="mt-2 text-sm leading-6 text-risk-high">
              {errorMessage}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (history.length === 0) {
    return <EmptyHistoryState />;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total analyses"
          value={String(summary.total)}
          description="All prediction records currently saved in the database."
          icon={History}
        />

        <SummaryCard
          label="High risk band"
          value={String(summary.highRiskCount)}
          description="Records classified with a high model risk band."
          icon={ShieldAlert}
          className="text-risk-high"
        />

        <SummaryCard
          label="Malignant labels"
          value={String(summary.malignantCount)}
          description="Records whose final predicted label is malignant."
          icon={ShieldCheck}
          className="text-primary-rose"
        />

        <SummaryCard
          label="Avg. malignant probability"
          value={`${summary.averageMalignantProbability.toFixed(1)}%`}
          description="Average malignant probability across all records."
          icon={BarChart3}
          className="text-secondary-teal-dark"
        />
      </div>

      <Card className="rounded-3xl border-border bg-card/95 p-2 shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-md">
              <label className="text-sm font-medium text-foreground">
                Search history
              </label>

              <div className="mt-2 flex h-12 items-center gap-3 rounded-2xl border border-border bg-white px-4">
                <Search className="size-4 text-muted-foreground" />

                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by ID, label, risk or model..."
                  className="h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="size-4" />
                Risk band
              </div>

              <div className="flex flex-wrap gap-2">
                {(["all", "low", "medium", "high"] as RiskFilter[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setRiskFilter(filter)}
                      className={cn(
                        "h-10 rounded-2xl border px-4 text-sm font-medium capitalize transition",
                        riskFilter === filter
                          ? "border-primary-rose bg-primary-rose-soft text-primary-rose"
                          : "border-border bg-white text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-sm font-medium text-muted-foreground">
                Predicted label
              </div>

              <div className="flex flex-wrap gap-2">
                {(["all", "benign", "malignant"] as LabelFilter[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setLabelFilter(filter)}
                      className={cn(
                        "h-10 rounded-2xl border px-4 text-sm font-medium capitalize transition",
                        labelFilter === filter
                          ? "border-primary-rose bg-primary-rose-soft text-primary-rose"
                          : "border-border bg-white text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="h-10 rounded-2xl border border-border bg-white px-4 text-sm font-medium text-muted-foreground transition hover:bg-muted"
            >
              Clear
            </button>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredHistory.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {history.length}
            </span>{" "}
            analyses.
          </p>
        </CardContent>
      </Card>

      {filteredHistory.length === 0 ? (
        <EmptyFilteredState onClearFilters={clearFilters} />
      ) : (
        <>
          <div className="hidden rounded-3xl border border-border bg-card/95 p-3 shadow-sm lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4">ID</TableHead>
                  <TableHead className="px-4">Created at</TableHead>
                  <TableHead className="px-4">Prediction</TableHead>
                  <TableHead className="px-4">Risk band</TableHead>
                  <TableHead className="px-4">
                    Malignant probability
                  </TableHead>
                  <TableHead className="px-4">Model</TableHead>
                  <TableHead className="px-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="px-4 font-medium">
                      #{item.id}
                    </TableCell>

                    <TableCell className="px-4 text-muted-foreground">
                      {formatDate(item.created_at)}
                    </TableCell>

                    <TableCell className="px-4 font-medium">
                      {item.predicted_label_name}
                    </TableCell>

                    <TableCell className="px-4">
                      <Badge
                        className={cn(
                          "rounded-xl px-3 py-1 hover:opacity-90",
                          getRiskClassName(item.risk_band)
                        )}
                      >
                        {item.risk_band}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 font-medium text-primary-rose">
                      {formatPercent(item.probability_malignant)}
                    </TableCell>

                    <TableCell className="max-w-[260px] truncate px-4 text-muted-foreground">
                      {item.model_type}
                    </TableCell>

                    <TableCell className="px-4 text-right">
                      <Link
                        href={`/analysis/${item.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-9 rounded-xl border-border bg-white px-4"
                        )}
                      >
                        View detail
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="grid gap-5 lg:hidden">
            {filteredHistory.map((item) => (
              <HistoryMobileCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}