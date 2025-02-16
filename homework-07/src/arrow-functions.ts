/**
 * Підготувати файл arrow-functions.ts, у якому створити стрілкову функцію,
 * яка приймає масив і робить операцію арифметичного додавання елементів і повертає результат операції.
 * Після цього створити 2 масиви (один масив рядків, інший масив чисел) і передати їх як аргумент функції.
 * Результат роботи стрілкової функції вивести в консоль
 */
// Стрілкова функція для додавання елементів масиву однією строкою
const sumArrayElementsOneLine = (arr: (string[] | number[])): string | number =>
    typeof arr[0] === 'string' ? arr.join('') : (arr as number[]).reduce((sum, current) => sum + current);

// Стрілкова функція для додавання елементів масиву через умову
const sumArrayElementsIfElse = (data: (string[] | number[])): string | number => {
    if (typeof data[0] === 'string') {
        return data.join('');
    } else {
        return (data as number[]).reduce((sum, current) => sum + current);
    }
};

// Створення масивів рядків і чисел
const arrowStringArray = ['Hello', ' ', 'World', '!'];
const arrowNumberArray = [1, 2, 3, 4];
//const testArray = ['Hello', 1];

// Виведення результатів роботи функції в консоль
console.log(`Конкатенація рядків: ${sumArrayElementsOneLine(arrowStringArray)}`);
//console.log(`Конкатенація змішаних типів: ${sumArrayElementsOneLine(testArray)}`); - не компілюється через неприйнятний для функції тип.
console.log(`Сума чисел: ${sumArrayElementsOneLine(arrowNumberArray)}`);
console.log(`Конкатенація рядків (if-else): ${sumArrayElementsIfElse(arrowStringArray)}`);
console.log(`Сума чисел (if-else): ${sumArrayElementsIfElse(arrowNumberArray)}`);

