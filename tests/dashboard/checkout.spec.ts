import { test, expect } from '@playwright/test';
import { ProductPage } from '../../src/pages/dashboard/homePage'; // adjust path as needed
import { CartPage } from '../../src/pages/dashboard/cartPage';
import { LoginPage } from '../../src/pages/auth/loginPage';
import { USERNAME, PASSWORD, LOCKED_USERNAME, ERROR_USERNAME, PROBLEM_USERNAME } from '../../src/utils/dotenvloader';


// test('add all products to cart', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');
//   await page.locator('[data-test="username"]').fill('standard_user');
//   await page.locator('[data-test="password"]').fill('secret_sauce');
//   await page.locator('[data-test="login-button"]').click();

//   // Use the POM
//   const products = new ProductPage(page);
//   const carts = new CartPage(page);

//   // Add all products
//   await products.addAllProductsToCart();

//   // Go to cart
//   await products.goToCart();

//   //Assert items
//   await carts.assertCartContains([
//    'Sauce Labs Bike Light',
//   'Sauce Labs Backpack',
//   'Sauce Labs Bolt T-Shirt',
//   'Sauce Labs Onesie',
//   'Sauce Labs Fleece Jacket',
//   'Test.allTheThings() T-Shirt (Red)'
//   ])

//   //checkout
//   await carts.clickCheckout();


//   //populate information
//   await carts.populateInformation('x', 'x', '1213')
//   await carts.clickContinue();

//   //check prices
//   await carts.assertCartTotals();

//   //finish
//   await carts.clickFinish();

// });

test('checkout using error user', async ({ page }) => {
  const login = new LoginPage(page)
  const homepage = new ProductPage(page)
  const carts = new CartPage(page)
  await login.goto('/')
  await login.login(ERROR_USERNAME, PASSWORD)
  await login.expectLoggedIn();
  await homepage.addAllProductsToCart();

  await homepage.goToCart()
  await carts.clickCheckout()
  await carts.populateInformation(
    "x",
    "x",
    "x"
  )

}) 

test('checkout using problem user', async ({ page }) => {
  const login = new LoginPage(page)
  const homepage = new ProductPage(page)
  const carts = new CartPage(page)
  await login.goto('/')
  await login.login(PROBLEM_USERNAME, PASSWORD)
  await login.expectLoggedIn();
  await homepage.addAllProductsToCart();

  await homepage.goToCart()
  await carts.clickCheckout()
  await carts.populateInformation(
    "x",
    "x",
    "x"
  )
  await carts.clickContinue()
  await carts.assertFieldRequiredErrorMessage("Error: Last Name is required")

}) 


