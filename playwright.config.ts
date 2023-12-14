import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';
import * as fs from 'fs';
import extraConfigurations from './test/extraSettings.json';

// Function to check if the storageState file exists
function isStorageStateAvailable() {
  try {
    // Use synchronous version of fs.accessSync to check if the file exists
    fs.accessSync('auth.json');
    return true; // The file exists
  } catch (error) {
    return false; // The file does not exist
  }
}

//variables and function used to handle Basic Auth
const basicAuthCredentions = {
  username: '',
  password: ''
};
const btoa = (str: string) => Buffer.from(str).toString('base64');
let extraUseConfigurations = {}
function handleExtraConfigurations(){
  if(extraConfigurations?.basicAuth?.enabled){
    basicAuthCredentions.username = extraConfigurations.basicAuth.username;
    basicAuthCredentions.password = extraConfigurations.basicAuth.password;
    const credentialsBase64 = btoa(`${ basicAuthCredentions.username }:${ basicAuthCredentions.password }`);
    extraUseConfigurations = {
      extraHTTPHeaders:{
        Authorization: `Basic ${credentialsBase64}`
      }
    }
  }
}
handleExtraConfigurations();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './test',
  /* Maximum time one test can run for. Set to one hour */
  timeout: 60 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 60000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: './reporter.ts',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 60000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: 'on',
    ...extraUseConfigurations
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(isStorageStateAvailable() ? { storageState: 'auth.json' } : {}),
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        ...(isStorageStateAvailable() ? { storageState: 'auth.json' } : {}),
      },
    },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
