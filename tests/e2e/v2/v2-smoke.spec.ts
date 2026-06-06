import { expect, test } from "@playwright/test";

import { mockReportIntelligence } from "./helpers/report-intelligence-mock";

const routes = [
  "/",
  "/new-analysis",
  "/new-analysis/report",
  "/history",
  "/model",
  "/analysis/new",
];

test.describe("V2 smoke", () => {
  test.beforeEach(async ({ page }) => {
    await mockReportIntelligence(page);
  });

  for (const route of routes) {
    test(`${route} loads main content without obvious errors`, async ({ page }) => {
      const pageErrors: Error[] = [];
      page.on("pageerror", (error) => pageErrors.push(error));

      await page.goto(route);

      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("body")).not.toContainText(
        /application error|unhandled runtime error|404|500|failed to fetch/i
      );
      expect(pageErrors).toEqual([]);
    });
  }
});
