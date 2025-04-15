import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      registerUser(user: import('../interfaces/user.interface').IUser): Chainable<void>;
      loginUser(user: import('../interfaces/user.interface').IUser): Chainable<void>;
      addProductToCart(category: string): Chainable<void>;
      fillPaymentDetails(card: import('../interfaces/carddata.interface').ICardData): Chainable<void>;
    }
  }
}
