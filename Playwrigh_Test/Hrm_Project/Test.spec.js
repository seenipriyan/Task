import { test, expect } from "@playwright/test";
import { orangeHrm_Function } from "../Hrm_Project/Function";
/* ========= NEGATIVE SCENARIOS ========= */

test.describe('OrangeHrm Negative Flow', () => {

  test('Invalid password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await orangeHrm_Function.EnterCredentials(page, 'Admin', 'priya');
    await orangeHrm_Function.Clicksubmit(page);

    await expect(OrangHrm_locators.errorMessage(page)).toHaveText('Invalid credentials');
  });

  test('Invalid username', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await orangeHrm_Function.EnterCredentials(page, 'priya', 'admin123');
    await orangeHrm_Function.Clicksubmit(page);

    await expect(
      OrangHrm_locators.errorMessage(page)
    ).toHaveText('Invalid credentials');
  });

  test('Empty username and password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await orangeHrm_Function.Clicksubmit(page);

    await expect(
      orangeHrm_FunctionrangHrm_Function.requiredFieldMessage(page)
    ).toBeVisible();
  });

});