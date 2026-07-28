import { test, expect } from '@playwright/test';

test('Go to URL', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/register');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Practice/);
})

test('Successful registration', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/register');
  
  // Fill in the registration form fields and submit
    await page.fill('#username', 'kwasonggg12623');
    await page.fill('#password', 'NewUserPassword!');
    await page.fill('#confirmPassword', 'NewUserPassword!');
    await page.click('button[type="submit"]');

  // Expect to be redirected to the login page after successful registration
    await expect(page).toHaveURL('https://practice.expandtesting.com/login');

  // Expect a success message to be visible
    await expect(page.locator('#flash')).toBeVisible();
    await expect(page.locator('#flash')).toContainText('Successfully registered, you can log in now.');
})

test('Registration with missing password', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/register');

  // Fill in the registration form fields with missing password and submit
    await page.fill('#username', 'kwasong');
    await page.fill('#confirmPassword', 'NewUserPassword!');
    await page.click('button[type="submit"]');

  // Expect an error message to be visible
    const errorMessage = await page.locator('#flash');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('All fields are required.');
})

test('Registration with mismatched passwords', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/register');

  // Fill in the registration form fields with mismatched passwords and submit
    await page.fill('#username', 'kwasong');
    await page.fill('#password', 'NewUserPassword!');
    await page.fill('#confirmPassword', 'DifferentPassword!');
    await page.click('button[type="submit"]');

  // Expect an error message to be visible
    const errorMessage = await page.locator('#flash');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('Passwords do not match.');
})