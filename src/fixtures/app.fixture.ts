import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { USERNAME, PASSWORD, API_BASE_URL } from '../utils/dotenvloader';

type AppFixture = {
	app: {
		page: Page;
		login: (username?: string, password?: string, url?: string) => Promise<void>;
		logout: () => Promise<void>;
	};
};

export const test = base.extend<AppFixture>({
	app: async ({ page }, use) => {
		const app = {
			page,
			login: async (username = USERNAME, password = PASSWORD) => {
				const baseUrl = API_BASE_URL
				await page.goto(baseUrl);

	
				// Ensure form is focused then fill fields using data-test selectors
				await page.locator('form').click().catch(() => {});
				await page.locator('[data-test="username"]').click();
				await page.locator('[data-test="username"]').fill(username);
				// some sites expect a Tab to move to the password field
				await page.locator('[data-test="username"]').press('Tab').catch(() => {});
				await page.locator('[data-test="password"]').fill(password);
				await page.locator('[data-test="login-button"]').click();
				await page.waitForLoadState('networkidle');
			},
			logout: async () => {
				// Saucedemo logout flow: open the burger menu and click logout if present
				const menuBtn = page.locator('#react-burger-menu-btn');
				if ((await menuBtn.count()) > 0) {
					await menuBtn.click().catch(() => {});
					const logoutLink = page.locator('#logout_sidebar_link');
					if ((await logoutLink.count()) > 0) {
						await logoutLink.click().catch(() => {});
						await page.waitForLoadState('networkidle');
						return;
					}
				}

				// Fallback: try an aria logout button
				await page.locator('button[aria-label="Logout"]').click().catch(() => {});
				await page.waitForLoadState('networkidle');
			},
		};

		await app.login();
		await use(app);
	},
});

export { expect };

console.log(USERNAME)
console.log(PASSWORD)
