/**
 * Підготувати файл arrays.js у якому додати 4 масиви, по 1 на кожен базовий тип (рядок, число, boolean, any),
 * та виконати вивчені операцї над ними включно з перебором (forEach() та map()).
 */
// 1. Додати 4 масиви, по 1 на кожен базовий тип (рядок, число, бінарка, ені):
const stringArray = ["Javascript", "Python", "C", "C#"];
const numberArray = [1, 2, 3, 4, 5];
const booleanArray = [true, true, false, true, false];
const anyArray = ["Javascript", 1, true, "PaymentMethodChangeEvent", 4, false];
console.log(`1.1. Масив з рядками: ${stringArray}`);
console.log(`1.2. Масив з числами: ${numberArray}`);
console.log(`1.3. Масив з бінаркою: ${booleanArray}`);
console.log(`1.4. Масив змішаного типу: ${anyArray}`);

// 2. Операції над масивами
console.log("\n2. Операції над масивами");
console.log("\n2.1. Перебір за допомогою 'forEach':");
stringArray.forEach((item, index) => console.log(`${index}: ${item}`));

console.log("\n2.2. Трансформація за допомогою 'map':");
const numberSquared = numberArray.map(num => num * num);
console.log(`Квадрати чисел: ${numberSquared}`);

console.log("\n2.3. Використання 'filter'");
const trueValues = booleanArray.filter(bool => bool === true);
console.log(`Тільки 'true' значення: ${trueValues}`);

console.log("\n2.4. Пошук елемента");
const firstNumber = anyArray.find(item => typeof item === "number");
console.log(`Перше числове значення: ${firstNumber}`);

console.log("\n2.5. Використання наявності елемента ('includes') і обʼєднання елементів масиву в рядок ('join')");
console.log(`Чи є 'Python' в масиві?: ${stringArray.includes("Python")}`);
console.log(`Мови програмування: ${stringArray.join(", ")}`);

console.log("\n2.6. Обʼєднання масивів ('concat'):");
const stringArrayConcat = stringArray.concat("Java", "Rust", "lua", "D");
console.log(`Обʼєднаний масив: ${stringArrayConcat}`);

