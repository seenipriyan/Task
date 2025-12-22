export const OrangeHrm_locators = {

  OrangePage: (page) => {
    return page.locator('.orangehrm-login-layout-blob');
  },

  logo: (page) => {
    return page.locator('img[alt="company-branding"]');
  },

  title: (page) => {
    return page.locator('h5.oxd-text');
  },

  usericon: (page) => {
    return page.locator('.oxd-icon.bi-person');
  },

  usernameLabel: (page) => {
    return page.locator('label.oxd-label', { hasText: 'Username' });
  },

  passwordicon: (page) => {
    return page.locator('.oxd-icon.bi-key');
  },

  passwordLabel: (page) => {
    return page.locator('label.oxd-label', { hasText: 'Password' });
  },

  username: (page) => {
    return page.locator('input[name="username"]');
  },

  password: (page) => {
    return page.locator('input[name="password"]');
  },

  submit: (page) => {
    return page.getByRole('button', { name: 'Login' });
  },

  //  Negative scenario locators
  errorMessage: (page) => {
    return page.locator('.oxd-alert-content-text');
  },

  requiredFieldMessage: (page) => {
    return page.locator('.oxd-input-group__message');
  },

  //  Positive scenario locator
  dashboardHeader: (page) => {
    return page.locator('.oxd-topbar-header-title');
  }

};