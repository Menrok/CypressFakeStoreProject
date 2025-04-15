/// <reference types="cypress"/>

import { ICardData } from "../../interfaces/carddata.interface";
import { IUser } from "../../interfaces/user.interface";
import { shoppingPageSelectors } from "../../selectors/shoppingPageSelectors";

/*
    Test #0001: Proces zakupowy - dodanie produktów, kupon, płatność
    1. Przejdź do strony głównej sklepu.
    2. Wybierz kategorię produktów ("Yoga i pilates").
    3. Dodaj pierwszy produkt do koszyka.
    4. Wybierz kategorię ("Windsurfing") i dodaj kolejny produkt do koszyka.
    5. Przejdź do koszyka i sprawdź, czy produkty są w nim obecne.
    6. Wprowadź kod kuponu rabatowego ("kwotowy250").
    7. Kliknij przycisk "Zastosuj kupon" i upewnij się, że kupon został użyty.
    8. Kliknij przycisk "Przejdź do płatności".
    9. Wypełnij formularz danych osobowych (imię, nazwisko, adres, e-mail, telefon).
    10. Wypełnij dane karty kredytowej w formularzu płatności (numer karty, data ważności, CVC).
    11. Zgódź się na warunki korzystania z serwisu i kliknij "Złóż zamówienie".
    12. Sprawdź, czy na stronie pojawia się komunikat potwierdzający złożenie zamówienia.
*/

describe("Proces zakupowy - dodanie produktów, kupon, płatność", () => {
  let user: IUser;
  let card: ICardData;

  before(() => {
    cy.fixture("paymentUser").then((data) => {
      user = data;
    });

    cy.fixture("carddata").then((data) => {
      card = data;
    });

    cy.visit("https://fakestore.testelka.pl/");
  });

  it("Dodanie produktów do koszyka, logowanie i finalizacja płatności", () => {
    cy.contains("Sklep").click();
    cy.contains("Yoga i pilates").click();
    cy.get(shoppingPageSelectors.addToCartButton).first().click();

    cy.contains("Sklep").click();
    cy.contains("Windsurfing ").click();
    cy.get(shoppingPageSelectors.addToCartButton).first().click();

    cy.contains(shoppingPageSelectors.cartLink).click();
    cy.url().should("include", "koszyk");

    cy.get(shoppingPageSelectors.couponInput).type("kwotowy250");
    cy.get(shoppingPageSelectors.applyCouponButton).click();
    cy.contains("Kupon został pomyślnie użyty.").should("be.visible");

    cy.contains(shoppingPageSelectors.proceedToPaymentButton).click();
    cy.url().should("include", "zamowienie");

    cy.get(shoppingPageSelectors.firstNameInput).type("Michał");
    cy.get(shoppingPageSelectors.lastNameInput).type("Tester");
    cy.get(shoppingPageSelectors.addressInput).type("Testowa 12");
    cy.get(shoppingPageSelectors.postcodeInput).type("00-001");
    cy.get(shoppingPageSelectors.cityInput).type("Kraków");
    cy.get(shoppingPageSelectors.phoneInput).type("123456789");
    cy.get(shoppingPageSelectors.emailInput).type(user.email);

    cy.wait(2500);
    cy.get(shoppingPageSelectors.iframe).then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('input[name="cardnumber"]').first().type(card.number);
      cy.wrap(body).find('input[name="exp-date"]').first().type(card.date);
      cy.wrap(body).find('input[name="cvc"]').first().type(card.cvc);
    });

    cy.get(shoppingPageSelectors.termsCheckbox).check();
    cy.get(shoppingPageSelectors.placeOrderButton).click();

    cy.wait(6000);

    cy.contains(shoppingPageSelectors.successMessage).should("be.visible");
  });
});