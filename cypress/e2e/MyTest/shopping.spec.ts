/// <reference types="cypress"/>

import { CardData, User } from "../../support/interfaces";
import { selectors } from "../../support/selectors";

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
  const user : User = {
    email: "menrok@test.com",
    password: "TestoweHaslo123",
  };

  const Card : CardData = {
    number: "4242424242424242",
    cvc: "123",
    date: "03/30",
  };

  it("Dodanie produktów do koszyka, logowanie i finalizacja płatności", () => {
    cy.visit("https://fakestore.testelka.pl/");

    cy.contains("Sklep").click();
    cy.contains("Yoga i pilates").click();
    cy.get(selectors.shopping.addToCartButton).first().click();

    cy.contains("Sklep").click();
    cy.contains("Windsurfing ").click();
    cy.get(selectors.shopping.addToCartButton).first().click();

    cy.contains(selectors.shopping.cartLink).click();
    cy.url().should("include", "koszyk");

    cy.get(selectors.shopping.couponInput).type("kwotowy250");
    cy.get(selectors.shopping.applyCouponButton).click();
    cy.contains("Kupon został pomyślnie użyty.").should("be.visible");

    cy.contains(selectors.shopping.proceedToPaymentButton).click();
    cy.url().should("include", "zamowienie");

    cy.get(selectors.shopping.firstNameInput).type("Michał");
    cy.get(selectors.shopping.lastNameInput).type("Tester");
    cy.get(selectors.shopping.addressInput).type("Testowa 12");
    cy.get(selectors.shopping.postcodeInput).type("00-001");
    cy.get(selectors.shopping.cityInput).type("Kraków");
    cy.get(selectors.shopping.phoneInput).type("123456789");
    cy.get(selectors.shopping.emailInput).type(user.email);

    cy.wait(2500);
    cy.get(selectors.shopping.iframe).then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('input[name="cardnumber"]').first().type(Card.number);
      cy.wrap(body).find('input[name="exp-date"]').first().type(Card.date);
      cy.wrap(body).find('input[name="cvc"]').first().type(Card.cvc);
    });

    cy.get(selectors.shopping.termsCheckbox).check();
    cy.get(selectors.shopping.placeOrderButton).click();

    cy.wait(6000);

    cy.contains(selectors.shopping.successMessage).should("be.visible");
  });
});