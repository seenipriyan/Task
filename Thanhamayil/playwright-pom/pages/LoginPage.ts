import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // URL
  private readonly loginUrl = 'https://preprodadminpanel.thangamayil.in/login';
  
  // Selectors for login form elements
  private readonly usernameInput = 'input[type="email"], input[name="email"], input[placeholder*="email"], input[placeholder*="Email"], #email, input[id*="email"]';
  private readonly passwordInput = 'input[type="password"], input[name="password"], input[placeholder*="password"], input[placeholder*="Password"], #password, input[id*="password"]';
  private readonly loginButton = 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), .login-btn, [data-testid="login-button"]';
  private readonly forgotPasswordLink = 'a:has-text("Forgot Password"), .forgot-password, [data-testid="forgot-password"]';
  private readonly errorMessage = '.error-message, .alert-danger, [role="alert"], .notification.error';
  private readonly successMessage = '.success-message, .alert-success, .notification.success';
  
  // Additional selectors that might be needed
  private readonly rememberMeCheckbox = 'input[type="checkbox"], .remember-me, [data-testid="remember-me"]';
  private readonly showPasswordButton = 'button[aria-label*="password"], .show-password, .toggle-password';
  private readonly captchaFrame = 'iframe[title*="reCAPTCHA"], iframe[src*="recaptcha"]';
  private readonly loadingSpinner = '.loading, .spinner, [data-testid="loading"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLogin(): Promise<void> {
    await this.navigateTo(this.loginUrl);
    await this.waitForReactApp();
  }

  /**
   * Get the page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Check if login page is loaded
   */
  async isLoginPageLoaded(): Promise<boolean> {
    try {
      await this.waitForReactApp();
      const title = await this.getPageTitle();
      return title.includes('Thangamayil') && title.includes('Admin');
    } catch (error) {
      return false;
    }
  }

  /**
   * Fill username/email field
   */
  async fillUsername(username: string): Promise<void> {
    // Try multiple possible selectors for username field
    const usernameSelectors = this.usernameInput.split(', ');
    
    for (const selector of usernameSelectors) {
      if (await this.isElementVisible(selector)) {
        await this.fillInput(selector, username);
        console.log(`Username filled using selector: ${selector}`);
        return;
      }
    }
    
    throw new Error('Username input field not found on the page');
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    // Try multiple possible selectors for password field
    const passwordSelectors = this.passwordInput.split(', ');
    
    for (const selector of passwordSelectors) {
      if (await this.isElementVisible(selector)) {
        await this.fillInput(selector, password);
        console.log(`Password filled using selector: ${selector}`);
        return;
      }
    }
    
    throw new Error('Password input field not found on the page');
  }

  /**
   * Toggle password visibility if show/hide button is available
   */
  async togglePasswordVisibility(): Promise<void> {
    if (await this.isElementVisible(this.showPasswordButton)) {
      await this.clickElement(this.showPasswordButton);
    }
  }

  /**
   * Click on login button
   */
  async clickLoginButton(): Promise<void> {
    const buttonSelectors = this.loginButton.split(', ');
    
    for (const selector of buttonSelectors) {
      if (await this.isElementVisible(selector)) {
        await this.waitForElementEnabled(selector);
        await this.clickElement(selector);
        console.log(`Login button clicked using selector: ${selector}`);
        return;
      }
    }
    
    throw new Error('Login button not found on the page');
  }

  /**
   * Perform complete login action
   */
  async login(username: string, password: string): Promise<void> {
    console.log('Starting login process...');
    
    // Fill credentials
    await this.fillUsername(username);
    await this.fillPassword(password);
    
    // Handle reCAPTCHA if present
    await this.handleRecaptcha();
    
    // Click login button
    await this.clickLoginButton();
    
    console.log('Login form submitted');
  }

  /**
   * Login with credentials and wait for navigation
   */
  async loginAndWaitForNavigation(username: string, password: string): Promise<void> {
    await this.login(username, password);
    
    // Wait for either successful login (navigation away from login page) 
    // or error message appearance
    await Promise.race([
      this.waitForUrlToContain('dashboard', 15000),
      this.waitForElement(this.errorMessage, 5000)
    ]);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.isErrorMessageDisplayed()) {
      return await this.getElementText(this.errorMessage);
    }
    return '';
  }

  /**
   * Check if success message is displayed
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.successMessage);
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    if (await this.isSuccessMessageDisplayed()) {
      return await this.getElementText(this.successMessage);
    }
    return '';
  }

  /**
   * Click on forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    if (await this.isElementVisible(this.forgotPasswordLink)) {
      await this.clickElement(this.forgotPasswordLink);
    } else {
      throw new Error('Forgot password link not found');
    }
  }

  /**
   * Toggle remember me checkbox if available
   */
  async toggleRememberMe(): Promise<void> {
    if (await this.isElementVisible(this.rememberMeCheckbox)) {
      await this.clickElement(this.rememberMeCheckbox);
    }
  }

  /**
   * Wait for login to complete (successful navigation)
   */
  async waitForLoginComplete(): Promise<void> {
    // Wait for navigation away from login page
    await this.page.waitForURL(url => !url.includes('/login'), { timeout: 15000 });
    
    // Wait for dashboard or main content to load
    await this.waitForReactApp();
  }

  /**
   * Check if user is logged in successfully
   */
  async isLoggedIn(): Promise<boolean> {
    const currentUrl = await this.getCurrentUrl();
    const urlAsString = currentUrl.toString();
    return !urlAsString.includes('/login') && urlAsString.includes('dashboard');
  }

  /**
   * Get current form values (for debugging)
   */
  async getFormValues(): Promise<{ username: string; password: string }> {
    const usernameSelectors = this.usernameInput.split(', ');
    const passwordSelectors = this.passwordInput.split(', ');
    
    let username = '';
    let password = '';
    
    for (const selector of usernameSelectors) {
      if (await this.isElementVisible(selector)) {
        username = await this.page.inputValue(selector);
        break;
      }
    }
    
    for (const selector of passwordSelectors) {
      if (await this.isElementVisible(selector)) {
        password = await this.page.inputValue(selector);
        break;
      }
    }
    
    return { username, password };
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    try {
      const usernameSelectors = this.usernameInput.split(', ');
      for (const selector of usernameSelectors) {
        if (await this.isElementVisible(selector)) {
          await this.page.fill(selector, '');
          break;
        }
      }
      
      const passwordSelectors = this.passwordInput.split(', ');
      for (const selector of passwordSelectors) {
        if (await this.isElementVisible(selector)) {
          await this.page.fill(selector, '');
          break;
        }
      }
    } catch (error) {
      console.log('Error clearing form:', error);
    }
  }

  /**
   * Validate login page elements are present
   */
  async validateLoginPageElements(): Promise<boolean> {
    try {
      const hasUsernameInput = await this.isElementVisible(this.usernameInput);
      const hasPasswordInput = await this.isElementVisible(this.passwordInput);
      const hasLoginButton = await this.isElementVisible(this.loginButton);
      
      return hasUsernameInput && hasPasswordInput && hasLoginButton;
    } catch (error) {
      return false;
    }
  }
}
