/**
 * Підготувати файл functions.ts, у якому створити функцію,
 * яка приймає масив і робить операцію арифметичного додавання елементів і повертає результат операції.
 * Після цього створити 2 масиви (один масив рядків, інший масив чисел) і передати їх як аргумент функції.
 * Результат роботи функції вивести в консоль
 */

// Залишив ти (number | string)[] але додав перевірку на тип масива, який отримав
function lazySumArrayElements(data: (string | number)[]): string | number {
    console.log('Вхідні дані:', data);

    if (data.length === 0) {
        throw new Error('Масив порожній');
    }

    const isStringArray = data.every(element => typeof element === 'string');
    const isNumberArray = data.every(element => typeof element === 'number');

    if (!isStringArray && !isNumberArray) {
        throw new Error('Невідповідні типи в масиві');
    }

    if (isStringArray) {
        return data.join('');
    } else {
        return (data as number[]).reduce((sum, current) => sum + current);
    }
}

// Тут функція одразу не приймає змішаний масив;
function sumArrayElements(data: string[] | number[]): string | number {
    console.log(`Вхідні дані: ${data}`);

    if (data.length === 0) {
        return 'Масив порожній';
    }
    if (typeof data[0] === 'string') {
        return data.join('');
    } else {
        return (data as number[]).reduce((sum, current) => sum + current);
    }
}

// Створення масиви рядків і чисел
const stringArray = ['Hello', ' ', 'World', '!'];
const numberArray = [1, 2, 3, 4];
const mixedArray = ['Hello', 3];
const emptyArray: number[] = [];

try {
    console.log(`Цифровий масив: ${sumArrayElements(numberArray)}`);
    console.log(`Цифровий масив: ${lazySumArrayElements(numberArray)}`);
    console.log(`Масив рядків: ${sumArrayElements(stringArray)}`);
    console.log(`Масив рядків: ${lazySumArrayElements(stringArray)}`);
    console.log(`Пустий масив: ${sumArrayElements(emptyArray)}`);
    //console.log(`Пустий масив: ${lazySumArrayElements(emptyArray)}`); - закоментив, щоб код не зупинявся.
    console.log(`Масив із різними типами: ${lazySumArrayElements(mixedArray)}`);
    // console.log(sumArrayElements(mixedArray) - закоментовано, бо код не компілюється при спробі передати невідповідний тип у функцію.
} catch (error) {
    console.error('Помилка:', (error as Error).message);
}
