/**
 * Підготувати файл promises.js, у якому написати функцію, що відсилатиме за допомогою функції fetch запит на ресурс, який повертає JSON.
 * Через ланцюжок then() обробти запит і перевикористати цей JSON у іншій функції.
 */

// Функція для отримання даних через promise
function fetchUserData() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            console.log(`Отримані дані юзерів:`);
            users.forEach(user => {
                console.log({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    company: user.company.name
                });
            });
            return users;
        })
        .then(users => processUserData(users))
        .catch(error => {
            console.error(`Помилка при отриманні даних: ${error}`);
        });
}

// Функція для обробки отриманих даних
function processUserData(users) {
    const processedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company.name
    }));
    console.log(`Оброблені дані юзерів:`);
    users.forEach(user => {
        console.log({
            id: user.id,
            name: user.name,
            email: user.email,
            company: user.company.name
        });
    });
    return processedUsers;
}

fetchUserData();

