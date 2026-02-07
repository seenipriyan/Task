
  export const Thanga_locators = {
  // ---------- Layout ----------
  Thangacontainer: (page) => page.locator('.container-fluid'),
  Thangalayout: (page) => page.locator('.styles_authLayout__1B9KO'),
  Thangabackground: (page) => page.locator('.styles_authBackground__3SZ48'),
  Thangalogo: (page) => page.locator('img[alt="logo"]'),
  Thangalogincontentbox: (page) => page.locator('.styles_loginContentAlignBox__1OpFk'),
  Thangalogintext: (page) => page.locator('.styles_signInPara__vkbml'),
  signInHeader: (page) => page.getByText(/sign in to access thangamayil admin portal/i),

  // ---------- Email ----------
  emailInput: (page) => page.getByPlaceholder(/email address/i),
  emailLabel: (page) => page.getByText(/email address/i),

  // ---------- Password ----------
  passwordInput: (page) => page.locator('input[type="password"]'),
  passwordLabel: (page) => page.getByText(/password/i), // flexible match

  // ---------- Remember Me ----------
  rememberMeCheckbox: (page) => page.locator('input[type="checkbox"][name="remember"]'),
  rememberMeLabel: (page) => page.getByText(/remember me/i),

  // ---------- Forgot Password ----------
  forgotPasswordLink: (page) => page.getByText(/forgot password/i),

  // ---------- Error Message ----------
  errorMessage: (page) => page.getByRole('alert'),


  // ---------- Login ----------
  loginButton: (page) => page.getByRole('button', { name: /sign in/i }),

customerManagementMenu: (page) => page.getByRole('link', { name: /Customer Management/i }),
  allCustomersOption: (page) => page.getByText('All Customers'),

  // 🔎 Customer Search
  searchBox: (page) => page.getByPlaceholder(/Search by Name, Email or Mobile/i),
  customerTableRows: (page) => page.locator('table tbody tr'),
  noDataText: (page) => page.getByText(/No records found/i)

};
