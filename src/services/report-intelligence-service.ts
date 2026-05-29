import {
  mockReportAnalysis,
  reportAnalysisMocks,
} from "@/data/report-intelligence-mock";
import type {
  AnalyzeReportInput,
  AnalyzeReportResult,
  ReportAnalysis,
} from "@/types/report-intelligence";

const MOCK_PROCESSING_DELAY_MS = 900;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createMockAnalysisId() {
  return `rep_${Date.now().toString(36)}`;
}

export async function analyzeReport(
  input: AnalyzeReportInput
): Promise<AnalyzeReportResult> {
  if (!input.reportText.trim()) {
    throw new Error("Report text is required to create an educational analysis.");
  }

  await wait(MOCK_PROCESSING_DELAY_MS);

  return {
    ...mockReportAnalysis,
    id: createMockAnalysisId(),
    inputType: input.inputType,
    targetLanguage: input.targetLanguage,
    reportType: input.reportType ?? mockReportAnalysis.reportType,
    createdAt: new Date().toISOString(),
  };
}

export async function getReportAnalysisById(
  id: string
): Promise<ReportAnalysis> {
  await wait(250);

  return reportAnalysisMocks[id] ?? { ...mockReportAnalysis, id };
}
