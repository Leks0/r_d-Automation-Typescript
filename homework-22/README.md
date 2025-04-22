# 🧪 Expense Tracker E2E Tests with Playwright & ReportPortal
Цей проєкт виконує end-to-end тестування React-додатку у Docker, використовуючи:

- **Playwright** для UI-тестів
- **Docker Compose** для запуску окремих контейнерів
- **ReportPortal** для централізованого логування результатів

## ⚙️ Налаштування
### 1. Клонувати репозиторій:
```bash
git clone <repo-url>
cd <project-folder>
```
### 2. Створити .env файл на основі шаблону:
```bash
cp .env.example .env
```
### 3. 🔑 У .env заповнити змінні для ReportPortal:
```env
RP_API_KEY=<твій токен зі сторінки профілю>
RP_PROJECT=superadmin_personal
RP_ENDPOINT=http://host.docker.internal:8080/api/v1
RP_LAUNCH_NAME=Playwright Tests
BASE_URL=http://expense-tracker-app:3000
```
## 🚀 Запуск проєкту (по кроках)
```bash
# 1. Побудувати контейнер, який створить docker-compose.yml для ReportPortal
docker build -f reportportal/Dockerfile -t reportportal-setup ./reportportal

# 2. Запустити одноразовий контейнер для генерації docker-compose.yml
docker run --rm -v $PWD/reportportal:/export reportportal-setup

# 3. Підняти ReportPortal у фоновому режимі
docker compose -f ./reportportal/docker-compose.yml -p reportportal up -d --force-recreate

# 4. Запустити додаток + тести
docker compose --env-file .env up --build --abort-on-container-exit

# 5. Зупинити reportportal
docker compose -f reportportal/docker-compose.yml -p reportportal down

```
## ✅ Результат
- React-додаток працює на http://localhost:3000
- Playwright запускає тести після старту апки
- Результати потрапляють у ReportPortal
- Посилання на запуск зʼявляється наприкінці:
```bash
🔗 ReportPortal (UI): http://localhost:8080/ui/#superadmin_personal/launches/all
```
## 🔐 ReportPortal доступ
Після запуску reportportal, інтерфейс доступний за адресою:
 - 🌐 http://localhost:8080

Доступ:
 - Admin: superadmin / erebus
 - Default user: default / 1q2w3e