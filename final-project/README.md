# FopHelp E2E Тестування

Цей проєкт реалізований у форматі кастомного фреймворку для автоматизованого UI та API тестування сайту [https://new.fophelp.pro](https://new.fophelp.pro), використовуючи Playwright + TypeScript.

## ✨ Покриття UI тестами
Покрито наступні сторінки сервісу:

1. Головна
2. Реєстрація
3. Логін
4. Витрати

**Коментар:**
- Сторінка "Прибутки" реалізована за аналогією зі "Витратами", тому тести не дублював
- Сторінки "Звіти" (Усі, Подані) та "Податки" (Поточні, Сплачені) не тестувалися, оскільки там пусті сторінки
- Можливо, варто протестувати таблиці, але зосередився на сторінках з функціоналом

## 🌐 Технології
- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Allure Reporter](https://github.com/allure-framework/allure-js)
- Docker + Docker Compose

## 📂 Cтруктура проекту
```
src/
├── elements/                       # UI елементи, описані для кожної сторінки
│   └── *.element.ts
└── pages/                          # Page Object класи
    └── *.page.ts 
tests/
├── api/                            # API тести
│   └── *.api.spec.ts 
├── ui/                             # UI тести
│   └── *.spec.ts
├── api/                          # API objects
│   └── *.api.ts
└── dto/                          # DTO
    └── *.dto.ts

allure-results/                     # Сира інформація для Allure
allure-report/                      # Згенеровані HTML звіти
```
де:
- main - сторінка "Домашня";
- register - сторінка "Реєстрація"
- login - сторінка "Увійти"
- expenses - сторінка "Витрати";
- 
## 🚀 Запуск локально
```bash
npm ci
npx playwright install --with-deps
npm run test
npm run allure:generate && npm run allure:open
```

## 🐳 Запуск у Docker
```bash
docker-compose up --build
```
- Перегляд звітів: [http://localhost:5252](http://localhost:5252)
