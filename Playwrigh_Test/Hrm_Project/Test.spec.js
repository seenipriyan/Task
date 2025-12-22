import { test } from "@playwright/test";
import { OrangeHrm_Function } from "./Function";

/* ================= NEGATIVE FLOW ================= */

test.describe('OrangeHrm Negative Flow', () => {

  test('Invalid password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangeHrm_Function.EnterCredentials(page, 'Admin', 'wrongpassword');
    await OrangeHrm_Function.Clicksubmit(page);
    await OrangeHrm_Function.verifyErrorMessage(page);
  });

  test('Invalid username', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangeHrm_Function.EnterCredentials(page, 'WrongUser', 'admin123');
    await OrangeHrm_Function.Clicksubmit(page);
    await OrangeHrm_Function.verifyErrorMessage(page);
  });

  test('Empty username and password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangeHrm_Function.Clicksubmit(page);
    await OrangeHrm_Function.verifyRequiredFieldMessage(page);
  });

});

/* ================= POSITIVE FLOW ================= */

test.describe('OrangeHrm Positive Flow', () => {

  test('Verify Dashboard is visible', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangeHrm_Function.EnterCredentials(page, 'Admin', 'admin123');
    await OrangeHrm_Function.Clicksubmit(page);
    await OrangeHrm_Function.verifyDashboard(page);
  });

});