// Cтворення всіх типів змінних (let, var) і константи (const)
function vars() {
    const myAge = 30;
    let myName = 'John';
    var yearOfBirth = 1990;

    console.log(myAge, myName, yearOfBirth);
}

// Перевірка можливостей зміни значень змінних і констранти
function dataChange() {
    // зона видимості змінних: ми не маємо доступу до змінних і константи у функції var(), тому треба знову їх обʼявити.
    const myAge = 30;
    let myName = 'John';
    var yearOfBirth = 1989;

    console.log(myAge, myName, yearOfBirth);

    //myAge = 34; - константу змінити неможна. При спробі зміни константи - помилка в консолі.
    myName = 'Yaroslav';
    yearOfBirth = 1990;
    console.log(myAge, myName, yearOfBirth);
}

function dataTypes() {
    //number
    let age = 5;
    let height = 1.86;
    let temperature = -2;
    console.log("numbers:", age, " , ", height, " , ", temperature);

    //BigInt
    let bigNumber = 9007199254740991n;
    let anotherBig = BigInt(123);
    console.log("BigInt:", bigNumber, " , ", anotherBig);

    //String
    let name = "Yaroslav";
    let message = "Hello, world!";
    let phrase = "Hello, my name is ${name}";
    console.log("String", name, " , ", message, " , ", phrase);

    //Boolean
    let isHappy = true;
    let isSad = false;
    console.log("Boolean: ", isHappy, " , ", isSad);

    //Null
    let empty = null;
    console.log("NULL: ", empty);

    //Undefined
    let undefined;
    console.log("Undefined: ", undefined);

    //Object
    let student = {
        name: "John",
        surname: "Dow",
        age: "25",
        isStudent: true
    };
    console.log(`Objects data: ${student.name}, ${student.surname}, ${student.age}`);
    console.log("Інформація про студента: ", student);
    console.log("Інформація про студента: %o", student);
    console.table(student);

    //Symbol
    let id = Symbol("id");
    let id2 = Symbol("id")
    console.log("Symbol: ", id===id2);

    //Any
    let any = 4;
    let byDefault;
    byDefault = any;
    let anyOne, anyTwo;
    any = "text";
    anyOne = any;
    any = false;
    console.log(`default: ${byDefault}, first change: ${anyOne}, second change: ${any}`);
    console.log("default: %d, first change: %s, second change: %s", byDefault, anyOne, any); // тут вивів бінарку як string
    console.log(`default: ${typeof byDefault}, first change - ${typeof anyOne}, second change - ${typeof any}`);
}

function dataConvert() {
    const num1 = 1000;
    const bool1 = true;
    // String()
    const numStr = String(num1);
    const boolStr = String(bool1);
    // toString()
    const numToString = num1.toString();
    const boolToString = bool1.toString();
    console.log("Declared:");
    console.log(`num: ${num1} (${typeof num1}), declared bool: ${bool1} (${typeof bool1})`);
    console.log("String():");
    console.log(`num: ${numStr} (${typeof numStr}), bool: ${boolStr} (${typeof boolStr})`);
    console.log("toString:");
    console.log(`num: ${numToString} (${typeof numToString}), bool: ${boolToString} (${typeof boolToString})`);
    console.log("-----------");

    const str2 = 'text';
    const bool2 = true;
    console.log("Declared:");
    console.log(`str2: ${str2} (${str2}), bool2: ${bool2} (${bool2})`);
    // Number()
    const str2Num = Number(str2);
    const bool2Num = Number(bool2);
    console.log("Number():");
    console.log(`str2: ${str2Num} (${str2Num}), bool2: ${bool2Num} (${bool2Num})`);
    
    // Конвертую string (який виглядає як float) з округленням до цілих (int) і у float:
    const stringInt = parseInt("497.11");
    const stringFloat = parseFloat("497.11");
    console.log("parseInt(), parseFloat():");
    console.log(`string (float) -> int: ${stringInt}, string (float) -> float: ${stringFloat}`);
    
    // Цікаві кейси
    console.log("Цікаві кейси:");
    const stringToNumber = Number("Text"); // конвертація коли string НЕ числовий рядок
    console.log(`Конвертація string -> number: ${stringToNumber}`);
    const sum = 5 + '10'; // При додаванні числа і рядка відбувається конкатинація.
    const realSum = 5 + Number("10");
    const bool = Boolean('false'); // Перетворення НЕпустого рядка рядка в boolean завжди дає true
    const boolean = Boolean(""); // Перетворення пустого рядка в boolean завжди дає false
    console.log(`sum: ${sum} (${typeof sum}) but ${realSum} (${realSum}); bool: ${bool} (${typeof bool}), ${boolean} (${typeof boolean})`);
}

