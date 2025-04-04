import './commands'

declare global {
    namespace Cypress {
      interface Chainable {
        registerUser(user: import('./interfaces').User): Chainable<void>;
        loginUser(user: import('./interfaces').User): Chainable<void>;
        addProductToCart(category: string): Chainable<void>;
        fillPaymentDetails(card: import('./interfaces').CardData): Chainable<void>;
        }
    }
}