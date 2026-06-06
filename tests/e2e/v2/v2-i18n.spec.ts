import { expect, test } from "@playwright/test";

import { mockReportIntelligence } from "./helpers/report-intelligence-mock";

test.describe("V2 language switching", () => {
  test.beforeEach(async ({ page }) => {
    await mockReportIntelligence(page);
  });

  test("header labels switch between Portuguese, English and Spanish", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: /Histórico/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Modelo/i })).toBeVisible();

    await page.getByTestId("language-switcher").selectOption("en");
    await expect(page.getByRole("link", { name: "History" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Model" })).toBeVisible();

    await page.getByTestId("language-switcher").selectOption("es");
    await expect(page.getByRole("link", { name: /Historial/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Cómo funciona/i })).toBeVisible();
  });

  test("/model respects the selected language", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("language-switcher").selectOption("en");

    await page.goto("/model");

    await expect(
      page.getByRole("heading", {
        name: /Educational AI model for WDBC pattern analysis/i,
      })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Run analysis/i })).toBeVisible();
  });

  test("/new-analysis/report respects the selected language", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("language-switcher").selectOption("es");

    await page.goto("/new-analysis/report");

    await expect(
      page.getByRole("heading", { name: /Analizar informe médico/i })
    ).toBeVisible();
    await expect(page.getByTestId("report-submit")).toContainText(/Analizar informe/i);
  });
});
