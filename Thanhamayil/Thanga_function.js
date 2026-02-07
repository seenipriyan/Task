import { expect } from "@playwright/test";
import { Thanga_locators } from "./Thanga_locators.js";


export const Thanga_function = {

  // ---------- LOGIN PAGE UI ----------
  async verify_Login_Page_Layout(page) {
    await expect(Thanga_locators.Thangacontainer(page)).toBeVisible();
    await expect(Thanga_locators.Thangalayout(page)).toBeVisible();
    await expect(Thanga_locators.Thangabackground(page)).toBeVisible();
    await expect(Thanga_locators.Thangalogo(page)).toBeVisible();
    await expect(Thanga_locators.Thangalogincontentbox(page)).toBeVisible();
    await expect(Thanga_locators.signInHeader(page)).toBeVisible();
  },

  async verify_Login_Form(page) {
    await expect(Thanga_locators.emailInput(page)).toBeVisible();
    await expect(Thanga_locators.passwordInput(page)).toBeVisible();
    await expect(Thanga_locators.rememberMeCheckbox(page)).toBeVisible();
    await expect(Thanga_locators.forgotPasswordLink(page)).toBeVisible();
    await expect(Thanga_locators.loginButton(page)).toBeEnabled();
  },

  async verify_Login_Error(page) {
    await expect(Thanga_locators.errorMessage(page)).toBeVisible({ timeout: 5000 });
  },

  async loginWithCredentials(page, email, password) {
    await Thanga_locators.emailInput(page).fill(email);
    await Thanga_locators.passwordInput(page).fill(password);
    await Thanga_locators.loginButton(page).click();
  },

  // ---------- CUSTOMER NAVIGATION ----------
  async navigateToCustomers(page) {
    await Thanga_locators.customerManagementMenu(page).click();
    await Thanga_locators.allCustomersOption(page).click();
  },

  async verify_Customer_Search_Field(page) {
    await expect(Thanga_locators.searchBox(page)).toBeVisible();
  },

  // ---------- SEARCH ACTIONS ----------
  async searchCustomer(page, value) {
    const search = Thanga_locators.searchBox(page);
    await search.fill("");
    await search.fill(value);
    await search.press("Enter");
    await page.waitForTimeout(800); // debounce + API
  },

  async verifyCustomerPresent(page, text) {
    const rows = Thanga_locators.customerTableRows(page);
    await expect(rows.filter({ hasText: text }).first()).toBeVisible();
  },

  async verifySearchResult(page) {
    const rows = Thanga_locators.customerTableRows(page);
    await page.waitForTimeout(800);

    const count = await rows.count();

    if (count === 0) {
      console.log("✅ No customers found");
    } else {
      console.log(`✅ ${count} customer(s) found`);
      await expect(rows.first()).toBeVisible();
    }
  }
};