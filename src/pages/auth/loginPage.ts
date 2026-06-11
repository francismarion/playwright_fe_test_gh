import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
	readonly page: Page;

	private usernameInput: Locator;
	private passwordInput: Locator;
	private loginButton: Locator;
	private credentialsBlock: Locator;
	private form: Locator;

	constructor(page: Page) {
		this.page = page;
		this.credentialsBlock = page.locator('[data-test="login-credentials"]');
		this.form = page.locator('form');
		this.usernameInput = page.locator('[data-test="username"]');
		this.passwordInput = page.locator('[data-test="password"]');
		this.loginButton = page.locator('[data-test="login-button"]');
	}

	async goto(url = process.env.BASE_URL ?? 'https://www.saucedemo.com/') {
		await this.page.goto(url);
	}

	async login(username = 'standard_user', password = 'secret_sauce') {
		if ((await this.credentialsBlock.count()) > 0) {
			await this.credentialsBlock.first().dblclick().catch(() => {});
		}

		await this.form.click().catch(() => {});
		await this.usernameInput.click();
		await this.usernameInput.fill(username);
		await this.usernameInput.press('Tab').catch(() => {});
		await this.passwordInput.fill(password);
		await this.loginButton.click();
		await this.page.waitForLoadState('networkidle');
	}

	async expectLoggedIn() {
		await expect(this.page.locator('text=Swag Labs')).toBeVisible();
	}
}

