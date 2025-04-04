import { CardData, User } from './interfaces';
import { selectors } from './selectors';

Cypress.Commands.add('registerUser', (user: User) => {
    cy.visit('/');
    cy.contains('Moje konto').click();
    cy.get(selectors.register.emailInput).type(user.email);
    cy.get(selectors.register.passwordInput).type(user.password);
    cy.get(selectors.register.submitButton).contains('Zarejestruj się').click();
});

Cypress.Commands.add('loginUser', (user: User) => {
    cy.visit('/');
    cy.contains('Moje konto').click();
    cy.get(selectors.login.emailInput).type(user.email);
    cy.get(selectors.login.passwordInput).type(user.password);
    cy.get(selectors.login.submitButton).contains('Zaloguj się').click();
});

Cypress.Commands.add('addProductToCart', (category: string) => {
    cy.contains("Sklep").click();
    cy.contains(category).click();
    cy.get(selectors.shopping.addToCartButton).first().click();
});
  
Cypress.Commands.add('fillPaymentDetails', (card: CardData) => {
    cy.wait(2500);
    cy.get(selectors.shopping.iframe).then(($iframe) => { 
        const body = $iframe.contents().find("body");
        cy.wrap(body).find('input[name="cardnumber"]').first().type(card.number);
        cy.wrap(body).find('input[name="exp-date"]').first().type(card.date);
        cy.wrap(body).find('input[name="cvc"]').first().type(card.cvc);
    });
});