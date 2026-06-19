# Sauce Demo Login Test Plan

## Application Overview

Test the Sauce Demo login page at https://www.saucedemo.com using credentials from the application. Cover the standard happy login flow plus key negative login cases.

## Test Scenarios

### 1. Sauce Demo Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard_user

**File:** `tests/saucedemo-login-plan.md`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: The login page loads and displays the title 'Swag Labs'
    - expect: A username field, password field, and login button are visible
  2. Enter username 'standard_user'
    - expect: The username input contains 'standard_user'
  3. Enter password 'secret_sauce'
    - expect: The password input contains 'secret_sauce'
  4. Click the login button
    - expect: The app navigates to /inventory.html
    - expect: The page title remains 'Swag Labs'
    - expect: The inventory page displays the heading 'Products'
    - expect: A list of products is visible

#### 1.2. Negative login with invalid username

**File:** `tests/saucedemo-login-plan.md`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: The login page loads and displays the login form
  2. Enter username 'invalid_user'
    - expect: The username input contains 'invalid_user'
  3. Enter password 'secret_sauce'
    - expect: The password input contains 'secret_sauce'
  4. Click the login button
    - expect: The login stays on the login page
    - expect: An error message appears
    - expect: The error message text contains 'Username and password do not match any user in this service'

#### 1.3. Negative login with invalid password

**File:** `tests/saucedemo-login-plan.md`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: The login page loads and displays the login form
  2. Enter username 'standard_user'
    - expect: The username input contains 'standard_user'
  3. Enter password 'wrong_password'
    - expect: The password input contains 'wrong_password'
  4. Click the login button
    - expect: The login stays on the login page
    - expect: An error message appears
    - expect: The error message text contains 'Username and password do not match any user in this service'

#### 1.4. Negative login with locked out user

**File:** `tests/saucedemo-login-plan.md`

**Steps:**
  1. Navigate to https://www.saucedemo.com
    - expect: The login page loads and displays the login form
  2. Enter username 'locked_out_user'
    - expect: The username input contains 'locked_out_user'
  3. Enter password 'secret_sauce'
    - expect: The password input contains 'secret_sauce'
  4. Click the login button
    - expect: The login stays on the login page
    - expect: An error message appears
    - expect: The error message text contains 'Sorry, this user has been locked out.'
