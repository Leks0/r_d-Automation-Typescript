/**
 * Сформувати файл async-await.js, що робитиме те саме, що і в promises.js, але цього разу - через підхід async/await.
 */

// Асинхронна функція для отримання данх
async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log(`Отримані дані юзерів:`);
        users.forEach(user => {
            console.dir(user);
        });

        const processedData = await processedUserData(users);
        return processedData;
    } catch (error) {
        console.error(`Помилка при отриманні даних: ${error}`);
    }
}

// Функція для обробки отриманих даних
async function processedUserData(users) {
    const processedUsers = users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company.name
    }));
    console.log(`Оброблені дані користувачіув:`);
    processedUsers.forEach(user => {
        console.dir(user);
    });
    return processedUsers;
}

fetchUserData();
