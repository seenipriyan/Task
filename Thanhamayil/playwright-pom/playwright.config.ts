import { defineConfig, devices } from '@playwright/test';
 
/**
 * Playwright configuration for Thangamayil Admin Panel testing
 */
export default defineConfig({
  testDir: './tests',
 
  // Run tests in files in parallel
  fullyParallel: true,
 
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
 
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
 
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
 
  // Reporter to use
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
 
  // Global settings
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'https://preprodadminpanel.thangamayil.in',
 
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
 
    // Take screenshot on failure
    screenshot: 'only-on-failure',
 
    // Record video on failure
    video: 'retain-on-failure',
 
    // Global timeout for each action
    actionTimeout: 10000,
 
    // Global timeout for navigation
    navigationTimeout: 30000,
 
    // Ignore HTTPS errors for testing environments
    ignoreHTTPSErrors: true,
 
    // Set viewport size
    viewport: { width: 1280, height: 720 },
 
    // User agent
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },
 
  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
 
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
 
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
 
    // Mobile tests
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
 
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
 
    // Tablet tests
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    }
  ],
 
  // Run your local dev server before starting the tests
  webServer: {
    command: 'echo "No local server needed for external testing"',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
 
  // Global setup and teardown
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),
 
  // Test timeout
  timeout: 60000,
 
  // Expect timeout
  expect: {
    timeout: 10000
  },
 
  // Output directory for test artifacts
  outputDir: 'test-results/',
});
 

 