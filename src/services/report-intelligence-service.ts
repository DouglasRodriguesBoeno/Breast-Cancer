import type {
  AnalyzeReportInput,
  AnalyzeReportResult,
  ReportAnalysis,
} from "@/types/report-intelligence";

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ??
        data?.error ??
        "Unexpected error while communicating with the report intelligence API."
    );
  }

  return data as T;
}

export async function analyzeReport(
  input: AnalyzeReportInput
): Promise<AnalyzeReportResult> {
  if (!input.reportText.trim()) {
    throw new Error("Report text is required to create an educational analysis.");
  }

  return requestJson<AnalyzeReportResult>("/api/report-intelligence/analyze", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function getReportAnalysisById(
  id: string
): Promise<ReportAnalysis> {
  return requestJson<ReportAnalysis>(`/api/report-intelligence/${id}`);
}

export async function getReportAnalyses(): Promise<ReportAnalysis[]> {
  return requestJson<ReportAnalysis[]>("/api/report-intelligence");
}
