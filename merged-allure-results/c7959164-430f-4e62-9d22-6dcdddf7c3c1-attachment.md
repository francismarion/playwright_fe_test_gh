# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard\checkout.spec.ts >> checkout using error user
- Location: tests\dashboard\checkout.spec.ts:69:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-test=error]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('[data-test=error]')

```

```yaml
- button "Open Menu"
- img "Open Menu"
- text: "Swag Labs 3 Checkout: Your Information"
- textbox "First Name": x
- textbox "Last Name"
- textbox "Zip/Postal Code": x
- button "Go back Cancel":
  - img "Go back"
  - text: Cancel
- button "Continue"
- contentinfo:
  - list:
    - listitem:
      - link "Twitter":
        - /url: https://twitter.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1   | import { Page, expect } from '@playwright/test';
  2   | 
  3   | export class CartPage {
  4   |   constructor(private page: Page) {}
  5   | 
  6   |   private get cartItems() {
  7   |     return this.page.locator('.cart_item');
  8   |   }
  9   | 
  10  |   private itemNameLocator(item: string) {
  11  |     return this.page.locator('[data-test="inventory-item-name"]', { hasText: item });
  12  |   }
  13  | 
  14  |   private get checkoutButton() {
  15  |     return this.page.locator('[data-test="checkout"]');
  16  |   }
  17  | 
  18  |   private get continueButton() {
  19  |     return this.page.locator('[data-test="continue"]');
  20  |   }
  21  | 
  22  |   private get finishButton() {
  23  |     return this.page.locator('[data-test="finish"]');
  24  |   }
  25  | 
  26  |   private get firstNameField() {
  27  |     return this.page.locator('[data-test="firstName"]');
  28  |   }
  29  | 
  30  |   private get lastNameField() {
  31  |     return this.page.locator('[data-test="lastName"]');
  32  |   }
  33  | 
  34  |   private get postalCodeField() {
  35  |     return this.page.locator('[data-test="postalCode"]');
  36  |   }
  37  | 
  38  |   private get itemPriceLocator() {
  39  |     return this.page.locator('[data-test="inventory-item-price"]');
  40  |   }
  41  | 
  42  |   private get subtotalLabel() {
  43  |     return this.page.locator('[data-test="subtotal-label"]');
  44  |   }
  45  | 
  46  |   private get totalLabel() {
  47  |     return this.page.locator('[data-test="total-label"]');
  48  |   }
  49  | 
  50  |   async assertCartContains(expectedItems: string[]) {
  51  |     for (const item of expectedItems) {
  52  |       await expect(this.itemNameLocator(item)).toBeVisible();
  53  |     }
  54  |     await expect(this.cartItems).toHaveCount(expectedItems.length);
  55  |   }
  56  | 
  57  |   async clickCheckout() {
  58  |     await this.checkoutButton.click();
  59  |     await this.page.waitForLoadState('domcontentloaded');
  60  |   }
  61  | 
  62  |   async clickContinue() {
  63  |     await this.continueButton.click();
  64  |     await this.page.waitForLoadState('domcontentloaded');
  65  |   }
  66  | 
  67  |   async clickFinish() {
  68  |     await this.finishButton.click();
  69  |     await this.page.waitForLoadState('networkidle');
  70  |   }
  71  | 
  72  |   async populateInformation(first: string, last: string, postal: string) {
  73  |     await this.firstNameField.fill(first);
  74  |     await this.lastNameField.fill(last);
  75  |     await this.postalCodeField.fill(postal);
  76  | 
  77  |     // await expect(this.page.locator('[data-test="firstName"]')).toHaveValue(first);
  78  |     // await expect(this.page.locator('[data-test="lastName"]')).toHaveValue(last);
  79  |     // await expect(this.page.locator('[data-test="postalCode"]')).toHaveValue(postal);
  80  |   }
  81  | 
  82  |   async assertCartTotals() {
  83  |     const prices = await this.itemPriceLocator.allTextContents();
  84  |     const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
  85  |     const sum = numericPrices.reduce((acc, val) => acc + val, 0);
  86  | 
  87  |     const subtotalText = await this.subtotalLabel.textContent();
  88  |     if (!subtotalText) throw new Error('Subtotal label not found');
  89  |     const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
  90  | 
  91  |     const totalText = await this.totalLabel.textContent();
  92  |     if (!totalText) throw new Error('Total label not found');
  93  |     const displayedTotal = parseFloat(totalText.replace('Total: $', ''));
  94  | 
  95  |     expect(sum).toBeCloseTo(displayedSubtotal, 2);
  96  |     expect(displayedTotal).toBeGreaterThanOrEqual(displayedSubtotal);
  97  |   }
  98  | 
  99  |   async assertFieldRequiredErrorMessage(errorMessage: string) {
  100 |     const error = this.page.locator('[data-test=error]')
> 101 |     await expect(error).toBeVisible();
      |                         ^ Error: expect(locator).toBeVisible() failed
  102 |     await expect(error).toHaveText(errorMessage)
  103 |   }
  104 | }
```