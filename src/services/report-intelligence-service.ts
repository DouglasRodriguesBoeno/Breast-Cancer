import type {
  AnalyzeReportInput,
  AnalyzeReportResult,
  ReportAnalysis,
} from "@/types/report-intelligence";

type ReportAnalysisApiResponse = ReportAnalysis & {
  created_at?: string;
  provider_model?: string;
};

function normalizeReportAnalysis(report: ReportAnalysisApiResponse): ReportAnalysis {
  return {
    ...report,
    createdAt: report.createdAt ?? report.created_at ?? "",
    providerModel: report.providerModel ?? report.provider_model,
  };
}

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

  const response = await requestJson<ReportAnalysisApiResponse>(
    "/api/report-intelligence/analyze",
    {
      method: "POST",
      body: JSON.stringify(input),
    }
  );

  return normalizeReportAnalysis(response) as AnalyzeReportResult;
}

export async function getReportAnalysisById(
  id: string
): Promise<ReportAnalysis> {
  const response = await requestJson<ReportAnalysisApiResponse>(
    `/api/report-intelligence/${id}`
  );

  return normalizeReportAnalysis(response);
}

export async function getReportAnalyses(): Promise<ReportAnalysis[]> {
  const response = await requestJson<ReportAnalysisApiResponse[]>(
    "/api/report-intelligence"
  );

  return response.map(normalizeReportAnalysis);
}
