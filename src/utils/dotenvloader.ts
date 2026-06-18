// playwright_test/utils/dotenv.loader.ts
import * as dotenv from 'dotenv';
dotenv.config(); // load .env file

// Export the variables
export const USERNAME = process.env.TEST_USERNAME ?? '';
export const PASSWORD = process.env.TEST_PASSWORD ?? '';
export const LOCKED_USERNAME = process.env.LOCKED_USER ?? '';
export const API_BASE_URL = process.env.API_BASE_URL ?? '';
export const ERROR_USERNAME = process.env.ERROR_USERNAME
export const PROBLEM_USERNAME = process.env.PROBLEM_USERNAME ?? ''
export const GLITCH_USERNAME = process.env.GLITCH_USERNAME ?? ''