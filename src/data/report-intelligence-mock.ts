import type { ReportAnalysis } from "@/types/report-intelligence";

export const mockReportAnalysis: ReportAnalysis = {
  id: "rep_demo_001",
  status: "COMPLETED",
  inputType: "TEXT",
  detectedLanguage: "pt-BR",
  targetLanguage: "pt-BR",
  reportType: "MAMMOGRAPHY",
  createdAt: "2026-05-29T12:00:00.000Z",
  structuredFindings: {
    birads: "BI-RADS 3",
    breastSide: "left",
    location: "upper outer quadrant",
    measurements: [
      {
        value: 12,
        unit: "mm",
        context: "Nodule measurement mentioned in the provided report text.",
      },
    ],
    mentionedFindings: [
      "Nodule with circumscribed margins",
      "No suspicious calcifications mentioned",
      "Follow-up described in the report text",
    ],
    mentionedRecommendations: [
      "Short-term imaging follow-up mentioned in the provided text",
    ],
  },
  importantTerms: [
    {
      term: "BI-RADS",
      explanation:
        "A standardized breast imaging reporting category mentioned in many mammography, ultrasound or MRI reports.",
    },
    {
      term: "Nodule",
      explanation:
        "A described finding or localized area in breast tissue. Its meaning depends on imaging characteristics and professional evaluation.",
    },
    {
      term: "Circumscribed margins",
      explanation:
        "A term used to describe borders that appear well defined in the report text.",
    },
  ],
  educationalSummary:
    "The provided report text mentions a BI-RADS 3 category and describes a breast finding with circumscribed margins. This summary is educational and should be reviewed with a healthcare professional.",
  simpleExplanation:
    "In simple language, the report describes a finding that the text classifies as probably benign within the BI-RADS terminology. BreastCare AI only explains the provided information and does not provide diagnosis.",
  wdbcCompatibility: {
    canRunPrediction: false,
    reason:
      "This report can be explained educationally, but it does not contain the 30 numerical features required by the current WDBC model.",
    detectedFeaturesCount: 0,
    missingFeaturesCount: 30,
    requiredFeaturesCount: 30,
    detectedFeatureNames: [],
  },
  safetyNotes: [
    "Educational only — BreastCare AI does not provide medical diagnosis.",
    "This explanation does not replace professional medical evaluation.",
    "The system does not recommend treatment or define clinical urgency.",
    "The WDBC model only runs when compatible structured numerical features are available.",
  ],
};

export const reportAnalysisMocks: Record<string, ReportAnalysis> = {
  [mockReportAnalysis.id]: mockReportAnalysis,
};
