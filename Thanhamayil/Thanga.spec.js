import { test, expect, chromium } from "@playwright/test";
import { Thanga_function } from "../Thanhamayil/Thanga_function.js";

let browser, context, page;

test.describe("Thangamayil Admin – Full E2E Flow", () => {

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://preprodadminpanel.thangamayil.in/login");
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("🔐 Login + Customer Management Search Flow", async () => {

    // ---------- UI CHECK ----------
    await Thanga_function.verify_Login_Page_Layout(page);
    await Thanga_function.verify_Login_Form(page);

    // ---------- NEGATIVE LOGIN ----------
    await Thanga_function.loginWithCredentials(page, "wrong@test.com", "wrongpass");
    await Thanga_function.verify_Login_Error(page);

    await page.reload();
    await Thanga_function.verify_Login_Form(page);

    // ---------- POSITIVE LOGIN ----------
    await Thanga_function.loginWithCredentials(
      page,
      "gnanapriya.s@thangamayil.com",
      "Welcome@123"
    );

    await expect(page).toHaveURL(/dashboard/i, { timeout: 15000 });

    // ---------- NAVIGATION ----------
    await Thanga_function.navigateToCustomers(page);
    await expect(page).toHaveURL(/customer/i, { timeout: 15000 });

    // ---------- SEARCH FIELD UI ----------
    await Thanga_function.verify_Customer_Search_Field(page);

    // ---------- POSITIVE SEARCH ----------
    await Thanga_function.searchCustomer(page, "Priya");
    await Thanga_function.verifyCustomerPresent(page, "Priya");

    await Thanga_function.searchCustomer(page, "priyaseeni1525@gmail.com");
    await Thanga_function.verifyCustomerPresent(page, "priyaseeni1525@gmail.com");

    await Thanga_function.searchCustomer(page, "9600464930");
    await Thanga_function.verifyCustomerPresent(page, "9600464930");

    // ---------- NEGATIVE SEARCH ----------
    await Thanga_function.searchCustomer(page, "zzzzzzzz");
    await Thanga_function.verifySearchResult(page);

    await Thanga_function.searchCustomer(page, "@@@@@");
    await Thanga_function.verifySearchResult(page);

    // ---------- FUNCTIONAL RE-SEARCH ----------
    await Thanga_function.searchCustomer(page, "");
    await Thanga_function.searchCustomer(page, "Priya");
    await Thanga_function.verifyCustomerPresent(page, "Priya");
  });

});