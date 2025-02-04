// Objects
// Одразу створити НЕпустий обʼєкт:
const book = {
    title: "Майстер і Маргарита",
    author: "Михайло Булгаков",
    year: 1967,
    genre: "Роман",
    isAvailable: true
};
console.log(book);

// Спочатку створити пустий обʼєкт, потім присвоїти йому значення:
let car = {};
car = {
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "блакитний",
    mileage: 15000
};
console.log*(car);

// Вивід даних з обʼєктів:
const golf = {
    brand: "Volkswagen",
    model: "Golf",
    year: "2023-01-15",
    color: "Red",
    price: 25000,
    mileage: undefined,
    engine: {
        capacity: "1.5",
        type: "TSI",
        power: "150 HP",
        fuelType: "Petrol"
    },
    features: {
        bluetooth: true,
        airConditioning: true,
        cruiseControl: true,
        heatedSeats: true,
        navigationSystem: false,
        leatherSeats: false,
        dualZoneClimateControl: false
    }
};

const passat = {
    brand: "Volkswagen",
    model: "Passat",
    year: 2023,
    color: "Blue",
    price: 30000,
    mileage: 12000,
    engine: {
        capacity: "2.0",
        type: "TDI",
        power: "190 HP",
        fuelType: "Diesel"
    },
    features: {
        bluetooth: true,
        airConditioning: true,
        cruiseControl: true,
        heatedSeats: true,
        navigationSystem: true,
        leatherSeats: true,
        dualZoneClimateControl: true
    }
};
// Вивід інформації:
console.log(golf, passat); // обʼєкти повністю;
console.log(golf == passat); // порівняння обʼєктів не враховуючи типи даних;
console.log(golf === passat); // порівняння обʼєктиів враховуючи типи даних;
console.log(Object.keys(golf)); // повертає масив усіх ключів на першому рівні об'єкта golf:
console.log(Object.values(golf)); // повертає масив значень властивостей об'єкта golf;
console.log(Object.values(golf.engine)); // повертає масив значень властивостей об'єкта engine;
console.log(Object.entries(golf)); // перетворює об'єкт на масив масивів;

// Зміна окремих даних в обʼєктах:
const book1 = {
    title: "Майстер і Маргарита",
    author: "Михайло Булгаков",
    year: 1967,
    genre: "Роман",
    isAvailable: true
};
const book2 = book1;
let book3 = book1;
/** const <obj> -  не можете переприсвоїти змінну, можу змінити вміст обʼєкта
 * але можете змінювати значення властивостей його обʼєкта
 */
book2.title = "Clean Code: A Handbook of Agile Software Craftsmanship";
book2.author = "Robert C. Martin";
book2.year = "2008";
book2.genre = "Programming";

console.log("Чи відображаються зміни в обʼєкті для двох обʼєктів? -", book1.title === book2.title);
book3 = "any text";
console.log("Чи можна переприсвоїти зміну let <obj>? - ", book1 !== book3);

// Клонування/копіювання
/**
 * Object.assign(<destination_object>, <source_object>);
 * - копіює одновимірні обʼєкти;
 * - може змінювати оригінальний обʼєкт;
 * - якщо є вкладені обʼєкти - робить посилання на них (а не копіює);
 * - кращий при роботі зі старим кодом;
 * - краща продуктивність з великими обʼєктами.
 */
const assignBook1 = Object.assign({}, book2); // копія обʼєкта
const assignBook2 = Object.assign(book2, { "genre": "it" });
console.log(assignBook2);
console.log("Скопійований варіант: ", assignBook1.genre, ", Змінений варіант",book2.genre);
/**
 * {...<source_object>};
 * - копіює одновимірні обʼєкти;
 * - не може змінювати оригінальний обʼєкт - створює новий обʼєкт;
 * - якщо є вкладені обʼєкти - робить посилання на них (а не копіює);
 * - кращий в роботі з сучасними фреймворками.
 */
const spreadBook1 = {...book2, "genre": "programming"};
const spreadBook2 = {...book2};
console.log(spreadBook2);
console.log("до зміни: ", book2.genre, ", в скопійованому обʼєкті: ", spreadBook1.genre, ", після спроби зміни: ", book2.genre);
/**
 * structuredClone(<source object>);
 * - може копіювати вкладені обʼєкти;
 * - може копіювати більшість типів даних (обʼєкти, масиви, примітивні значення);
 */
const golf2 = structuredClone(golf);
console.log("Чи однакові обʼєкти після копіювання: ", golf2 == golf, "(ой, випадково порівняв розміщення обʼєктів)"); // як виявилось "golf2 == golf)" порівнює розміщення обʼєктів
console.log("Чи однакові обʼєкти після копіювання: ", JSON.stringify(golf) == JSON.stringify(golf2));
golf2.engine.capacity = "2.0";
golf2.engine.fuelType = "Diesel";
console.log("Чи однакові обʼєкти після зміни даних у скопійованому вкладеному обʼєкті? - ", JSON.stringify(golf) == JSON.stringify(golf2));
/**
 * JSON.parse(JSON.stringify(<source_object>));
 * - може клонувати більшість типів даних: обʼєкти, масиви і примітивні значення.
 */
const golf3 = JSON.parse(JSON.stringify(golf));
console.log("Чи однакові обʼєкти після зміни даних у скопійованому вкладеному обʼєкті? - ", JSON.stringify(golf) == JSON.stringify(golf3));
console.log("\n -------------- \n");
/**
 * Метод — це функція, яка є частиною обʼєкта.
 * Вона є властивістю обʼєкта і описує дію, яку може виконати обʼєкт.
 */
