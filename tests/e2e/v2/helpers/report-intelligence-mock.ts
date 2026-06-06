import type { Page } from "@playwright/test";

export const qaSparseReport = {
  id: "qa-sparse-report",
  createdAt: "2026-06-01T12:00:00Z",
  inputType: "TEXT",
  detectedLanguage: "pt-BR",
  targetLanguage: "pt-BR",
  reportType: "UNKNOWN",
  structuredFindings: {
    birads: null,
    breastSide: "mama esquerda",
    location: null,
    measurements: [],
    mentionedFindings: ["nódulo"],
    mentionedRecommendations: [],
  },
  importantTerms: [
    {
      term: "Nódulo",
      explanation:
        "Área descrita como diferente do tecido ao redor e que precisa ser interpretada junto ao exame e avaliação profissional.",
    },
    {
      term: "BI-RADS",
      explanation:
        "Sistema padronizado usado em laudos de imagem da mama quando informado.",
    },
  ],
  educationalSummary:
    "Você informou que existe um nódulo na mama esquerda, mas ainda não há detalhes suficientes para concluir diagnóstico, risco, urgência ou tratamento.",
  simpleExplanation:
    "Com os dados atuais, o mais útil é organizar o que foi informado, o que falta saber e quais perguntas podem ajudar na conversa com um profissional de saúde.",
  wdbcCompatibility: {
    canRunPrediction: false,
    detectedFeaturesCount: 0,
    requiredFeaturesCount: 30,
    reason:
      "O texto não contém as 30 variáveis numéricas exigidas pelo modelo WDBC.",
  },
  safetyNotes: [
    "Esta explicação é educacional e não substitui avaliação médica.",
    "Não é possível confirmar ou descartar câncer com essas informações.",
  ],
  processingStatus: "COMPLETED",
  provider: "QA_MOCK",
  providerModel: "QA_MOCK_MODEL",
  correlationId: "qa-correlation",
};

export async function mockReportIntelligence(page: Page) {
  await page.route("**/api/report-intelligence/analyze", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(qaSparseReport),
    });
  });

  await page.route("**/api/report-intelligence/qa-sparse-report", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(qaSparseReport),
    });
  });

  await page.route("**/api/report-intelligence", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([qaSparseReport]),
    });
  });
}
