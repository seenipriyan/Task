# Thangamayil Admin Panel - Playwright POM

A comprehensive Playwright Page Object Model (POM) implementation for testing the Thangamayil Admin Panel login functionality.

## 🚀 Features

- **Page Object Model Architecture**: Clean and maintainable test structure
- **Multi-Browser Support**: Chrome, Firefox, Safari, and mobile testing
- **Robust Element Locators**: Multiple fallback selectors for dynamic content
- **Error Handling**: Comprehensive error handling and logging
- **Screenshots & Videos**: Automatic capture on test failures
- **Accessibility Testing**: Built-in accessibility test scenarios
- **Performance Testing**: Load time measurements
- **TypeScript Support**: Full TypeScript implementation with type safety

## 📁 Project Structure

```
playwright-pom/
├── pages/
│   ├── BasePage.ts          # Base page with common utilities
│   └── LoginPage.ts         # Login page specific methods
├── tests/
│   └── login.spec.ts        # Login test scenarios
├── screenshots/             # Test screenshots
├── test-results/            # Test artifacts
├── playwright-report/       # HTML test reports
├── playwright.config.ts     # Playwright configuration
├── global-setup.ts          # Global test setup
├── global-teardown.ts       # Global test cleanup
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

## 🛠️ Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Install Playwright Browsers**:
   ```bash
   npm run install:browsers
   ```

3. **Or install everything at once**:
   ```bash
   npm run install:deps
   ```

## 🧪 Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### Environment Variables

You can customize test behavior using environment variables:

```bash
# Set custom test URL
export TEST_URL="https://preprodadminpanel.thangamayil.in/login"

# Set custom credentials
export TEST_USERNAME="your-email@example.com"
export TEST_PASSWORD="your-password"

# Run with custom environment
TEST_URL="https://your-custom-url.com" npm test
```

## 📝 Test Scenarios

The test suite includes the following test categories:

### 1. UI Tests
- Page load verification
- Element presence validation
- Form element accessibility

### 2. Functional Tests
- Successful login with valid credentials
- Error handling with invalid credentials
- Empty form submission validation

### 3. Interaction Tests
- Form filling and clearing
- Password visibility toggle
- Remember me checkbox functionality

### 4. Navigation Tests
- Forgot password link navigation
- Page routing validation

### 5. Accessibility Tests
- Keyboard navigation
- Screen reader compatibility

### 6. Performance Tests
- Page load time measurement
- Resource optimization validation

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

The configuration includes:
- Multi-browser testing (Chrome, Firefox, Safari)
- Mobile and tablet device testing
- Automatic screenshots and video recording
- Comprehensive reporting (HTML, JSON, JUnit)
- Retry logic for CI environments
- Global setup and teardown

### TypeScript Configuration (`tsconfig.json`)

Strict TypeScript configuration with:
- ES2020 target
- Strict type checking
- Modern module resolution
- Comprehensive linting rules

## 📊 Reports and Artifacts

### Test Reports
- **HTML Report**: `npm run test:report` or open `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **JUnit Report**: `test-results/results.xml`

### Screenshots
- Automatically captured on test failures
- Stored in `screenshots/` directory
- Manual screenshots can be taken using `loginPage.takeScreenshot()`

### Videos
- Recorded for failed tests
- Stored in `test-results/` directory
- Helps with debugging test failures

## 🎯 Usage Examples

### Basic Login Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateToLogin();
  await loginPage.login('user@example.com', 'password');
  
  expect(await loginPage.isLoggedIn()).toBe(true);
});
```

### Custom Test with Error Handling

```typescript
test('custom login scenario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  try {
    await loginPage.navigateToLogin();
    await loginPage.fillUsername('test@example.com');
    await loginPage.fillPassword('testpassword');
    await loginPage.clickLoginButton();
    
    // Wait for specific conditions
    await loginPage.waitForLoginComplete();
    
  } catch (error) {
    await loginPage.takeScreenshot('login-error');
    throw error;
  }
});
```

## 🔍 Debugging

### Using Playwright Inspector

```bash
# Run tests with debugging
npm run test:debug

# Or use specific test file
npx playwright test tests/login.spec.ts --debug
```

### Using Browser DevTools

```bash
# Run in headed mode and pause on failure
npx playwright test --headed --max-failures=1
```

### Code Generation

Generate new test code by recording interactions:

```bash
npm run test:codegen
```

## 🌐 Cross-Browser Testing

The configuration supports testing across multiple browsers:

```bash
# Run specific browser tests
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run mobile tests
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

## 📱 Mobile Testing

Mobile device testing is configured for:
- **Pixel 5** (Android)
- **iPhone 12** (iOS)
- **iPad Pro** (Tablet)

## 🔒 Security Considerations

- **Credentials**: Use environment variables for sensitive data
- **HTTPS**: SSL errors are ignored for testing environments
- **Data Privacy**: Test data doesn't affect production systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests or improvements
4. Ensure all tests pass
5. Submit a pull request

## 📝 Best Practices

1. **Use Page Object Model**: Keep page logic separate from test logic
2. **Wait Strategies**: Use explicit waits instead of fixed timeouts
3. **Error Handling**: Implement proper error handling and logging
4. **Test Data**: Use environment variables for sensitive data
5. **Cleanup**: Clean up test artifacts and temporary data
6. **Documentation**: Document complex test scenarios

## 🐛 Troubleshooting

### Common Issues

1. **Element Not Found**: Check if selectors need updating
2. **Timeout Errors**: Increase timeout values in configuration
3. **Browser Launch Issues**: Ensure browsers are installed (`npm run install:browsers`)
4. **Network Issues**: Check network connectivity and firewall settings

### Debug Tips

- Use `page.pause()` to pause execution
- Take screenshots at key points
- Use browser devtools for element inspection
- Check test logs for detailed error information

## 📞 Support

For issues and questions:
1. Check existing test scenarios
2. Review Playwright documentation
3. Examine browser console logs
4. Verify element selectors are up-to-date

---

**Happy Testing! 🎉**
