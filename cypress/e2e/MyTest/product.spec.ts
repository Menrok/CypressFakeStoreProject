/// <reference types="cypress"/>

import { Category } from "../../support/interfaces";

/*
    Test #0001: Sprawdzanie liczby produktów w kategoriach sklepu
    1. Przejdź do strony sklepu.
    2. Sprawdź dostępne kategorie: "Windsurfing", "Wspinaczka", "Yoga i pilates", "Żeglarstwo".
    3. Kliknij na kategorię "Windsurfing" i sprawdź, czy liczba produktów na stronie odpowiada liczbie produktów wyświetlonej obok kategorii.
    4. Powróć na stronę główną sklepu.
    5. Powtórz krok 3 i 4 dla kategorii "Wspinaczka".
    6. Powtórz krok 3 i 4 dla kategorii "Yoga i pilates".
    7. Powtórz krok 3 i 4 dla kategorii "Żeglarstwo".
    8. Upewnij się, że liczba produktów na stronie sklepu zgadza się z liczbą produktów wskazaną przy każdej kategorii.
*/

describe('Sprawdzanie ilości produktów w sklepach', () => {
    before(() => {
      cy.visit('https://fakestore.testelka.pl/shop/');
    });
  
    it('Sprawdza ilość produktów w każdej kategorii', () => {
      const categories: Category[] = [
        { name: 'Windsurfing', class: 'cat-item-18' },
        { name: 'Wspinaczka', class: 'cat-item-16' },
        { name: 'Yoga i pilates', class: 'cat-item-19' },
        { name: 'Żeglarstwo', class: 'cat-item-17' }
      ];
  
      categories.forEach(category => {
        cy.get(`.cat-item.${category.class} a`).click();
  
        cy.get(`.cat-item.${category.class}`).find('.count').invoke('text').then((countText) => {
          const expectedCount = parseInt(countText.replace(/[^\d]/g, ''), 10);
          
          cy.get('.product').should('have.length', expectedCount);
          
          cy.go('back');
        });
      });
    });
  });