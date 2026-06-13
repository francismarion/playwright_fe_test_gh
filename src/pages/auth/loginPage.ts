import { expect, type Page } from '@playwright/test';

export class LoginPage {
	constructor(private page: Page) {}

	private get credentialsBlock() {
		return this.page.locator('[data-test="login-credentials"]');
	}

	private get form() {
		return this.page.locator('form');
	}

	private get usernameInput() {
		return this.page.locator('[data-test="username"]');
	}

	private get passwordInput() {
		return this.page.locator('[data-test="password"]');
	}

	private get loginButton() {
		return this.page.locator('[data-test="login-button"]');
	}

	private get error() {
		return this.page.locator('[data-test="error"]');
	}

	private get swagLabel() {
		return this.page.locator('text=Swag Labs');
	}

	async goto(url = process.env.BASE_URL ?? 'https://www.saucedemo.com/') {
		await this.page.goto(url);
		await this.page.waitForLoadState('domcontentloaded');
	}

	/**
	 * Fill credentials and click login.
	 * By default waits for networkidle after click; pass options to change behavior.
	 */
	async login(
		username = 'standard_user',
		password = 'secret_sauce',
		options: { waitForNavigation?: boolean } = { waitForNavigation: true }
	) {
		if ((await this.credentialsBlock.count()) > 0) {
			await this.credentialsBlock.first().dblclick().catch(() => {});
		}

		await this.form.click().catch(() => {});
		await this.usernameInput.fill(username);
		await this.usernameInput.press('Tab').catch(() => {});
		await this.passwordInput.fill(password);

		const click = this.loginButton.click();
		if (options.waitForNavigation) {
			await Promise.all([click, this.page.waitForLoadState('networkidle')]);
		} else {
			await click;
		}
	}

	async loginAndExpect(username?: string, password?: string) {
		await this.login(username, password, { waitForNavigation: true });
		await this.expectLoggedIn();
	}

	async expectLoggedIn() {
		await expect(this.swagLabel).toBeVisible();
	}

	async expectErrorVisible() {
		await expect(this.error).toBeVisible();
	}

	// Backwards-compatible alias for older tests
	async lockedUserLogged() {
		await this.expectErrorVisible();
	}

	async isLoggedIn(): Promise<boolean> {
		return (await this.swagLabel.count()) > 0;
	}

	async isErrorVisible(): Promise<boolean> {
		if ((await this.error.count()) === 0) return false;
		return await this.error.isVisible().catch(() => false);
	}
}