function operations() {
    // Додавання
    let sumOne = 1 + 1;
    let sumTwo = "1" + "1";
    let sumThree = +(-1);
    let sumFour = +"1";
    let sumFive = "1" + 1;
    console.log(`sumOne = ${sumOne}, sumTwo = ${sumTwo}, sumThree = ${sumThree}, sumFour = ${sumFour}, sumFive = ${sumFive}`);

    // Віднімання
    let subOne = 3 - 2;
    let subTwo = "3" - "2";
    let subThree = "3" - 2;
    console.log(`subOne = ${subOne}, subTwo = ${subTwo}, subThree = ${subThree}`);

    // Множення
    let multiOne = 5 * 5;
    let multiTwo = "5" * "3";
    let multiThree = 5 * "3";
    console.log(`multiOne = ${multiOne}, multiTwo = ${multiTwo}, multiThree = ${multiThree}`);

    // Ділення
    let divOne = 6 / 4;
    let divTwo = "6" / "2";
    console.log(`divOne = ${divOne}, divTwo = ${divTwo}`);

    // Остача від ділення
    let mod1 = 5 % 2;
    let mod2 = 8 % 3;
    let mod3 = -5 % 2;
    console.log(`mod1 = ${mod1}, mod2 = ${mod2}, mod3 = ${mod3}`);

    // Піднесення до степеня
    let pow1 = 2 ** 2;
    let pow2 = 4 ** 2;
    let pow3 = 2 ** 6;

    // Присвоєння та модифікація
    let x = 5;
    console.log(`x = ${x}`);
    x += 5;
    console.log(`x = ${x}`);
    x -= 3;
    console.log(`x = ${x}`);
    x *= 2;
    console.log(`x = ${x}`);
    x /= 4;
    console.log(`x = ${x}`);
    x %= 4;
    console.log(`x = ${x}`);
    x **= 2;
    console.log(`x = ${x}`);

    // Інкремент та декремент
    let i = 2;
    console.log(`${i++} + 1 = ${i}, ${i} - 1 = ${--i}, ${i} + 1 = ${++i}, ${i} - 1 = ${--i}`);

    // Порівняння булєвих значень
    let a = true;
    let b = false;
    let c = "true";
    let boolC = Boolean(c);
    let d;
    let boolD = Boolean(d);
    console.log(`true && true = ${a && a}, true && false = ${a && b}, false && false = ${b && b}`);
    console.log(`true || true = ${a || a}, true || false = ${a || b}, false || false = ${b || b}`);
    console.log(`not ${a} = ${!a}, not ${b} = ${!b}, !!"" (${!!""}) ==  Boolean("") (${Boolean("")}), !!"text" (${!!"text"}) == Boolean("text") (${Boolean("text")})`);

    // Нульове злиття - повертає перше ненульове значення в виразі
    const userName = null;
    const defaultName = "Guest";
    const name = userName ?? defaultName;
    console.log(`Name is: ${name}`);
}

function conditions() {
    let grade = 85;

    // Перевіряємо по умові:
    if (grade >= 90) {
        console.log(`Ваша оцінка "5" (${grade})`);
    } else if (grade >= 80) {
        console.log(`Ваша оцінка "4" (${grade})`);
    } else if (grade >= 60) {
        console.log(`Ваша оцінка "3" (${grade})`);
    } else {
        console.log(`Ваша оцінка "2" (${grade})`);
    }

    // Перевіряємо по значенню:
    switch (true) {
        case grade >= 90: {
            console.log(`Ваша оцінка "5" (${grade})`);
            break;
        }
        case grade >= 80: {
            console.log(`Ваша оцінка "4" (${grade})`);
            break;
        }
        case grade >= 60: {
            console.log(`Ваша оцінка "3" (${grade})`);
            break;
        }
        default: {
            console.log(`Ваша оцінка "2" (${grade})`);
            break;
        }
    }

    // result = умова ? якщо true : якщо false
    let result = grade >= 60 ? "Ви склали іспит" : "Ви не склали іспит";
    console.log(result);
}


//vars();
//dataChange();
//dataTypes();
//dataConvert();
//operations();
conditions();
