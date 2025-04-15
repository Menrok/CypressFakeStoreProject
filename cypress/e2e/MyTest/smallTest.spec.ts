/// <reference types="cypress"/>

import { shoppingPageSelectors } from "../../selectors/shoppingPageSelectors";
import { wishlistPageSelectors } from "../../selectors/wishlistPageSelectors";
/*
    Test #0001: Dodaje i usuwa produkty z koszyka
    1. Przejdź do strony głównej i wybierz pierwszy produkt z listy.
    2. Dodaj ten produkt do koszyka.
    3. Dodaj jeszcze dwa kolejne produkty do koszyka.
    4. Przejdź do koszyka i sprawdź, czy wszystkie dodane produkty są widoczne.
    5. Usuń jeden produkt z koszyka.
    6. Sprawdź, czy produkt został usunięty.
    7. Cofnij usunięcie produktu z koszyka i sprawdź, czy produkt wrócił do koszyka.

    Test #0002: Wyszukiwanie produktu i lista życzeń
    1. Przejdź na stronę główną.
    2. Wyszukaj produkt "Fuerteventura" za pomocą paska wyszukiwania.
    3. Upewnij się, że produkt "Fuerteventura" pojawił się w wynikach wyszukiwania.
    4. Dodaj produkt "Fuerteventura" do listy życzeń.
    5. Po dodaniu, przejdź do strony listy życzeń.
    6. Sprawdź, czy produkt "Fuerteventura - Sotavento" znajduje się na liście życzeń.

    Test #0003: Testowanie responsywności strony
    1. Zdefiniuj różne urządzenia z odpowiednimi rozdzielczościami.
    2. Dla każdego urządzenia, zmień rozdzielczość ekranu.
    3. Sprawdź, czy nagłówek jest widoczny po załadowaniu strony.
    4. Sprawdź, czy produkty są widoczne na stronie po załadowaniu.
    5. Powtórz te kroki dla wszystkich urządzeń w tablicy.
*/

describe("Testy koszyka, wyszukiwania i responsywności", () => {
    let productSearch: { searchTerm: string; wishlistResult: string };
    let devices: { width: number; height: number }[];
  
    before(() => {
      cy.fixture("productSearch").then((data) => {
        productSearch = data;
      });
  
      cy.fixture("devices").then((data) => {
        devices = data;
      });
  
      cy.visit("https://fakestore.testelka.pl/");
      cy.contains("Wybierz podróż dla siebie!").should("be.visible");
    });
  
    it("Dodaje i usuwa produkty z koszyka", () => {
      cy.get(".product").first().click();
      cy.get(shoppingPageSelectors.addToCartButton).first().click();
      cy.get(shoppingPageSelectors.addToCartButton).eq(2).click();
      cy.get(shoppingPageSelectors.addToCartButton).eq(3).click();
  
      cy.wait(1000);
  
      cy.get(shoppingPageSelectors.cartButton).click();
      cy.get(shoppingPageSelectors.removeFromCartButton).click();
      cy.get(shoppingPageSelectors.restoreButton).contains("Cofnij?").click();
    });
  
    it("Sprawdza wyszukiwanie produktu i listy życzeń", () => {
      cy.visit("/");
  
      cy.get("#woocommerce-product-search-field-0")
        .type(productSearch.searchTerm)
        .type("{enter}");
  
      cy.contains(productSearch.searchTerm).should("be.visible");
      cy.get(wishlistPageSelectors.AddWLButton).should("be.visible").click();
  
      cy.wait(2000);
  
      cy.visit("https://fakestore.testelka.pl/wishlist/");
      cy.get(wishlistPageSelectors.tableProductWhiteList)
        .contains(productSearch.wishlistResult)
        .should("be.visible");
    });
  
    it("Testuje responsywność strony", () => {
      cy.visit("/");
  
      devices.forEach((device) => {
        cy.viewport(device.width, device.height);
        cy.visit("https://fakestore.testelka.pl/shop/");
        cy.get("header").should("be.visible");
        cy.get(".product").should("be.visible");
        cy.wait(500);
      });
    });
  });