const person1 = {
    name: "Іван",
    age: 25,
    changeName(name) {                            // Додамо влластивість - функцію, яка приймає значеня;
        this.name = name;                           // змінимо властивість 'name' значенням від користувача.
        console.log (this.name);
    },
    greeting: function() {                          // Додаємо властивість, яка є функцією
        return `Привіт, мене звати ${this.name}`;     // Тут беремо дані з ЦЬОГО (this) обʼєкту.
    }
};

console.log("Метод обʼєкта 'greeting':", person1.greeting());
person1.surname = function() {
    return this.name + 'енко';
};
console.log("Додано метод 'surname': ", person1.surname());
person1.changeName("John");
console.log("\n ----- \n");
/**
 * Конструкктор - це функція, результом роботи якої є обʼєкт.
 */
function personConstructor(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
}

const person2 = new personConstructor("Jack", "Richer", 32);
console.log(person2);
console.log("Перевіримо наявність в обʼєкті властивості 'gender': ", person2?.gender);
/**
 * MAP - колекція пар ключ-значення.
 * Доцільно використовувати коли:
 * - потрібно часто додавати/видаляти пари ключ-значення;
 * - бажаємо використовувати обʼєкти або масиви як ключі;
 * - зберігає порядок елементів;
 */
const userStatus = new Map();

const user = {id: 1, name: "John"};
userStatus.set(user, "online");

console.log(userStatus.get(user));
/**
 * SET - колекція унікальних значень.
 * Доцільно використовувати:
 * - автоматично видаляє дублікати;
 * - Для швидкого пошуку значень.
 */
// Видалення дублікатів з масиву:
const categories = ["Sport", "News", "Weather", "Sport", "News"];
const uniqueCategories = [...new Set(categories)];
console.log(uniqueCategories);
// Швидкий пошук значень
const domains = new Set(["gmail.com", "i.ua", "ukr.net"]);

function checkMail(email) {
    const domain = email.split("@")[1]; // ділимо стрінгу на масив значень розділених "@" і беремо другий елемент масиву
    console.log(domain);
    return domains.has(domain);
}

console.log(checkMail("test@gmail.com"));
console.log(checkMail("test@yahoo.com"));

/**
 * Масиви - обʼєкт, призначений для роботи з впорядкованими колекціями даних.
 * Може зберігати від простих числе до складних обʼєктів і інших масивів;
 * Мають вбудований ітератор (починається з "0").
 */
// Створення масивів
const arr1 = new Array();                             // Пустий масив за допомогою конструктора
const arr2 = [];                                      // Пустий масив. Літеральний запис
const arr3 = ["Element 1", "Element 2", "Element 3"]; // Масив з елементами
console.log(arr1, arr2, arr3);
// Модифікація масивів
arr3.push("Element 4");                               // Додає елемент в кінець
arr3.unshift("Element 0");                            // Додає елемент на початок
console.log(arr3);
arr3.pop();                                           // Видаляє останній елемент
arr3.shift();                                         // Видаляє повертає перший елемент
console.log(arr3);

// Обобка даних
const numbers = [0, 1, 2, 3, 4, 5];

/**
 * => - це стрілочна функція.
 * Ліва частина - параметри функції
 * => - позначення стрілочної функції
 * Права частина - тіло функції (яке автоматично повертається)
 * Приклад:
 * звичайний запис функції: const traditional = function(x) { return x + 1; };
 * стрілочний запис функції: const arrow = x => x + 1;
 */

const evenNumbers = numbers.filter(num => num % 2 === 0); // Фільтрація елементів
console.log(evenNumbers);
const findElement = numbers.find(num => num > 3);         // Пошук елементів
console.log(findElement);
const transform = numbers.map(num => num * 2);            // Трансформація елементів
console.log(transform);
const forEach = numbers.forEach(num => console.log(num)); // Перебір елементів
console.log(forEach);                                     // consol.log(console.log()) - дає undefined.
const combine = numbers.concat([6, 7, 8]);                // Обʼєднання масивів
console.log(combine);
const include = numbers.includes(3);                      // Перевірка наявності елемента
console.log(include);
const toString = numbers.join(", ");                      // Створення рядка з елементами масиву
console.log(toString);
console.log("\n ------------ \n");
/**
 * Цикл for найкраще підходить, коли треба точний контроль над процесом ітерації. Складається з:
 * (1) ініціалізація (let i = 0) - виконується один раз на початку;
 * (2) умова (i < 10) - перевіряється перед кожною ітерацією;
 * (3) крок (і++) - виконується після кожної ітерації
 */
for (let i = 0; i < 10; i++) {
    console.log(i);
}
/**
 * for...of найкраще підходить для простого перебору елементів колекції, коли не треба доступ до індексів.
 * Він автоматично проходить через усі елементи, не треба керувати індексом вручну.
 */
const fruits = ["Apple", "Orange", "Pineapple"];

for (const fruit of fruits) {
    console.log(fruit);
}
/**
 * Обидва цикли підтримують спеціальні команди керування:
 * (1) break - прериває виконання циклу;
 * (2) continue - пропускає поточну ітерацію і переходить до наступної.
 */
for (let i = 0; i < 10; i++) {
    if (i === 1) continue;
    if (i === 5) break;
    console.log(i);
}
/**
 * Цикл while перевіряє умову перед кожною ітерацією.
 */
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}
