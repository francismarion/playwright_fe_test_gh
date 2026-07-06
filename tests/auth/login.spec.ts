import { log } from 'node:console';
import { test, expect } from '../../src/fixtures/app.fixture';
import { LoginPage } from '../../src/pages/auth/loginPage';
import { ProductPage } from '../../src/pages/dashboard/homePage'; 
import { USERNAME, PASSWORD, LOCKED_USERNAME, ERROR_USERNAME } from '../../src/utils/dotenvloader';


test('can login with valid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto('/');
  await login.login(USERNAME, PASSWORD);
  await login.expectLoggedIn();
});

test('login with locked credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto('/');
  await login.login(LOCKED_USERNAME, PASSWORD);
  await login.lockedUserLogged();

});

test('login error user', async ({ page }) => {
  const login = new LoginPage(page)
  const homepage = new ProductPage(page)
  await login.goto('/')
  await login.login(ERROR_USERNAME, PASSWORD)
  await login.expectLoggedIn();
  await homepage.addAllProductsToCart();
  await homepage.allItemsNotSelected();

})
test('login with glitched credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto('/');
  await login.login(LOCKED_USERNAME, PASSWORD);
  await login.lockedUserLogged();

});

// test('login with glitched credentials with 3g network', async ({ page }) => {
//   const client = await page.context().newCDPSession(page);
//   await client.send('Network.emulateNetworkConditions', {
//     offline: false,
//     downloadThroughput: 6400,
//     uploadThroughput: 3200,
//     latency: 500000

//   })
//   const login = new LoginPage(page);
//   await login.goto('/');
//   await login.login(LOCKED_USERNAME, PASSWORD);
//   await login.lockedUserLogged();

// });
