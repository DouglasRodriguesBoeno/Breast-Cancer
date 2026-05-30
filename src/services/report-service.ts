import type {
  ReportAnalysisRequest,
  ReportAnalysisResponse,
  ReportHistoryItem,
} from "@/types/report";

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
        "Unexpected error while communicating with the report API."
    );
  }

  return data as T;
}

export function createReportAnalysis(
  payload: ReportAnalysisRequest
): Promise<ReportAnalysisResponse> {
  return requestJson<ReportAnalysisResponse>("/api/reports", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getReportById(id: string): Promise<ReportAnalysisResponse> {
  return requestJson<ReportAnalysisResponse>(`/api/reports/${id}`);
}

export function getReportHistory(): Promise<ReportHistoryItem[]> {
  return requestJson<ReportHistoryItem[]>("/api/reports");
}
