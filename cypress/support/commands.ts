import { IUser } from '../interfaces/user.interface';
import { ICardData } from '../interfaces/carddata.interface';
import { loginPageSelectors } from '../selectors/loginPageSelectors';
import { registerPageSelectors } from '../selectors/registerPageSelectors';
import { shoppingPageSelectors } from '../selectors/shoppingPageSelectors';

Cypress.Commands.add('registerUser', (user: IUser) => {
  cy.visit('/');
  cy.contains('Moje konto').click();
  cy.get(registerPageSelectors.emailInput).type(user.email);
  cy.get(registerPageSelectors.passwordInput).type(user.password);
  cy.get(registerPageSelectors.submitButton).contains('Zarejestruj się').click();
});

Cypress.Commands.add('loginUser', (user: IUser) => {
  cy.visit('/');
  cy.contains('Moje konto').click();
  cy.get(loginPageSelectors.emailInput).type(user.email);
  cy.get(loginPageSelectors.passwordInput).type(user.password);
  cy.get(loginPageSelectors.submitButton).contains('Zaloguj się').click();
});

Cypress.Commands.add('addProductToCart', (category: string) => {
  cy.contains("Sklep").click();
  cy.contains(category).click();
  cy.get(shoppingPageSelectors.addToCartButton).first().click();
});

Cypress.Commands.add('fillPaymentDetails', (card: ICardData) => {
  cy.wait(2500);
  cy.get(shoppingPageSelectors.iframe).then(($iframe) => { 
    const body = $iframe.contents().find("body");
    cy.wrap(body).find('input[name="cardnumber"]').first().type(card.number);
    cy.wrap(body).find('input[name="exp-date"]').first().type(card.date);
    cy.wrap(body).find('input[name="cvc"]').first().type(card.cvc);
  });
});
