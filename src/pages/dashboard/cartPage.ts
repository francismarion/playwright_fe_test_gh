import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    async assertCartContains(expectedItems: string[]) {
    for (const item of expectedItems) {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: item })).toBeVisible();
  }
    await expect(this.page.locator('.cart_item')).toHaveCount(expectedItems.length);
}

  async clickCheckout() {
    await this.page.locator('[data-test="checkout"]').click();
  }

  async clickContinue() { 
    await this.page.locator('[data-test="continue"]').click();
  }

  async clickFinish() {
    await this.page.locator('[data-test="finish"]').click();

  }

  async populateInformation(first: string, last: string, postal: string) {
    await this.page.locator('[data-test="firstName"]').fill(first);
    await this.page.locator('[data-test="lastName"]').fill(last);
    await this.page.locator('[data-test="postalCode"]').fill(postal);
}

async assertCartTotals() {
  // Collect all item prices from the cart
  const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  const sum = numericPrices.reduce((acc, val) => acc + val, 0);

  // Subtotal from checkout summary
  const subtotalText = await this.page.locator('[data-test="subtotal-label"]').textContent();
  if (!subtotalText) throw new Error('Subtotal label not found');
  const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));

  // Final total (includes tax)
  const totalText = await this.page.locator('[data-test="total-label"]').textContent();
  if (!totalText) throw new Error('Total label not found');
  const displayedTotal = parseFloat(totalText.replace('Total: $', ''));

  // Assertions
  expect(sum).toBeCloseTo(displayedSubtotal, 2);   // items sum matches subtotal
  expect(displayedTotal).toBeGreaterThanOrEqual(displayedSubtotal); // total >= subtotal
}





}