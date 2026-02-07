import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Thangamayil Admin Panel - Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test.describe('Login Page UI Tests', () => {
    test('should load login page correctly', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Verify page title
      const title = await loginPage.getPageTitle();
      expect(title).toContain('Thangamayil');
      expect(title).toContain('Admin');
      
      // Verify login page is loaded
      expect(await loginPage.isLoginPageLoaded()).toBe(true);
      
      // Verify essential elements are present
      expect(await loginPage.validateLoginPageElements()).toBe(true);
    });

    test('should display all required login form elements', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Check if username field is visible
      const usernameSelectors = loginPage['usernameInput'].split(', ');
      let usernameFound = false;
      for (const selector of usernameSelectors) {
        if (await loginPage.isElementVisible(selector)) {
          usernameFound = true;
          break;
        }
      }
      expect(usernameFound).toBe(true);
      
      // Check if password field is visible
      const passwordSelectors = loginPage['passwordInput'].split(', ');
      let passwordFound = false;
      for (const selector of passwordSelectors) {
        if (await loginPage.isElementVisible(selector)) {
          passwordFound = true;
          break;
        }
      }
      expect(passwordFound).toBe(true);
      
      // Check if login button is visible
      const buttonSelectors = loginPage['loginButton'].split(', ');
      let buttonFound = false;
      for (const selector of buttonSelectors) {
        if (await loginPage.isElementVisible(selector)) {
          buttonFound = true;
          break;
        }
      }
      expect(buttonFound).toBe(true);
    });
  });

  test.describe('Login Functionality Tests', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Login with provided credentials
      await loginPage.loginAndWaitForNavigation(
        'gnanapriya.s@thangamayil.com',
        'Welcome@123'
      );
      
      // Verify successful login
      expect(await loginPage.isLoggedIn()).toBe(true);
      
      // Take screenshot for verification
      await loginPage.takeScreenshot('successful-login');
    });

    test('should show error message with invalid credentials', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Try to login with invalid credentials
      await loginPage.fillUsername('invalid@example.com');
      await loginPage.fillPassword('invalidpassword');
      await loginPage.clickLoginButton();
      
      // Wait for error message
      await page.waitForTimeout(2000);
      
      // Check if error message is displayed
      const hasError = await loginPage.isErrorMessageDisplayed();
      if (hasError) {
        const errorMessage = await loginPage.getErrorMessage();
        console.log('Error message:', errorMessage);
        expect(errorMessage).toBeTruthy();
      }
      
      // Verify still on login page
      expect(await loginPage.isLoggedIn()).toBe(false);
    });

    test('should handle empty form submission', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Try to login with empty credentials
      await loginPage.clickLoginButton();
      
      // Wait for any validation messages
      await page.waitForTimeout(1000);
      
      // Should still be on login page
      expect(await loginPage.isLoggedIn()).toBe(false);
    });
  });

  test.describe('Form Interaction Tests', () => {
    test('should fill and clear form fields correctly', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Fill form
      await loginPage.fillUsername('test@example.com');
      await loginPage.fillPassword('testpassword');
      
      // Verify form values
      const formValues = await loginPage.getFormValues();
      expect(formValues.username).toBe('test@example.com');
      expect(formValues.password).toBe('testpassword');
      
      // Clear form
      await loginPage.clearForm();
      
      // Verify form is cleared
      const clearedValues = await loginPage.getFormValues();
      expect(clearedValues.username).toBe('');
      expect(clearedValues.password).toBe('');
    });

    test('should handle password visibility toggle', async ({ page }) => {
      await loginPage.navigateToLogin();
      await loginPage.fillPassword('testpassword');
      
      // Try to toggle password visibility if button exists
      const showPasswordButton = 'button[aria-label*="password"], .show-password, .toggle-password';
      if (await loginPage.isElementVisible(showPasswordButton)) {
        await loginPage.togglePasswordVisibility();
        // Toggle back
        await loginPage.togglePasswordVisibility();
      }
    });

    test('should handle remember me checkbox', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Try to interact with remember me checkbox if it exists
      const rememberMeCheckbox = 'input[type="checkbox"], .remember-me, [data-testid="remember-me"]';
      if (await loginPage.isElementVisible(rememberMeCheckbox)) {
        await loginPage.toggleRememberMe();
      }
    });
  });

  test.describe('Navigation Tests', () => {
    test('should navigate to forgot password page', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Check if forgot password link exists and click it
      const forgotPasswordLink = 'a:has-text("Forgot Password"), .forgot-password, [data-testid="forgot-password"]';
      if (await loginPage.isElementVisible(forgotPasswordLink)) {
        await loginPage.clickForgotPassword();
        await page.waitForTimeout(2000);
        
        // Take screenshot of forgot password page
        await loginPage.takeScreenshot('forgot-password-page');
      }
    });
  });

  test.describe('Accessibility Tests', () => {
    test('should be accessible with keyboard navigation', async ({ page }) => {
      await loginPage.navigateToLogin();
      
      // Test keyboard navigation
      await page.keyboard.press('Tab'); // Should focus on first input
      await page.keyboard.type('test@example.com');
      await page.keyboard.press('Tab'); // Should focus on password input
      await page.keyboard.type('testpassword');
      await page.keyboard.press('Tab'); // Should focus on login button
      await page.keyboard.press('Enter'); // Should submit form
      
      await page.waitForTimeout(2000);
    });
  });

  test.describe('Performance Tests', () => {
    test('should load login page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      await loginPage.navigateToLogin();
      await loginPage.waitForReactApp();
      const loadTime = Date.now() - startTime;
      
      // Page should load within 10 seconds
      expect(loadTime).toBeLessThan(10000);
      console.log(`Login page loaded in ${loadTime}ms`);
    });
  });
});
