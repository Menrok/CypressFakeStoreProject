/// <reference types="cypress"/>

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
  const newUser = {
    email: "user_${randomId}@test.com",
    password: "TestoweHaslo123",
  };

  before(() => {
    cy.visit("https://fakestore.testelka.pl/");
    cy.contains("Wybierz podróż dla siebie!").should("be.visible");
  });

  it("Rejestracja", () => {
    cy.visit("/");
    cy.contains("Moje konto").click();

    cy.get("#reg_email").type(newUser.email);
    cy.get("#reg_password").type(newUser.password);

    cy.get('button[type="submit"]').contains("Zarejestruj się").click();

    cy.url().should("include", "moje-konto");
    cy.contains("Witaj " + newUser.email.split("@")[0]).should("be.visible");

    cy.contains("Wyloguj się").should("be.visible");
  });

  it("Logowanie i edycja konta", () => {
    const password = "TestPola";

    cy.visit("/");
    cy.contains("Moje konto").click();

    cy.get("#username").type(newUser.email);
    cy.get("#password").type(newUser.password);
    cy.get('button[type="submit"]').contains("Zaloguj się").click();

    cy.url().should("include", "moje-konto");
    cy.contains("Witaj " + newUser.email.split("@")[0]).should("be.visible");

    cy.contains("Edycja konta").click();

    cy.get("#account_first_name").clear().type("Michał");
    cy.get("#account_last_name").clear().type("Tester");
    cy.get("#account_display_name").clear().type("TesterM");

    cy.get("#account_email").scrollIntoView();

    cy.get("#account_email").should("have.value", newUser.email);

    cy.get("#password_current").click().type(password);
    cy.get('[aria-describedby="password_current"]').click();
    cy.get("#password_current")
      .should("have.value", password)
      .and("have.attr", "type", "text");
    cy.get("#password_current").clear();
    cy.get("#password_current").should("have.value", "");

    cy.get("#password_1").click();
    cy.get("#password_2").click();

    cy.get('button[name="save_account_details"]').click();

    cy.contains("Zmieniono szczegóły konta.").should("be.visible");

    cy.get("#account_first_name").should("have.value", "Michał");
    cy.get("#account_last_name").should("have.value", "Tester");
    cy.get("#account_display_name").should("have.value", "TesterM");
  });
});
