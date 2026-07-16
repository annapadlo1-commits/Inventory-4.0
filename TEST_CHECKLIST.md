# Inventory PRO 4.2.1 — checklista testu w prawdziwym arkuszu

## Przed rozpoczęciem

1. Utwórz kopię arkusza Google i projektu Apps Script.
2. Wgraj wszystkie pliki z paczki, usuń starsze pliki, których nie ma w `MANIFEST.txt`.
3. Wklej zawartość `appsscript.json` do manifestu projektu.
4. Uruchom `enterpriseSetup()` i odśwież arkusz.
5. Uruchom kolejno:
   - `runParserContractTests()`;
   - `runParserPerformanceTests()`;
   - `runInventory42Tests()`;
   - `runAllEnterpriseTests()`.

## Test krytyczny Parsera

W oknie Import wklej:

`magazyn Inne beczki Pilsner 2`

Oczekiwany wynik:

- jedna pozycja;
- produkt `Inne beczki Pilsner`;
- wartość `2`;
- lokalizacja `Magazyn`;
- brak przypisania do innego produktu.

Powtórz test dla `darkroom` i `lodówki`.

## Test cofnięcia importu

1. Zanotuj wartości produktu w magazynie, darkroomie i lodówkach.
2. Zapisz próbny import zawierający co najmniej dwie lokalizacje.
3. Wybierz `Cofnij ostatni import`.
4. Sprawdź, czy każda zmieniona komórka wróciła dokładnie do poprzedniej wartości.
5. Jeżeli wcześniej była pusta, po cofnięciu ma ponownie być pusta, a nie zawierać `0`.

## Test końcowego przeglądu

1. Otwórz `Raportowanie → Końcowy przegląd i eksport`.
2. Zmień jedno dostępne pole wartości.
3. Kliknij `Zapisz zmiany`.
4. Sprawdź tę samą komórkę w arkuszu INWENTURA.
5. Nie kończ inwentaryzacji, jeżeli test odbywa się na danych produkcyjnych.

## Test historii i widoków

1. Otwórz `Historia zdarzeń` i sprawdź, czy nowy import jest widoczny.
2. Przetestuj filtr typu oraz wyszukiwanie po ID lub opisie.
3. Włącz `Widok użytkownika` — techniczne arkusze Raport, Audyt importów i Log techniczny powinny być ukryte.
4. Otwórz każde główne okno i sprawdź przycisk `? Pomoc`.

## Test aliasów

1. Otwórz Alias Manager.
2. Uruchom porządkowanie chronologiczne, według produktu i alfabetyczne.
3. Sprawdź, czy zniknęły puste przerwy i czy przypisania alias → produkt nie uległy zmianie.

## Test eksportu — wyłącznie na kopii

1. Otwórz Końcowy przegląd.
2. Wygeneruj XLSX i PDF.
3. Sprawdź pliki, arkusz ARCHIWUM oraz zdarzenie EXPORT w Historii zdarzeń.
4. Sprawdź, czy bieżąca inwentura została przygotowana do kolejnego cyklu zgodnie z oczekiwaniem.

W przypadku błędu zapisz: wersję aplikacji, tekst wejściowy, ID importu, zrzut ekranu oraz wynik Diagnostyki Parsera.
