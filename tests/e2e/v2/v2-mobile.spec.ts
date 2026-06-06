import { expect, test } from "@playwright/test";

import { expectNoHorizontalOverflow } from "./fixtures";
import { mockReportIntelligence } from "./helpers/report-intelligence-mock";

test.describe("V2 mobile", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true });

  test.beforeEach(async ({ page }) => {
    await mockReportIntelligence(page);
  });

  test("core V2 pages are usable on mobile without horizontal overflow", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: /Analisar laudo/i })).toBeVisible();
    expect(await expectNoHorizontalOverflow(page)).toBe(false);

    await page.goto("/new-analysis/report");
    await expect(page.getByTestId("report-textarea")).toBeVisible();
    await page.getByTestId("report-textarea").fill("Tenho um nódulo na mama esquerda.");
    await page.getByTestId("educational-acknowledgement").check();
    await expect(page.getByTestId("report-submit")).toBeEnabled();
    expect(await expectNoHorizontalOverflow(page)).toBe(false);

    await page.goto("/reports/qa-sparse-report");
    await expect(page.getByTestId("educational-guide")).toBeVisible();
    await expect(page.getByTestId("wdbc-section")).toBeVisible();
    expect(await expectNoHorizontalOverflow(page)).toBe(false);

    await page.goto("/history");
    await expect(page.getByRole("link", { name: /Nova análise/i })).toBeVisible();
    expect(await expectNoHorizontalOverflow(page)).toBe(false);

    await page.goto("/model");
    await expect(page.getByRole("link", { name: /Executar análise/i })).toBeVisible();
    expect(await expectNoHorizontalOverflow(page)).toBe(false);
  });
});
