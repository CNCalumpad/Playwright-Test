import { expect, test } from "@playwright/test";

test("dynamic table get Chrome CPU value", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");

  // Locate the table element
  const table = page.locator("table");

  // Verify the table has 5 rows (including header)
  await expect(table.locator("tr")).toHaveCount(5);

  // Grab the CPU value for Chrome from the dynamic table (table values move around every refresh)
  await page.waitForSelector(
    "table tr:has(td:has-text('Chrome')) td:nth-child(2)",
  );
  const chromeCpuValue = await table
    .locator("tr:has(td:has-text('Chrome')) td:nth-child(2)")
    .textContent();

  // Compare the CPU value with the expected value generated dynamically below (the expected value is generated dynamically because the table values move around every refresh)
  const expectedCpuValue = await page.evaluate(() => {
    const chromeRow = Array.from(document.querySelectorAll("table tr")).find(
      (row) => row.querySelector("td")?.textContent === "Chrome",
    );
    return chromeRow
      ? chromeRow.querySelector("td:nth-child(2)")?.textContent
      : null;
  });

  // Assert that the CPU value for Chrome matches the expected value
  expect(chromeCpuValue).toBe(expectedCpuValue);
});
