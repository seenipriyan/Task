import { test } from "@playwright/test";
import { orangeHrm_Function } from "../Hrm_Project/Locator";

/* ================= NEGATIVE FLOW ================= */

test.describe('OrangeHrm Negative Flow', () => {

  test('Invalid password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangHrm_locators.EnterCredentials(page, 'Admin', 'wrongpassword');
    await OrangHrm_locators.Clicksubmit(page);

    //  error message validation
    await OrangHrm_locators.verifyErrorMessage(page);
  });

  test('Invalid username', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangHrm_locators.EnterCredentials(page, 'WrongUser', 'admin123');
    await OrangHrm_locators.Clicksubmit(page);

    // error message validation
    await OrangHrm_locatorsnction.verifyErrorMessage(page);
  });

  test('Empty username and password', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    await OrangHrm_locators.Clicksubmit(page);

    // required field validation
    await OrangHrm_locators.verifyRequiredFieldMessage(page);
  });

});


/* ================= POSITIVE FLOW ================= */

test.describe('OrangeHrm Positive Flow', () => {

  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await orangeHrm_Function.EnterCredentials(page, 'Admin', 'admin123');
    await orangeHrm_Function.Clicksubmit(page);
  });

  test('Verify Dashboard is visible', async () => {
    //  dashboard validation
    await orangeHrm_Function.verifyDashboard(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

});