## 1. Nazwy komponentów
- Używaj **PascalCase** dla nazw komponentów React.
- Każdy komponent powinien znajdować się w swoim własnym folderze, z nazwą odpowiadającą nazwie komponentu.
- Przykład:
/src/components/Button/ ├── Button.jsx ├── Button.stories.jsx ├── Button.module.scss └── index.js

## 2. Nazwy plików
- Używaj **PascalCase** dla nazw plików komponentów React.
- Przykład: `UserProfile.jsx`
- Używaj **kebab-case** dla nazw katalogów i plików, które nie są komponentami (np. pliki narzędziowe).
- Przykład: `utils/helper-functions.js`
- Pliki z historiami Storybook powinny mieć ten sam format co plik komponentu, ale z rozszerzeniem `.stories`.
- Przykład: `Button.stories.jsx`

## 3. Nazwy zmiennych i funkcji
- Używaj **camelCase** dla nazw zmiennych i funkcji.
- Przykład: `fetchUserData()`, `userDetails`.

## 4. Tailwind CSS
- Klasy Tailwind CSS umieszczaj bezpośrednio w atrybucie `className` w komponentach React.
- Unikaj tworzenia niestandardowych klas CSS, jeśli Tailwind oferuje odpowiednie klasy narzędziowe.
- Klasy Tailwind układaj w kolejności logicznej:
1. **Układ** (np. `flex`, `grid`)
2. **Kolory** (np. `text-white`, `bg-blue-500`)
3. **Rozmiary** (np. `p-4`, `text-lg`)

## 5. Hooki
Używaj camelCase z prefiksem use dla nazw hooków.
Przykład: useAuth(), useFetchData().
