/**
 * Підготувати файл functions.js, у якому створити функцію,
 * яка приймає масив і робить операцію арифметичного додавання елементів і повертає результат операції.
 * Після цього створити 2 масиви (один масив рядків, інший масив чисел) і передати їх як аргумент функції.
 * Результат роботи функції вивести в консоль
 */

// Функцыя для додавання елементів масиву
function sumArrayElements(arr) {
    return arr.reduce((sum, current) => sum + current);
}

// Створення масиви рядків і чисел
const stringArray = ["Hello", " ", "World", "!"];
const numberArray = [1, 2, 3, 4];

// Виведення результатів роботи функцій в консоль
console.log(`Конкатенація рядків: ${sumArrayElements(stringArray)}`);
console.log(`Сума чисел: ${sumArrayElements(numberArray)}`);
