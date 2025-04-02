const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    password: "TestoweHaslo123",
    email: "menrokTest@user.pl",
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "https://fakestore.testelka.pl",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
