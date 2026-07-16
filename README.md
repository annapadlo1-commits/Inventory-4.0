# Inventory PRO 4.2.1 — Smart Review & Diagnostics

Pełna, spójna paczka aplikacji dla lokalizacji PAWILONY. Zastępuje mieszaną paczkę RC3/RC4/Parser 3.1.

## Instalacja

1. Utwórz kopię zapasową arkusza i projektu Apps Script.
2. Usuń z projektu stare pliki `.gs` i `.html`, w szczególności wszystkie dodatkowe pliki Parsera, Pipeline i State Machine.
3. Wgraj komplet plików `.gs` i `.html` z tej paczki.
4. Zawartość `appsscript.json` wklej do manifestu projektu Apps Script.
5. Zapisz projekt i uruchom `enterpriseSetup()`.
6. Odśwież arkusz.
7. Uruchom `runParserContractTests()`, `runParserPerformanceTests()`, `runInventory42Tests()` oraz `runAllEnterpriseTests()`.
8. W kopii arkusza wykonaj próbny import przed użyciem produkcyjnym.

## Najważniejsze zmiany

- jeden produkcyjny punkt wejścia `parseInventoryText()` w `20_Parser.gs`;
- usunięty niedokończony Pipeline i Parser 3.1 w trybie shadow;
- bezpieczny longest-match dla nazw, aliasów, wieku i liczb w nazwach;
- naprawiony przypadek `Osco 2 years 22`;
- kolizje kluczy katalogowych nie są rozstrzygane kolejnością produktów;
- ręczne zmiany SŁOWNIKA unieważniają cache Parsera;
- poprawiona obsługa wartości z przecinkiem w Smart Review;
- błędne pozycje nie są zaznaczane przez „Zaznacz wszystko”;
- zapis jest blokowany dla `NaN`, wartości ujemnych i nierozwiązanych pozycji;
- cofanie importu korzysta z prawidłowego arkusza `Audyt importow`;
- w przypadku błędu po zapisie kolumn inwentury Writer przywraca poprzednie wartości.

## Smart Review 4.2

- powtarzające się wpisy tego samego produktu są automatycznie łączone, z możliwością ich rozdzielenia;
- kolejka decyzji prowadzi użytkownika po pozycjach wymagających uwagi;
- wynik jest porównywany z poprzednią wartością w arkuszu i ostrzega o nietypowej zmianie;
- pasek postępu pokazuje etap analizy i etap renderowania podglądu;
- automatyczna nauka aliasów odrzuca niejednoznaczne skróty, szczególnie pomijające numer wariantu produktu;
- centrum `Diagnostyka Parsera 4.2` pokazuje tokeny, wynik rozpoznania, kandydatów i czasy etapów.

## Poprawki krytyczne 4.2.1

- parser zachowuje pełną nazwę po markerze lokalizacji, np. `magazyn Inne beczki Pilsner 2`;
- dopasowanie jest blokowane, jeżeli wymagałoby pominięcia początku nazwy produktu;
- cofanie importu grupuje wielokrotne zapisy do tej samej komórki i przywraca stan sprzed pierwszego zapisu;
- puste komórki po cofnięciu ponownie są puste zamiast zawierać `0`;
- podgląd weryfikacji ma większe okno i automatycznie zwija tekst źródłowy, który można ponownie rozwinąć.
- widok „O aplikacji” nie zawiera już wielomegabajtowego obrazu Base64;
- końcowy przegląd udostępnia ręczną edycję bezpiecznych pól wejściowych i zapis zmian przed eksportem;
- potwierdzenia eksportu i operacji na aliasach korzystają z modali Inventory PRO zamiast okien przeglądarki;
- Alias Manager usuwa luki i pozwala porządkować rekordy według kolejności dodania, produktu lub aliasu A–Z.
- każde okno ma przycisk „? Pomoc” z objaśnieniem jego sekcji, a menu zawiera ogólny przewodnik po procesie i danych;
- widok użytkownika pokazuje dane robocze, natomiast rejestry potrzebne do cofania i diagnostyki pozostają ukryte w widoku managera;
- „Historia zdarzeń” zawiera skrócony przebieg operacji, a lista archiwów w Porównaniu pokazuje stany możliwe do zestawienia.
- nowe importy nie są już zapisywane podwójnie: `Audyt importow` przechowuje dane potrzebne do cofania, duplikatów i kontroli jakości, a dawny `Raport` jest tylko źródłem zgodności dla starszych wpisów.
- Historia zdarzeń ma osobny, filtrowany widok tylko do odczytu i nie wymaga pracy na surowym arkuszu.

## Performance 4.2

- trigramowy indeks kandydatów ogranicza fuzzy matching do maksymalnie 20 produktów;
- pełny Levenshtein jest wykonywany tylko dla 5 finalistów;
- rzadkie trigramy ograniczają liczbę operacji przy dużych katalogach;
- indeksy katalogu są współdzielone przez snapshot runtime, a memo pozostaje osobne dla analizy;
- wynik analizy zawiera czasy etapów i liczbę kosztownych dopasowań;
- katalog produktów jest przesyłany do interfejsu tylko raz;
- podgląd renderuje po 60 wierszy, dzięki czemu duży import nie blokuje okna.

Benchmark lokalny paczki (syntetyczny katalog):

- 250 wpisów dokładnych / 350 produktów: ok. 0,03 s;
- 250 wpisów z literówką / 350 produktów: ok. 2,2 s;
- 500 wpisów dokładnych / 700 produktów: ok. 0,05 s;
- 500 wpisów z literówką / 700 produktów: ok. 4,8 s.

## UX 4.2

- jeden czteroetapowy proces: Wklej tekst → Analiza → Weryfikacja → Zapis;
- wspólny design system: bordo `#8B1E3F`, bursztyn `#F59E0B`, jasne tło `#F7F5F3`;
- spójne statusy: Gotowe, Sprawdź, Wybierz produkt, Wymaga poprawy;
- filtry aktywnych błędów, duplikatów i ręcznych zmian;
- nawigacja do następnego błędu działa także dla jeszcze niewyrenderowanych pozycji;
- edycja pojedynczej pozycji nie wymaga ponownej analizy całego importu.
- duplikaty są prezentowane jako jedna pozycja, a dane źródłowe pozostają dostępne do cofnięcia scalenia;
- komunikaty o poprzedniej wartości pomagają wykryć pomyłkę przed zapisem.

## Testy obowiązkowe

- `Osco 2 years old 22`
- `Osco 2 years 22`
- `Bacardi 8 0,987 Bacardi 10 1,123`
- `Jameson 12 Auchentoshan 12 1,234`
- `1,407 Ardbeg 10`
- `amaro lucano zero 1,234`
- `żubrówka bison grass pół litra 1,234`
- ten sam zestaw z Enterami i w jednym ciągu
- lokalizacje `magazyn`, `darkroom`, `lodówki`
- ręczna korekta wartości `1,25`
- cofnięcie ostatniego próbnego importu
