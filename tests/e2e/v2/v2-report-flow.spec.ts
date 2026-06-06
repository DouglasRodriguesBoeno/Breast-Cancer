import { expect, test } from "@playwright/test";

import { mockReportIntelligence } from "./helpers/report-intelligence-mock";

test.describe("V2 report intelligence flow", () => {
  test.beforeEach(async ({ page }) => {
    await mockReportIntelligence(page);
  });

  test("submits sparse report text and shows the educational result guide", async ({
    page,
  }) => {
    await page.goto("/new-analysis/report");

    await page
      .getByTestId("report-textarea")
      .fill("Tenho um nódulo na mama esquerda, mas ainda não tenho muitos detalhes.");

    const acknowledgement = page.getByTestId("educational-acknowledgement");
    if (await acknowledgement.isVisible()) {
      await acknowledgement.check();
    }

    await page.getByTestId("report-submit").click();

    await expect(page).toHaveURL(/\/reports\/qa-sparse-report$/);
    await expect(page.getByRole("heading", { name: /Explicação simples/i })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Resumo educacional", exact: true })
    ).toBeVisible();
    await expect(page.getByTestId("educational-guide")).toBeVisible();
    await expect(page.getByText(/Guia educacional|Seu guia de entendimento/i)).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "O que foi informado" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "O que ainda falta saber" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "O que não é possível concluir" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Perguntas úteis/i })
    ).toBeVisible();
    await expect(page.getByTestId("wdbc-section")).toContainText(/WDBC/i);
    await expect(page.getByTestId("wdbc-section")).toContainText(
      /Etapa avançada e opcional|Não compatível|30 variáveis/i
    );
  });
});
