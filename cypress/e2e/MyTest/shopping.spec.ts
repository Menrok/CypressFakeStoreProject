/// <reference types="cypress"/>

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
  const User = {
    email: "menrok@test.com",
    password: "TestoweHaslo123",
  };

  const Card = {
    brand: "Visa",
    number: "4242424242424242",
    cvc: "123",
    date: "03/30",
  };

  it("Dodanie produktów do koszyka, logowanie i finalizacja płatności", () => {
    cy.visit("https://fakestore.testelka.pl/");

    cy.contains("Sklep").click();
    cy.contains("Yoga i pilates").click();
    cy.get(".add_to_cart_button").first().click();

    cy.contains("Sklep").click();
    cy.contains("Windsurfing ").click();
    cy.get(".add_to_cart_button").first().click();

    cy.contains("Koszyk").click();
    cy.url().should("include", "koszyk");

    cy.get("#coupon_code").type("kwotowy250");
    cy.get("button[name='apply_coupon']").click();
    cy.contains("Kupon został pomyślnie użyty.").should("be.visible");

    cy.contains("Przejdź do płatności").click();
    cy.url().should("include", "zamowienie");

    cy.get("#billing_first_name").type("Michał");
    cy.get("#billing_last_name").type("Tester");
    cy.get("#billing_address_1").type("Testowa 12");
    cy.get("#billing_postcode").type("00-001");
    cy.get("#billing_city").type("Kraków");
    cy.get("#billing_phone").type("123456789");
    cy.get("#billing_email").type(User.email);

    cy.wait(2500);
    cy.get("iframe").then(($iframe) => {
      const body = $iframe.contents().find("body");
      cy.wrap(body).find('input[name="cardnumber"]').first().type(Card.number);
      cy.wrap(body).find('input[name="exp-date"]').first().type(Card.date);
      cy.wrap(body).find('input[name="cvc"]').first().type(Card.cvc);
    });

    cy.get("#terms").check();
    cy.get("#place_order").click();

    cy.wait(6000);

    cy.contains("Dziękujemy. Otrzymaliśmy Twoje zamówienie.").should(
      "be.visible"
    );
  });
});
