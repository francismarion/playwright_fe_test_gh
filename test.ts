// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.locator('#login_button_container').click();
//   await page.locator('[data-test="username"]').click();
//   await page.locator('[data-test="username"]').click();
//   await page.locator('[data-test="username"]').fill('standard_user');
//   await page.locator('[data-test="username"]').press('Tab');
//   await page.locator('[data-test="password"]').fill('secret_sauce');
//   await page.locator('[data-test="password"]').press('Enter');
//   await page.locator('[data-test="login-button"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
//   await page.locator('[data-test="shopping-cart-link"]').click();
//   await page.locator('[data-test="continue-shopping"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
//   await page.locator('[data-test="inventory-item-description"]').nth(2).click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
//   await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
//   await page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
//   await page.locator('[data-test="shopping-cart-link"]').click();
//   await page.locator('[data-test="shopping-cart-link"]').click();
//   await page.locator('[data-test="cart-list"]').click();
//   await page.getByText('1Sauce Labs Bike LightA red').click();
//   await page.getByText('1Sauce Labs Backpackcarry.').click();
//   await page.getByText('1Sauce Labs Bolt T-ShirtGet').click();
//   await page.getByText('1Sauce Labs OnesieRib snap').click();
// });