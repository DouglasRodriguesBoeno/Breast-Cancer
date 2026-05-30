export type ReportLanguage = "Portuguese" | "English" | "Spanish";

export type ReportType = "Mammography" | "Ultrasound" | "MRI" | "Other";

export type AnalysisFlowState =
  | "MODE_SELECTION"
  | "REPORT_INPUT"
  | "REPORT_SUBMITTING"
  | "REPORT_COMPLETED"
  | "REPORT_ERROR"
  | "WDBC_COMPATIBLE"
  | "WDBC_NOT_COMPATIBLE"
  | "PREDICTION_SUBMITTING"
  | "PREDICTION_COMPLETED";

export type ReportAnalysisRequest = {
  reportText: string;
  outputLanguage: ReportLanguage;
  reportType?: ReportType;
  educationalAcknowledgement: boolean;
};

export type StructuredFinding = {
  label: string;
  value: string;
};

export type ImportantTerm = {
  term: string;
  explanation: string;
};

export type WdbcCompatibility = {
  canRunPrediction: boolean;
  missingFeatures: number;
  reason: string;
};

export type ReportAnalysisResponse = {
  id: string;
  createdAt: string;
  detectedLanguage: ReportLanguage;
  examType: ReportType;
  simpleExplanation: string;
  structuredFindings: StructuredFinding[];
  importantTerms: ImportantTerm[];
  wdbcCompatibility: WdbcCompatibility;
  safetyNotes: string[];
};

export type ReportHistoryItem = {
  id: string;
  type: "report-intelligence" | "wdbc-prediction";
  createdAt: string;
  language?: ReportLanguage;
  status: "completed" | "processing" | "error";
  biradsMentioned?: string;
  wdbcCompatible?: boolean;
};
