import { test, expect } from '@playwright/test';

test('Button with "Click Me" should be visible', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/assertions/should-be');

  const button = page.getByRole('button', { name: /click me/i });
  await expect(button).toBeVisible();
});
