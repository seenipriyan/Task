import { Page, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Wait for element to be enabled
   */
  async waitForElementEnabled(selector: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { 
      state: 'attached', 
      timeout 
    });
    const element = this.page.locator(selector);
    await expect(element).toBeEnabled({ timeout });
  }

  /**
   * Click on an element
   */
  async clickElement(selector: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.click(selector);
  }

  /**
   * Fill text in an input field
   */
  async fillInput(selector: string, value: string): Promise<void> {
    await this.waitForElement(selector);
    await this.page.fill(selector, value);
  }

  /**
   * Get text from an element
   */
  async getElementText(selector: string): Promise<string> {
    await this.waitForElement(selector);
    return await this.page.textContent(selector) || '';
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for React app to load (root element)
   */
  async waitForReactApp(): Promise<void> {
    await this.waitForElement('#root', 15000);
  }

  /**
   * Handle reCAPTCHA if present
   */
  async handleRecaptcha(): Promise<void> {
    const recaptchaFrame = this.page.frameLocator('iframe[title*="reCAPTCHA"]');
    if (await recaptchaFrame.locator('.recaptcha-checkbox').isVisible()) {
      await recaptchaFrame.locator('.recaptcha-checkbox').click();
      // Wait for manual verification if needed
      await this.page.waitForTimeout(2000);
    }
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName: string): Promise<void> {
    await this.page.screenshot({ 
      path: `screenshots/${fileName}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for and handle any toast notifications
   */
  async waitForToast(timeout: number = 5000): Promise<string | null> {
    try {
      const toast = this.page.locator('[class*="toast"], [class*="notification"], [role="alert"]');
      await toast.waitFor({ state: 'visible', timeout });
      return await toast.textContent();
    } catch (error) {
      return null;
    }
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for URL to contain specific path
   */
  async waitForUrlToContain(path: string, timeout: number = 10000): Promise<void> {
    await this.page.waitForURL(`**/${path}**`, { timeout });
  }
}
