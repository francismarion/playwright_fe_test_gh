import { test, expect } from '@playwright/test';

test.describe('Sauce Demo Login', () => {
  const loginUrl = '/';
  const inventoryUrl = /.*\/inventory\.html$/;
  const usernameLocator = 'input[placeholder="Username"]';
  const passwordLocator = 'input[placeholder="Password"]';
  const loginButtonLocator = 'input[data-test="login-button"]';
  const errorLocator = '[data-test="error"]';
  const productTitleLocator = '.title';
  const productItemLocator = '.inventory_item';

  test('Successful login with standard_user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto(loginUrl);
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.locator(usernameLocator)).toBeVisible();
    await expect(page.locator(passwordLocator)).toBeVisible();
    await expect(page.locator(loginButtonLocator)).toBeVisible();

    // 2. Enter username 'standard_user'
    await page.locator(usernameLocator).fill('standard_user');
    await expect(page.locator(usernameLocator)).toHaveValue('standard_user');

    // 3. Enter password 'secret_sauce'
    await page.locator(passwordLocator).fill('secret_sauce');
    await expect(page.locator(passwordLocator)).toHaveValue('secret_sauce');

    // 4. Click the login button
    await page.locator(loginButtonLocator).click();
    await expect(page).toHaveURL(inventoryUrl);
    await expect(page.locator(productTitleLocator)).toHaveText('Products');
    await expect(page.locator(productItemLocator).first()).toBeVisible();
  });

  test('Negative login with invalid username', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto(loginUrl);
    await expect(page.locator(usernameLocator)).toBeVisible();
    await expect(page.locator(passwordLocator)).toBeVisible();

    // 2. Enter username 'invalid_user'
    await page.locator(usernameLocator).fill('invalid_user');
    await expect(page.locator(usernameLocator)).toHaveValue('invalid_user');

    // 3. Enter password 'secret_sauce'
    await page.locator(passwordLocator).fill('secret_sauce');
    await expect(page.locator(passwordLocator)).toHaveValue('secret_sauce');

    // 4. Click the login button
    await page.locator(loginButtonLocator).click();
    // stay on login page and show error
    await expect(page.locator(errorLocator)).toBeVisible();
    await expect(page.locator(errorLocator)).toContainText('Username and password do not match any user in this service');
  });

  test('Negative login with invalid password', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto(loginUrl);
    await expect(page.locator(usernameLocator)).toBeVisible();
    await expect(page.locator(passwordLocator)).toBeVisible();

    // 2. Enter username 'standard_user'
    await page.locator(usernameLocator).fill('standard_user');
    await expect(page.locator(usernameLocator)).toHaveValue('standard_user');

    // 3. Enter password 'wrong_password'
    await page.locator(passwordLocator).fill('wrong_password');
    await expect(page.locator(passwordLocator)).toHaveValue('wrong_password');

    // 4. Click the login button
    await page.locator(loginButtonLocator).click();
    // stay on login page and show error
    await expect(page.locator(errorLocator)).toBeVisible();
    await expect(page.locator(errorLocator)).toContainText('Username and password do not match any user in this service');
  });

  test('Negative login with locked out user', async ({ page }) => {
    // 1. Navigate to https://www.saucedemo.com
    await page.goto(loginUrl);
    await expect(page.locator(usernameLocator)).toBeVisible();
    await expect(page.locator(passwordLocator)).toBeVisible();

    // 2. Enter username 'locked_out_user'
    await page.locator(usernameLocator).fill('locked_out_user');
    await expect(page.locator(usernameLocator)).toHaveValue('locked_out_user');

    // 3. Enter password 'secret_sauce'
    await page.locator(passwordLocator).fill('secret_sauce');
    await expect(page.locator(passwordLocator)).toHaveValue('secret_sauce');

    // 4. Click the login button
    await page.locator(loginButtonLocator).click();
    // stay on login page and show error
    await expect(page.locator(errorLocator)).toBeVisible();
    await expect(page.locator(errorLocator)).toContainText('Sorry, this user has been locked out.');
  });
});
