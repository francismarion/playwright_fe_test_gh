# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: saucedemo-login.spec.ts >> Sauce Demo Login >> Negative login with invalid username
- Location: tests\saucedemo-login.spec.ts:36:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/saucedemo\.com\/?$/
Received string:  "https://www.saucedemo.com/"
Timeout: 1000ms

Call log:
  - Expect "toHaveURL" with timeout 1000ms
    11 × unexpected value "https://www.saucedemo.com/"

```

```yaml
- text: Swag Labs
- textbox "Username": invalid_user
- textbox "Password": secret_sauce
- 'heading "Epic sadface: Username and password do not match any user in this service" [level=3]':
  - button
  - text: "Epic sadface: Username and password do not match any user in this service"
- button "Login"
- heading "Accepted usernames are:" [level=4]
- text: standard_user locked_out_user problem_user performance_glitch_user error_user visual_user
- heading "Password for all users:" [level=4]
- text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Sauce Demo Login', () => {
  4  |   const loginUrl = '/';
  5  |   const inventoryUrl = /.*\/inventory\.html$/;
  6  |   const usernameLocator = 'input[placeholder="Username"]';
  7  |   const passwordLocator = 'input[placeholder="Password"]';
  8  |   const loginButtonLocator = 'input[data-test="login-button"]';
  9  |   const errorLocator = '[data-test="error"]';
  10 |   const productTitleLocator = '.title';
  11 |   const productItemLocator = '.inventory_item';
  12 | 
  13 |   test('Successful login with standard_user', async ({ page }) => {
  14 |     // 1. Navigate to https://www.saucedemo.com
  15 |     await page.goto(loginUrl);
  16 |     await expect(page).toHaveTitle('Swag Labs');
  17 |     await expect(page.locator(usernameLocator)).toBeVisible();
  18 |     await expect(page.locator(passwordLocator)).toBeVisible();
  19 |     await expect(page.locator(loginButtonLocator)).toBeVisible();
  20 | 
  21 |     // 2. Enter username 'standard_user'
  22 |     await page.locator(usernameLocator).fill('standard_user');
  23 |     await expect(page.locator(usernameLocator)).toHaveValue('standard_user');
  24 | 
  25 |     // 3. Enter password 'secret_sauce'
  26 |     await page.locator(passwordLocator).fill('secret_sauce');
  27 |     await expect(page.locator(passwordLocator)).toHaveValue('secret_sauce');
  28 | 
  29 |     // 4. Click the login button
  30 |     await page.locator(loginButtonLocator).click();
  31 |     await expect(page).toHaveURL(inventoryUrl);
  32 |     await expect(page.locator(productTitleLocator)).toHaveText('Products');
  33 |     await expect(page.locator(productItemLocator).first()).toBeVisible();
  34 |   });
  35 | 
  36 |   test('Negative login with invalid username', async ({ page }) => {
  37 |     // 1. Navigate to https://www.saucedemo.com
  38 |     await page.goto(loginUrl);
  39 |     await expect(page.locator(usernameLocator)).toBeVisible();
  40 |     await expect(page.locator(passwordLocator)).toBeVisible();
  41 | 
  42 |     // 2. Enter username 'invalid_user'
  43 |     await page.locator(usernameLocator).fill('invalid_user');
  44 |     await expect(page.locator(usernameLocator)).toHaveValue('invalid_user');
  45 | 
  46 |     // 3. Enter password 'secret_sauce'
  47 |     await page.locator(passwordLocator).fill('secret_sauce');
  48 |     await expect(page.locator(passwordLocator)).toHaveValue('secret_sauce');
  49 | 
  50 |     // 4. Click the login button
  51 |     await page.locator(loginButtonLocator).click();
> 52 |     await expect(page).toHaveURL(/.*\/saucedemo\.com\/?$/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  53 |     await expect(page.locator(errorLocator)).toBeVisible();
  54 |     await expect(page.locator(errorLocator)).toContainText('Username and password do not match any user in this service');
  55 |   });
  56 | 
  57 |   test('Negative login with invalid password', async ({ page }) => {
  58 |     // 1. Navigate to https://www.saucedemo.com
  59 |     await page.goto(loginUrl);
  60 |     await expect(page.locator(usernameLocator)).toBeVisible();
  61 |     await expect(page.locator(passwordLocator)).toBeVisible();
  62 | 
  63 |     // 2. Enter username 'standard_user'
  64 |     await page.locator(usernameLocator).fill('standard_user');
  65 |     await expect(page.locator(usernameLocator)).toHaveValue('standard_user');
  66 | 
  67 |     // 3. Enter password 'wrong_password'
  68 |     await page.locator(passwordLocator).fill('wrong_password');
  69 |     await expect(page.locator(passwordLocator)).toHaveValue('wrong_password');
  70 | 
  71 |     // 4. Click the login button
  72 |     await page.locator(loginButtonLocator).click();
  73 |     await expect(page).toHaveURL(/.*\/saucedemo\.com\/?$/);
  74 |     await expect(page.locator(errorLocator)).toBeVisible();
  75 |     await expect(page.locator(errorLocator)).toContainText('Username and password do not match any user in this service');
  76 |   });
  77 | 
  78 |   test('Negative login with locked out user', async ({ page }) => {
  79 |     // 1. Navigate to https://www.saucedemo.com
  80 |     await page.goto(loginUrl);
  81 |     await expect(page.locator(usernameLocator)).toBeVisible();
  82 |     await expect(page.locator(passwordLocator)).toBeVisible();
  83 | 
  84 |     // 2. Enter username 'locked_out_user'
  85 |     await page.locator(usernameLocator).fill('locked_out_user');
  86 |     await expect(page.locator(usernameLocator)).toHaveValue('locked_out_user');
  87 | 
  88 |     // 3. Enter password 'secret_sauce'
  89 |     await page.locator(passwordLocator).fill('secret_sauce');
  90 |     await expect(page.locator(passwordLocator)).toHaveValue('secret_sauce');
  91 | 
  92 |     // 4. Click the login button
  93 |     await page.locator(loginButtonLocator).click();
  94 |     await expect(page).toHaveURL(/.*\/saucedemo\.com\/?$/);
  95 |     await expect(page.locator(errorLocator)).toBeVisible();
  96 |     await expect(page.locator(errorLocator)).toContainText('Sorry, this user has been locked out.');
  97 |   });
  98 | });
  99 | 
```