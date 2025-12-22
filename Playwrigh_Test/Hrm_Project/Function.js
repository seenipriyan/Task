import { expect } from '@playwright/test';
import { OrangeHrm_locators } from './Locators';
export const OrangeHrm_Function = {

  EnterCredentials: async (page, username, password) => {
    await OrangeHrm_locators.username(page).fill(username);
    await OrangeHrm_locators.password(page).fill(password);
  },

  Clicksubmit: async (page) => {
    await OrangeHrm_locators.submit(page).click();
  },

  verifyErrorMessage: async (page) => {
    await expect(
      OrangeHrm_locators.errorMessage(page)
    ).toBeVisible();
  },

  verifyRequiredFieldMessage: async (page) => {
    await expect(
      OrangeHrm_locators.requiredFieldMessage(page)
    ).toBeVisible();
  },

  verifyDashboard: async (page) => {
    await expect(
      OrangeHrm_locators.dashboardHeader(page)
    ).toBeVisible();
  }
};