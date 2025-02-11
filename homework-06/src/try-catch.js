/**
 * Зробити файл try-catch.js, у кому написати запит на сервіс, якого не існує, і внаслідок помилки запи направлятиметься на той, що існує.
 * Якщо і на іншому ресурсі з якихось причин буде хибна відповідь від сервера - згенерувати власну помилку.
 */

// Власний клас помилки
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

// Функція для виконання запиту з обробкою помилок
async function fetchWithFallback() {
    try {
        const response = await fetch('https://not-existed-endpoint.com/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Помилка при запиті, спробуємо альтернативний ресурс: ");

        try {
            const alternativeResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!alternativeResponse.ok) {
                throw new CustomError("Помилка відповіді від альтернативного ресурса");
            }
            const alternativeData = await alternativeResponse.json();
            return alternativeData;
        } catch (alternativeError) {
            if (alternativeError instanceof CustomError) {
                throw alternativeError;
            }
            throw new CustomError("Помилка при виконанні альтернативного запиту");
        }
    }
}

fetchWithFallback()
    .then(data => console.log(`Отримані дані: ${JSON.stringify(data)}`))
    .catch(error => console.log(`Фінальна помилка: ${error.message}`));
