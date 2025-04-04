export const selectors = {
  // Selektory związane z rejestracją
  register: {
    emailInput: "#reg_email",
    passwordInput: "#reg_password",
    submitButton: 'button[type="submit"]',
    successMessage: "Witaj",
    logoutButton: "Wyloguj się",
  },

  // Selektory związane z logowaniem
  login: {
    emailInput: "#username",
    passwordInput: "#password",
    submitButton: 'button[type="submit"]',
    successMessage: "Witaj",
  },

  // Selektory związane z edycją konta
  account: {
    firstNameInput: "#account_first_name",
    lastNameInput: "#account_last_name",
    displayNameInput: "#account_display_name",
    emailInput: "#account_email",
    saveButton: 'button[name="save_account_details"]',
    passwordCurrentInput: "#password_current",
    passwordNewInput: "#password_1",
    passwordConfirmInput: "#password_2",
  },

  // Selektory związane z procesem zakupowym
  shopping: {
    addToCartButton: ".add_to_cart_button",
    couponInput: "#coupon_code",
    applyCouponButton: "button[name='apply_coupon']",
    cartLink: "Koszyk",
    proceedToPaymentButton: "Przejdź do płatności",
    firstNameInput: "#billing_first_name",
    lastNameInput: "#billing_last_name",
    addressInput: "#billing_address_1",
    postcodeInput: "#billing_postcode",
    cityInput: "#billing_city",
    phoneInput: "#billing_phone",
    emailInput: "#billing_email",
    iframe: "iframe",
    termsCheckbox: "#terms",
    placeOrderButton: "#place_order",
    successMessage: "Dziękujemy. Otrzymaliśmy Twoje zamówienie.",
  },
};

