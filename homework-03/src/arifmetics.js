function arifmetics() {
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
    console.log(`pow1 = ${pow1}, pow2 = ${pow2}, pow3 = ${pow3}`);
}

arifmetics();