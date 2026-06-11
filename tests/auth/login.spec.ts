import { test, expect } from '../../src/fixtures/app.fixture';
import {USERNAME, PASSWORD} from '../../src/utils/dotenvloader'

test('can login with valid credentials', async ({ app }) => {
  await app.page.goto('/');
  await app.login(USERNAME, PASSWORD);
  await expect(app.page.locator('text=Swag Labs')).toBeVisible();
});
