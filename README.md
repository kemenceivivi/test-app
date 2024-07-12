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

**Megoldás**:
A useApi.ts-ben a kód "Unauthorized" hibaüzenet alapján kezeli a 401-es hibákat. Az API hook-ok nem kezelnek más típusú hibákat, 
mint például a hálózati hibákat vagy a szerver hibákat (Unauthorized kívül) hatékonyan.
API válaszok mockolására a Mirage JS nevű könyvtérat használtam. Cookie-alapú autentikációt alkalmaztam, 
js-cookie könyvtárat választottam, ami lehetővé teszi a cookie-k biztonságos kezelését, HttpOnly és secure 
beállításokkal. A Mirage JS segítségével pedig úgy konfiguráltam a szervert, hogy a sikeres bejelentkezés után állítson 
be egy cookie-t. Az oldal frissítése után sem jelentkeztet ki a rendszer.

Az App komponenst az AuthProvider-be wrappeltem, hogy globálisan elérhetővé tegyem az autentikációs állapotot és a műveleteit,
hogy könnyen kezelhessem a privát útvonalakat, hogy bizonyos oldalak csak hitelesített felhasználók számára legyenek elérhetőek.

### 2. Bejelentkezési Felület Létrehozása

**Feladat**: Hozz létre egy bejelentkezési felületet.

**Részletek**: Készíts egy új komponenst `Login.tsx` néven a `src/components` mappában. A bejelentkezési felületnek legyen két input mezője (felhasználónév és jelszó) és egy bejelentkezés gomb. A bejelentkezési adatok ellenőrzéséhez használj egy egyszerű feltételt, amely elfogadja az "admin" felhasználónevet és a "password" jelszót.

**Megoldás**:
A projekthez a Material-UI-t használtam, ezzel létrehoztam a Login formot, két beviteli mezőt (TextField) 
és egy bejelentkezés gombot (CustomButton) implementáltam, amelyek segítségével az "admin" felhasználónév és "password" jelszó alapján történik az autentikáció.
Az autentikáció során felmerülő szerver oldali hibákat a react-toastify segítségével jelenítem meg.
Kliens oldalon jelenleg csak azt validálom, hogy üresek -e a beviteli mezők. Form kezelésére Formik könyvtárat használtam, a Yup könyvtár segítségével definiáltam a validációs szabályokat.
### 3. Szűrő Felület Létrehozása

**Feladat**: A bejelentkezési felület elkészülte után a felhasználó bejelentkezésekor jelenjen meg a szűrő felület. (A félig elkészült http://localhost:3000 oldalon lévő `src/components/UserList.tsx`)

**Részletek**: A szűrő felületen egy statikus tömbben lévő nevekkel működjön a szűrő. Használj typeahead-et, hogy gépelésre elkezdje szűkíteni a neveket a szűrő mezőben. Például a következő statikus tömbbel dolgozhatsz(A jelenlegi müködést hogy APIn várja modosítani kell, és a szürési müködést is át kell alakítani a kérteknek megfelelően):

**Megoldás**:
A bejelentkezés sikeres megerősítése után a UserList.tsx komponensben megjelenik a typeahead funkcionalitást használó szűrő felület, amely egy statikus tömbből (users) dolgozik,
és dinamikusan szűri a felhasználók neveit a beírt szöveg alapján. Az Autocomplete komponenst használtam a typeahead megvalósításához.
Valamint a feladat elkezdése előtt mockoltam az 'api/users' - t, viszont a feladat leírása miatt statikus tömbbel dolgoztam tovább.

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

**Megoldás**:
Létrehoztam a szükséges fájlokat. A Dockerfile leírja, hogyan kell felépíteni a Docker imaget, 
a függőségek telepítését és az alkalmazás indítását. A docker-compose.yml segít több konténer egyszerű indításában és kezelésében 
a docker-compose up parancs segítségével. A .dockerignore fájl megmondja a Dockernek, mely fájlokat hagyja figyelmen kívül, így gyorsabb és kisebb imaget kapunk.

**Egyéb**:
A kód formatáláshoz prettiert használtam, hogy könnyen követhetőek legyenek a kódban a változások commitolás során.
Voltak eslint warningok, amiket kijavítottam, pl: return típusok hiánya. TODO-ként beraknék egy Loading komponenst.
## Dokumentáció és Beadás

- Készíts egy rövid dokumentációt a feladatok elvégzéséről, beleértve a használt eszközöket és a telepítési lépéseket. A jelenegi readme.md-t felülirva ezekkel a leírásokkal.
- Forkold a projektet a [GitHub repository](https://github.com/melonapp/test-app) oldaláról, és a kész projektet publikusan töltsd fel a saját GitHub repódba. Oszd meg a repó linkjét.

## Jó Munkát!
