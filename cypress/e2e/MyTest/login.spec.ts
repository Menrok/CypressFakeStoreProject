/// <reference types="cypress"/>

import { User } from "../../support/interfaces";
import { selectors } from "../../support/selectors";


/*
    Test #0001: Rejestracja nowego użytkownika
    1. Przejdź do strony głównej i kliknij "Moje konto".
    2. Wypełnij formularz rejestracji, podając nowy adres e-mail i hasło.
    3. Kliknij przycisk "Zarejestruj się".
    4. Po udanej rejestracji sprawdź, czy użytkownik został przekierowany na stronę "Moje konto".
    5. Sprawdź, czy użytkownik jest zalogowany, a na stronie pojawia się komunikat powitalny z jego nazwą użytkownika.
    6. Sprawdź, czy dostępny jest przycisk "Wyloguj się".

    Test #0002: Logowanie i edycja konta
    1. Przejdź do strony głównej i kliknij "Moje konto".
    2. Wypełnij formularz logowania, podając wcześniej zarejestrowany adres e-mail oraz hasło.
    3. Kliknij przycisk "Zaloguj się".
    4. Po zalogowaniu, sprawdź, czy użytkownik został przekierowany na stronę "Moje konto" i czy jest zalogowany.
    5. Kliknij przycisk "Edycja konta".
    6. Wypełnij formularz edycji danych konta, zmieniając imię, nazwisko i nazwę wyświetlaną.
    7. Sprawdź, czy pole "E-mail" zawiera poprawny adres e-mail.
    8. Zmodyfikuj pole "Aktualne hasło" i sprawdź, czy po kliknięciu przycisku "Pokaż hasło" jest ono widoczne.
    9. Wyczyść pole "Aktualne hasło".
    10. Zaktualizuj inne pola, takie jak nowe hasło i potwierdzenie nowego hasła.
    11. Kliknij przycisk "Zapisz zmiany" i sprawdź, czy zmiana danych została pomyślnie zapisania.
    12. Sprawdź, czy edytowane dane (imię, nazwisko, nazwa wyświetlana) zostały zapisane poprawnie.
*/

describe("Test rejestracji, logowania i edycji konta", () => {
  const randomId = Math.floor(100 + Math.random() * 900);
  const newUser : User = {
    email: `user_${randomId}@test.com`,
    password: "TestoweHaslo123",
  };

  before(() => {
    cy.visit("https://fakestore.testelka.pl/");
    cy.contains("Wybierz podróż dla siebie!").should("be.visible");
  });

  it("Rejestracja", () => {
    cy.registerUser(newUser);

    cy.url().should("include", "moje-konto");
    cy.contains("Witaj " + newUser.email.split("@")[0]).should("be.visible");
    cy.contains(selectors.register.logoutButton).should("be.visible");
  });

  it("Logowanie i edycja konta", () => {
    const password = "TestPola";

    cy.loginUser(newUser);

    cy.url().should("include", "moje-konto");
    cy.contains("Witaj " + newUser.email.split("@")[0]).should("be.visible");

    cy.contains("Edycja konta").click();

    cy.get(selectors.account.firstNameInput).clear().type("Michał");
    cy.get(selectors.account.lastNameInput).clear().type("Tester");
    cy.get(selectors.account.displayNameInput).clear().type("TesterM");

    cy.get(selectors.account.emailInput).scrollIntoView();
    cy.get(selectors.account.emailInput).should("have.value", newUser.email);

    cy.get(selectors.account.passwordCurrentInput).clear().type(password);
    cy.get('[aria-describedby="password_current"]').click();
    cy.get(selectors.account.passwordCurrentInput)
      .should("have.value", password)
      .and("have.attr", "type", "text");
    cy.get(selectors.account.passwordCurrentInput).clear().should("have.value", "");

    cy.get(selectors.account.passwordNewInput).click();
    cy.get(selectors.account.passwordConfirmInput).click();

    cy.get(selectors.account.saveButton).click();
    cy.contains("Zmieniono szczegóły konta.").should("be.visible");

    cy.get(selectors.account.firstNameInput).should("have.value", "Michał");
    cy.get(selectors.account.lastNameInput).should("have.value", "Tester");
    cy.get(selectors.account.displayNameInput).should("have.value", "TesterM");
  });
});