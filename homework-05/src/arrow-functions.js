/**
 * Підготувати файл arrow-functions.js, у якому створити стрілкову функцію,
 * яка приймає масив і робить операцію арифметичного додавання елементів і повертає результат операції.
 * Після цього створити 2 масиви (один масив рядків, інший масив чисел) і передати їх як аргумент функції.
 * Результат роботи стрілкової функції вивести в консоль
 */

// Стрілкова функція для додавання елементів масиву
const sumArrayElements = arr => arr.reduce((sum, current) => sum + current);

// Створенн масивів рядків і числе
const stringArray = ["Hello", " ", "World", "!"];
const numberArray = [1, 2, 3, 4];

// Виведення результатів роботи функцій в консоль
console.log(`Конкатенація рядків: ${sumArrayElements(stringArray)}`);
console.log(`Сума чисел: ${sumArrayElements(numberArray)}`);
