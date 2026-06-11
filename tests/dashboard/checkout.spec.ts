import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/dashboard/homePage'; // adjust path as needed
import { CartPage } from '../../src/pages/dashboard/cartPage';

test('add all products to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Use the POM
  const products = new ProductPage(page);
  const carts = new CartPage(page);

  // Add all products
  await products.addAllProductsToCart();

  // Go to cart
  await products.goToCart();

  //Assert items
  await carts.assertCartContains([
   'Sauce Labs Bike Light',
  'Sauce Labs Backpack',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Onesie',
  'Sauce Labs Fleece Jacket',
  'Test.allTheThings() T-Shirt (Red)'
  ])

  //checkout
  await carts.clickCheckout();


  //populate information
  await carts.populateInformation('x', 'x', '1213')
  await carts.clickContinue();

  //check prices
  await carts.assertCartTotals();

  //finish
  await carts.clickFinish();

});


