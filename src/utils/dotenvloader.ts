// playwright_test/utils/dotenv.loader.ts
import * as dotenv from 'dotenv';
dotenv.config(); // load .env file

// Export the variables
export const USERNAME = process.env.TEST_USERNAME ?? '';
export const PASSWORD = process.env.TEST_PASSWORD ?? '';
export const API_BASE_URL = process.env.API_BASE_URL ?? '';