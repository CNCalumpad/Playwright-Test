import { expect, test } from "@playwright/test";

test("dynamic table get Chrome CPU value", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/dynamic-table");

  // Locate the table element
  const table = page.locator("table");

  // Verify the table has 5 rows (including header)
  await expect(table.locator("tr")).toHaveCount(5);

  // Find the column index of the "CPU" header so the test works even when the column order changes
  const cpuColumnIndex = await table
    .locator("tr")
    .first()
    .locator("th")
    .evaluateAll((headers) => {
      return headers.findIndex(
        (header) => header.textContent?.trim() === "CPU",
      );
    });

  expect(cpuColumnIndex).toBeGreaterThan(-1);

  const chromeRow = table.locator("tr:has(td:has-text('Chrome'))");

  // Grab the CPU value for Chrome from the dynamic table using the header-derived column index
  const chromeCpuValue = await chromeRow
    .locator("td")
    .nth(cpuColumnIndex)
    .textContent()
    .then((text) => text?.trim());

  // Highlight the Chrome CPU value on the page for debugging
  await chromeRow
    .locator("td")
    .nth(cpuColumnIndex)
    .evaluate((el) => {
      el.style.backgroundColor = "yellow";
    });

  // Compare the CPU value with the expected value generated dynamically below the table
  // Use the first text node only so the link text below the paragraph does not get included in the assertion
  const expectedCpuValue = await page
    .locator("p:has-text('Chrome CPU:')")
    .evaluate((el) => {
      const text = el.firstChild?.textContent?.trim() ?? "";
      return text.split(":")[1]?.trim() ?? "";
    });

  // Highlight the expected value on the page for debugging
  await page.locator("p:has-text('Chrome CPU:')").evaluate((el) => {
    el.style.backgroundColor = "blue";
  });

  // Log the actual and expected CPU values for debugging
  console.log(`Actual Chrome CPU value: ${chromeCpuValue}`);
  console.log(`Expected Chrome CPU value: ${expectedCpuValue}`);

  // Assert that the CPU value for Chrome matches the expected value
  expect(chromeCpuValue).toBe(expectedCpuValue);
});
