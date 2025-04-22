FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Рабочая директория
WORKDIR /tests

# Копирование файлов проекта
COPY . .

# Установка зависимостей
RUN npm install
RUN npx playwright install --with-deps chromium

# Команда для запуска тестов
CMD ["sh", "-c", "npx playwright test"]