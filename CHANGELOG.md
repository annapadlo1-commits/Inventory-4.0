# Inventory PRO 4.2.1

## Poprawki krytyczne

- naprawiono rozbijanie `magazyn Inne beczki Pilsner 2` na dwa wpisy;
- dodano blokadę automatycznego dopasowania produktu po pominięciu początku nazwy;
- naprawiono cofanie wielu zapisów trafiających do tej samej komórki;
- cofanie przywraca teraz puste komórki zamiast technicznego zera;
- powiększono okno importu i obszar tabeli weryfikacji, a tekst źródłowy jest zwijany po analizie;
- dodano testy regresji dla pełnej nazwy po lokalizacji i dla kolumn magazyn/darkroom/lodówki.
- odchudzono `UI_About.html` z około 3,5 MB do kilku KB;
- naprawiono mapowanie ręcznie edytowalnych pól końcowego przeglądu i pokazano przycisk zapisu;
- zastąpiono natywne `confirm()` i `alert()` modalami oraz komunikatami aplikacji;
- dodano trzy tryby porządkowania aliasów oraz datę dodania dla nowych rekordów.
- uporządkowano role danych: `Raport`, `Audyt importow`, `Log techniczny` i historyczny arkusz eksportów są ukryte w widoku użytkownika;
- menu „Raportowanie” prowadzi do końcowego przeglądu, dashboardu i porównania zamiast do technicznego rejestru importów;
- dodano wspólną pomoc kontekstową do każdego okna oraz osobny przewodnik dostępny z menu;
- rozróżniono „Historię zdarzeń” od listy stanów archiwalnych dostępnych do porównania;
- naprawiono otwieranie ukrytych arkuszy wybranych świadomie z menu użytkownika.
- usunięto podwójny zapis nowych importów do `Raport` i `Audyt importow`; rozszerzony audyt jest jednym źródłem dla cofania, duplikatów i jakości, z odczytem starego Raportu tylko dla zgodności.
- surowy arkusz `Historia` zastąpiono w codziennym menu czytelnym oknem zdarzeń z filtrem i linkami do plików; arkusz źródłowy pozostaje dostępny w widoku managera.

# Inventory PRO 4.2

## Smart Review i diagnostyka

- dodano automatyczne łączenie identycznych duplikatów bez utraty wpisów źródłowych;
- dodano ręczne rozdzielanie automatycznie scalonej pozycji;
- dodano kolejkę decyzji i nawigację do następnej pozycji wymagającej uwagi;
- dodano porównanie wyniku z poprzednią wartością inwentury oraz ostrzeżenia o nietypowej zmianie;
- dodano etapowy pasek postępu analizy i renderowania podglądu;
- zaostrzono automatyczną naukę aliasów, aby blokować niejednoznaczne skróty numeryczne;
- dodano centrum diagnostyczne Parsera z klasyfikacją tokenów, kandydatami i czasami etapów;
- dodano zestaw `runInventory42Tests()`.

## Wydanie

- wersja aplikacji: `4.2.0`;
- zaktualizowano manifest plików oraz sumy SHA-256.

# Inventory PRO 4.1

## Performance i UX

- dodano trigramowy indeks fuzzy, limit shortlisty 20 i limit 5 pełnych porównań;
- dodano snapshot indeksów runtime oraz jego unieważnianie razem z cache katalogu;
- dodano telemetrykę etapów importu i test kontraktu wydajności;
- katalog resolvera jest pobierany raz na analizę;
- podgląd dużych importów jest renderowany porcjami;
- wprowadzono czteroetapowy workflow, spójne statusy i design system bordo/bursztyn;
- rozszerzono bezpieczne zakotwiczenie SMART o literówki z ochroną cyfr.

## Parser

- ujednolicono publiczne API Parsera;
- usunięto niedokończone implementacje równoległe;
- rozdzielono dokładne frazy katalogowe od agresywnych wariantów technicznych;
- dodano bezpieczną obsługę skróconych markerów wieku;
- dopasowanie zwraca kanoniczną nazwę produktu z katalogu;
- poprawiono testy nazw numerycznych i testy niezależne od danych arkusza.

## Import i dane

- naprawiono walidację wartości w UI;
- naprawiono blokowanie zapisu i status nowego produktu;
- dodano rollback kolumn inwentury przy błędzie dalszej części zapisu;
- naprawiono źródło danych dla funkcji cofania importu;
- dodano automatyczne unieważnianie cache po ręcznej zmianie SŁOWNIKA.

## Wydanie

- wersja aplikacji: `4.1.0`;
- poprawna nazwa manifestu: `appsscript.json`;
- jeden manifest plików i nowe sumy SHA-256.
