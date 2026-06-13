import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private get cartItems() {
    return this.page.locator('.cart_item');
  }

  private itemNameLocator(item: string) {
    return this.page.locator('[data-test="inventory-item-name"]', { hasText: item });
  }

  private get checkoutButton() {
    return this.page.locator('[data-test="checkout"]');
  }

  private get continueButton() {
    return this.page.locator('[data-test="continue"]');
  }

  private get finishButton() {
    return this.page.locator('[data-test="finish"]');
  }

  private get firstNameField() {
    return this.page.locator('[data-test="firstName"]');
  }

  private get lastNameField() {
    return this.page.locator('[data-test="lastName"]');
  }

  private get postalCodeField() {
    return this.page.locator('[data-test="postalCode"]');
  }

  private get itemPriceLocator() {
    return this.page.locator('[data-test="inventory-item-price"]');
  }

  private get subtotalLabel() {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  private get totalLabel() {
    return this.page.locator('[data-test="total-label"]');
  }

  async assertCartContains(expectedItems: string[]) {
    for (const item of expectedItems) {
      await expect(this.itemNameLocator(item)).toBeVisible();
    }
    await expect(this.cartItems).toHaveCount(expectedItems.length);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickFinish() {
    await this.finishButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async populateInformation(first: string, last: string, postal: string) {
    await this.firstNameField.fill(first);
    await this.lastNameField.fill(last);
    await this.postalCodeField.fill(postal);
  }

  async assertCartTotals() {
    const prices = await this.itemPriceLocator.allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sum = numericPrices.reduce((acc, val) => acc + val, 0);

    const subtotalText = await this.subtotalLabel.textContent();
    if (!subtotalText) throw new Error('Subtotal label not found');
    const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));

    const totalText = await this.totalLabel.textContent();
    if (!totalText) throw new Error('Total label not found');
    const displayedTotal = parseFloat(totalText.replace('Total: $', ''));

    expect(sum).toBeCloseTo(displayedSubtotal, 2);
    expect(displayedTotal).toBeGreaterThanOrEqual(displayedSubtotal);
  }
}