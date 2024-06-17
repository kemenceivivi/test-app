## Előkövetelmények

- Node.js és npm/yarn telepítve
- Ismeretek a következő technológiákban:
  - React
  - TypeScript
  - ESLint, Prettier, Stylelint
  - Docker

## Projekt Beállítása

1. Töltsd le és csomagold ki a projektet.
2. Nyisd meg a terminált és navigálj a projekt könyvtárába.
3. Telepítsd a szükséges függőségeket:

    ```sh
    yarn install
    ```

4. Indítsd el a fejlesztői szervert:

    ```sh
    yarn start
    ```

5. Nyisd meg a böngészőt, és navigálj a `http://localhost:3000` címre.

## Feladatok

### Fontos:

A letöltés után bármilyen hibába belefutsz, próbáld megoldani, és dokumentáld, hogy milyen hibákba ütköztél.

### 1. Hibajavítás

**Feladat**: Javítsd a hibákat az `src/components/useApi.ts` fájlban.

**Részletek**: Az API hívások hibakezelése nem megfelelően van implementálva. Javítsd ki a hibákat, és győződj meg róla, hogy az alkalmazás megfelelően kezeli az API hívások során felmerülő hibákat. Például ellenőrizd, hogy az `Unauthorized` hiba esetén a felhasználó átirányításra kerül a bejelentkezési oldalra.

### 2. Bejelentkezési Felület Létrehozása

**Feladat**: Hozz létre egy bejelentkezési felületet.

**Részletek**: Készíts egy új komponenst `Login.tsx` néven a `src/components` mappában. A bejelentkezési felületnek legyen két input mezője (felhasználónév és jelszó) és egy bejelentkezés gomb. A bejelentkezési adatok ellenőrzéséhez használj egy egyszerű feltételt, amely elfogadja az "admin" felhasználónevet és a "password" jelszót.

### 3. Szűrő Felület Létrehozása

**Feladat**: A bejelentkezési felület elkészülte után a felhasználó bejelentkezésekor jelenjen meg a szűrő felület. (A félig elkészült http://localhost:3000 oldalon lévő `src/components/UserList.tsx`)

**Részletek**: A szűrő felületen egy statikus tömbben lévő nevekkel működjön a szűrő. Használj typeahead-et, hogy gépelésre elkezdje szűkíteni a neveket a szűrő mezőben. Például a következő statikus tömbbel dolgozhatsz(A jelenlegi müködést hogy APIn várja modosítani kell, és a szürési müködést is át kell alakítani a kérteknek megfelelően):

```tsx
const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Robert Brown' }
];
```

### 4. Docker Környezet Beállítása (plusz feladat)

**Feladat**: Készíts egy Dockerfile-t és egy docker-compose.yml fájlt az alkalmazáshoz.

**Részletek**: A Dockerfile és a docker-compose.yml segítségével a `docker-compose up` parancsot futtatva épüljön meg és induljon el az alkalmazás egy Docker konténerben.

## Dokumentáció és Beadás

- Készíts egy rövid dokumentációt a feladatok elvégzéséről, beleértve a használt eszközöket és a telepítési lépéseket. A jelenegi readme.md-t felülirva ezekkel a leírásokkal.
- Forkold a projektet a [GitHub repository](https://github.com/melonapp/test-app) oldaláról, és a kész projektet publikusan töltsd fel a saját GitHub repódba. Oszd meg a repó linkjét.

## Jó Munkát!
