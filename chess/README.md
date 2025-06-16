# Laravel + Vue Docker Fejlesztői Környezet

Ez a projekt egy Laravel backend és Vue frontend alkalmazás Docker konténerekben futtatva.

---

## Követelmények

- Telepített [Docker](https://docs.docker.com/get-docker/)
- Telepített [Docker Compose](https://docs.docker.com/compose/install/) (ha külön kell)

---

## konfigurálás

1. Klónozd le a projektet:

   ```bash
   git clone https://github.com/urambatyam/sakk.git
   ```
2. Hozz létre egy .env nevü fáljt a chess/ mapában majd másold bele a .env.example tartalmát
3. lépjebe a projekt mappába:
    ```bash
    cd ./chess
    ```
4. hozlétre a docker fejlesztői környzetet:
   ```bash
   docker-compose up -d --build
   ```
5. Az oldal elérhető a [Localhost](http://localhost:8000) címen.

---
## Elinditás-leálitás

```bash
docker-compose up -d
docker-compose down
```
Vagy használhatod a docker grafikus felületét is erre.

## Első inditásnál

A forntend npm  parancsait a a frontend kontenéreben kell futani ugyan úgy mint a backendnél a php artisan parancsokat.
Első futatás kor ezeket valszeg le kell futani.
### Bakckend-hez hozzá férés
```bash
docker exec -it laravel bash
php artisan migrate
exit
```
---

### Frontend hozzá férés
```bash
docker exec -it vue bash
npm install
npm run dev
exit
```