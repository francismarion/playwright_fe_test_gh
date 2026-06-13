import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  private get products() {
    return this.page.locator('.inventory_item');
  }

  private productAddButtonByIndex(index: number) {
    return this.products.nth(index).locator('button');
  }

  private productNameLocator(item: string) {
    return this.page.locator('[data-test="inventory-item-name"]', { hasText: item });
  }

  private get cartLink() {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCartByIndex(index: number) {
    await this.productAddButtonByIndex(index).click();
  }

  async addItemToCartByName(name: string) {
    const button = this.page.locator('.inventory_item', { has: this.page.locator('[data-test="inventory-item-name"]', { hasText: name }) }).locator('button');
    await button.first().click();
  }

  async addAllProductsToCart() {
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      await this.productAddButtonByIndex(i).click();
    }
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async assertCartContains(expectedItems: string[]) {
    for (const item of expectedItems) {
      await expect(this.productNameLocator(item)).toBeVisible();
    }
    await expect(this.page.locator('.cart_item')).toHaveCount(expectedItems.length);
  }
}