import { test, expect } from '@playwright/test';

test('Go to URL', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Practice/);
});

test('Valid Username and Password', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  // Fill in the username and password fields
  await page.fill('#username', 'practice');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
})

test('Invalid Username', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  //Fill in incorrect username and password fields
  await page.fill('#username', 'wrongUser');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');
  
  // Expect an error message to be visible
  const errorMessage = await page.locator('#flash');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Your password is invalid!');

})

test('Invalid Password', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/login');

  //Fill in incorrect username and password fields
  await page.fill('#username', 'practice');
  await page.fill('#password', 'wrongPassword');
  await page.click('button[type="submit"]');
  
  // Expect an error message to be visible
  const errorMessage = await page.locator('#flash');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Your password is invalid!');

})
