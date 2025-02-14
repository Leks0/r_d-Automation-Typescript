/**
 * Підготувати файл functions.ts, у якому створити функцію,
 * яка приймає масив і робить операцію арифметичного додавання елементів і повертає результат операції.
 * Після цього створити 2 масиви (один масив рядків, інший масив чисел) і передати їх як аргумент функції.
 * Результат роботи функції вивести в консоль
 */

// Спробував просто типізувати дані, які приймає функція - всерівно ругається через використання додавання з різними типами даних
function lazySumArrayElements(data: (string | number)[]): string | number {
    return data.reduce((sum, current) => sum + current);
}

// Тепер спробую в функції через умову розділити роботу в залежності від типу даних
function extSumArrayElements(data: (string | number)[]): string | number {
    if (typeof data[0] === 'string') {
        return data.join('');
    } else {
        return data.reduce((sum, current) => (sum as number) + (current as number), 0);
    }
}

// Створення масиви рядків і чисел
const stringArray = ['Hello', ' ', 'World', '!'];
const numberArray = [1, 2, 3, 4];
console.log(`Конкатенація рядків: ${lazySumArrayElements(stringArray)}`);
console.log(`Сума чисел: ${lazySumArrayElements(numberArray)}`);

console.log(`Конкатенація рядків: ${extSumArrayElements(stringArray)}`);
console.log(`Сума чисел: ${extSumArrayElements(numberArray)}`);
