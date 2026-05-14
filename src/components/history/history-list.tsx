"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  FileSearch,
  History,
  Plus,
} from "lucide-react";

import { getPredictionHistory } from "@/services/prediction-service";
import type { PredictionListItem } from "@/types/prediction";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
      <div className="hidden rounded-3xl border border-border bg-card/95 p-3 shadow-sm lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">ID</TableHead>
              <TableHead className="px-4">Created at</TableHead>
              <TableHead className="px-4">Prediction</TableHead>
              <TableHead className="px-4">Risk band</TableHead>
              <TableHead className="px-4">Malignant probability</TableHead>
              <TableHead className="px-4">Model</TableHead>
              <TableHead className="px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 font-medium">#{item.id}</TableCell>

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
        {history.map((item) => (
          <HistoryMobileCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}