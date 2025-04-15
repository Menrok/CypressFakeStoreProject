
# Cypress E2E Testing Project – FakeStore

Projekt testów automatycznych E2Ewykonany w Cypress z użyciem TypeScript.  
Testowana aplikacja: [FakeStore](https://fakestore.testelka.pl/) – sklep internetowy.

---

## Opis projektu

Celem projektu jest przetestowanie najważniejszych funkcjonalności sklepu online, takich jak:

- rejestracja i logowanie użytkownika,
- proces zakupowy z użyciem kuponu i płatności,
- dodawanie/usuwanie produktów z koszyka i listy życzeń,
- wyszukiwanie produktów,
- responsywność UI na różnych rozdzielczościach,
- zgodność liczby produktów z kategoriami.

Testy zostały podzielone na osobne pliki i korzystają z dobrych praktyk Cypressa, takich jak:
- selektory w osobnych plikach,
- dane testowe w `fixtures`,
- własne komendy z typami TypeScript.

---

## Scenariusze testowe (7)

1. Rejestracja nowego użytkownika  
2. Logowanie i edycja danych konta  
3. Dodanie i usunięcie produktów z koszyka  
4. Proces zakupowy z kuponem i płatnością  
5. Wyszukiwanie produktu i dodanie do listy życzeń  
6. Testowanie responsywności strony na różnych rozdzielczościach  
7. Sprawdzenie liczby produktów w kategoriach

---

## Uruchamianie testów

### 1. Instalacja zależności

```bash
npm install
```

---

### 2. Tryb interaktywny (GUI)

Otwiera graficzny interfejs Cypressa:

```bash
npm run test:open
```

---

### 3. Tryb headless (testy w tle)

Uruchamia wszystkie testy w tle, bez otwierania przeglądarki:

```bash
npm run test:run
```

Wyniki zostaną wyświetlone w terminalu.

---

## Skrypty w `package.json`

W `package.json` znajdują się gotowe skrypty:

```json
"scripts": {
  "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
  "test:open": "cypress open",
  "test:run": "cypress run"
}
```

---

## Autor projektu

**Imię i nazwisko:** *Michał Handzel*