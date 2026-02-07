import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting Playwright test setup...');
  
  // Create screenshots directory if it doesn't exist
  const fs = require('fs');
  const path = require('path');
  
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    console.log('📁 Created screenshots directory');
  }
  
  // Create test-results directory if it doesn't exist
  const testResultsDir = path.join(process.cwd(), 'test-results');
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
    console.log('📁 Created test-results directory');
  }
  
  // Test environment variables
  const testUrl = process.env.TEST_URL || 'https://preprodadminpanel.thangamayil.in';
  const testUsername = process.env.TEST_USERNAME || 'gnanapriya.s@thangamayil.com';
  const testPassword = process.env.TEST_PASSWORD || 'Welcome@123';
  
  console.log(`🌐 Test URL: ${testUrl}`);
  console.log(`👤 Test Username: ${testUsername}`);
  console.log(`🔑 Password: ${'*'.repeat(testPassword.length)}`);
  
  // Validate test environment
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('🔍 Checking if test environment is accessible...');
    await page.goto(testUrl, { timeout: 30000 });
    
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    if (title.includes('Thangamayil') || title.includes('Admin')) {
      console.log('✅ Test environment is accessible');
    } else {
      console.log('⚠️  Test environment may not be the expected page');
    }
  } catch (error) {
    console.error('❌ Test environment is not accessible:', error);
    throw new Error('Test environment setup failed');
  } finally {
    await browser.close();
  }
  
  console.log('✅ Playwright test setup completed successfully');
}

export default globalSetup;
