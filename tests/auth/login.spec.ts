import { test, expect } from '../../src/fixtures/app.fixture';
import { LoginPage } from '../../src/pages/auth/loginPage';
import { USERNAME, PASSWORD, LOCKED_USERNAME } from '../../src/utils/dotenvloader';


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
