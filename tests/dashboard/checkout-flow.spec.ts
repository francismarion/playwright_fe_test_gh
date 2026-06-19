import { test, expect } from '@playwright/test';

test.describe('Checkout Flow', () => {
  test('Successful checkout with standard_user', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('/');

    // 2. Enter username standard_user and password secret_sauce
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 3. Click login and verify the products page is visible
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html$/);
    await expect(page.locator('text=Products')).toBeVisible();

    // 4. Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 5. Navigate to the cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html$/);

    // 6. Click Checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html$/);

    // 7. Enter checkout information with first name, last name, and postal code
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 8. Click Continue
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two.html$/);

    // 9. Click Finish
    await page.locator('[data-test="finish"]').click();

    // 10. Verify the completion page shows "THANK YOU FOR YOUR ORDER"
    await expect(page).toHaveURL(/.*checkout-complete.html$/);
    await expect(page.locator('text=THANK YOU FOR YOUR ORDER')).toBeVisible();
  });

  test('Checkout validation error when last name is missing', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('/');

    // 2. Enter username standard_user and password secret_sauce
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');

    // 3. Click login and verify the products page is visible
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/.*inventory.html$/);
    await expect(page.locator('text=Products')).toBeVisible();

    // 4. Add the first product to the cart
    await page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // 5. Navigate to the cart
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart.html$/);

    // 6. Click Checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html$/);

    // 7. Enter first name and postal code, leaving last name blank
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="postalCode"]').fill('12345');

    // 8. Click Continue
    await page.locator('[data-test="continue"]').click();

    // 9. Verify the error message "Error: Last Name is required" is visible
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');
  });
});
