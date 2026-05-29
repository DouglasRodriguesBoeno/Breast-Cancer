export type ReportInputType = "TEXT" | "PDF";

export type ReportLanguage = "pt-BR" | "en" | "es";

export type ReportAnalysisStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

export type ReportType =
  | "MAMMOGRAPHY"
  | "ULTRASOUND"
  | "MRI"
  | "BIOPSY"
  | "UNKNOWN";

export type WdbcCompatibility = {
  canRunPrediction: boolean;
  reason: string;
  detectedFeaturesCount: number;
  missingFeaturesCount: number;
  requiredFeaturesCount: number;
  detectedFeatureNames: string[];
};

export type ReportMeasurement = {
  value: number;
  unit: string;
  context: string;
};

export type ImportantTerm = {
  term: string;
  explanation: string;
};

export type StructuredFindings = {
  birads: string | null;
  breastSide: string | null;
  location: string | null;
  measurements: ReportMeasurement[];
  mentionedFindings: string[];
  mentionedRecommendations: string[];
};

export type ReportAnalysis = {
  id: string;
  status: ReportAnalysisStatus;
  inputType: ReportInputType;
  detectedLanguage: ReportLanguage;
  targetLanguage: ReportLanguage;
  reportType: ReportType;
  createdAt: string;
  structuredFindings: StructuredFindings;
  importantTerms: ImportantTerm[];
  educationalSummary: string;
  simpleExplanation: string;
  wdbcCompatibility: WdbcCompatibility;
  safetyNotes: string[];
};

export type AnalyzeReportInput = {
  inputType: ReportInputType;
  targetLanguage: ReportLanguage;
  reportText: string;
  reportType?: ReportType;
};

export type AnalyzeReportResult = ReportAnalysis;

export const REPORT_LANGUAGE_LABELS: Record<ReportLanguage, string> = {
  "pt-BR": "Portuguese",
  en: "English",
  es: "Spanish",
};

export const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  MAMMOGRAPHY: "Mammography",
  ULTRASOUND: "Ultrasound",
  MRI: "Breast MRI",
  BIOPSY: "Biopsy",
  UNKNOWN: "Unknown",
};
