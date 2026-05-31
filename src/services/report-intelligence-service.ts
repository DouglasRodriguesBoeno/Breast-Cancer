import type {
  AnalyzeReportInput,
  AnalyzeReportResult,
  ReportAnalysis,
} from "@/types/report-intelligence";

type ReportAnalysisApiResponse = ReportAnalysis & {
  created_at?: string;
  provider_model?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeReportAnalysis(report: ReportAnalysisApiResponse): ReportAnalysis {
  return {
    ...report,
    createdAt: report.createdAt ?? report.created_at ?? "",
    providerModel: report.providerModel ?? report.provider_model,
  };
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch {
    throw new Error(
      "Não foi possível carregar o histórico. Verifique a conexão com a API ou tente novamente."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Não foi possível carregar o histórico. O endpoint da API não foi encontrado."
      );
    }

    if (response.status >= 500) {
      throw new Error(
        "Não foi possível carregar o histórico. A API retornou um erro interno."
      );
    }

    throw new Error(
      data?.message ??
        data?.error ??
        "Não foi possível carregar o histórico. Verifique a conexão com a API ou tente novamente."
    );
  }

  if (data === null) {
    throw new Error(
      "Não foi possível carregar o histórico. A API retornou uma resposta inválida."
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

  if (!isRecord(response)) {
    throw new Error(
      "Não foi possível carregar o histórico. A API retornou uma resposta inválida."
    );
  }

  return normalizeReportAnalysis(response) as AnalyzeReportResult;
}

export async function getReportAnalysisById(
  id: string
): Promise<ReportAnalysis> {
  const response = await requestJson<ReportAnalysisApiResponse>(
    `/api/report-intelligence/${id}`
  );

  if (!isRecord(response)) {
    throw new Error(
      "Não foi possível carregar o histórico. A API retornou uma resposta inválida."
    );
  }

  return normalizeReportAnalysis(response);
}

export async function getReportAnalyses(): Promise<ReportAnalysis[]> {
  const response = await requestJson<unknown>(
    "/api/report-intelligence"
  );

  if (!Array.isArray(response)) {
    throw new Error(
      "Não foi possível carregar o histórico. A API retornou uma resposta inválida."
    );
  }

  return response
    .filter(isRecord)
    .map((item) => normalizeReportAnalysis(item as ReportAnalysisApiResponse));
}
