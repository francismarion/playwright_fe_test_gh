import { Page, expect } from '@playwright/test';

export class ProductPage {
    constructor(private page: Page) {}

    async addItemToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async addToCart() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    async assertCartContains(expectedItems: string[]) {
    for (const item of expectedItems) {
    await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: item })).toBeVisible();
  }
    await expect(this.page.locator('.cart_item')).toHaveCount(expectedItems.length);
}


  async addAllProductsToCart() {
    const products = this.page.locator('.inventory_item');
    const count = await products.count();
    for (let i = 0; i < count; i++) {
      await products.nth(i).locator('button').click();
    }
  }

  async goToCart() { 
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

}