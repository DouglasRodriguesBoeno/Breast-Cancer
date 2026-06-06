import { expect, test } from "@playwright/test";

import { mockReportIntelligence } from "./helpers/report-intelligence-mock";

const routes = [
  "/",
  "/new-analysis",
  "/new-analysis/report",
  "/reports/qa-sparse-report",
  "/history",
  "/model",
  "/analysis/new",
];

const forbiddenPhrases = [
  "Você tem câncer",
  "Você não tem câncer",
  "diagnóstico confirmado",
  "tratamento recomendado",
  "sem risco",
  "não é perigoso",
  "urgência definida",
  "you have cancer",
  "you do not have cancer",
  "confirmed diagnosis",
  "treatment recommended",
  "no risk",
  "not dangerous",
];

test.describe("V2 safety copy", () => {
  test.beforeEach(async ({ page }) => {
    await mockReportIntelligence(page);
  });

  for (const route of routes) {
    test(`${route} does not show forbidden diagnostic copy`, async ({ page }) => {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();

      const bodyText = (await page.locator("body").innerText()).toLowerCase();

      for (const phrase of forbiddenPhrases) {
        expect(bodyText, `Forbidden phrase visible: ${phrase}`).not.toContain(
          phrase.toLowerCase()
        );
      }
    });
  }
});
