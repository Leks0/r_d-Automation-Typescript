function arifmetics() {
    // Додавання
    const sumOne = 1 + 1;
    const sumTwo = "1" + "1";
    const sumThree = +(-1);
    const sumFour = +"1";
    const sumFive = "1" + 1;
    console.log(`sumOne = ${sumOne}, sumTwo = ${sumTwo}, sumThree = ${sumThree}, sumFour = ${sumFour}, sumFive = ${sumFive}`);

    // Віднімання
    const subOne = 3 - 2;
    const subTwo = "3" - "2";
    const subThree = "3" - 2;
    console.log(`subOne = ${subOne}, subTwo = ${subTwo}, subThree = ${subThree}`);

    // Множення
    const multiOne = 5 * 5;
    const multiTwo = "5" * "3";
    const multiThree = 5 * "3";
    console.log(`multiOne = ${multiOne}, multiTwo = ${multiTwo}, multiThree = ${multiThree}`);

    // Ділення
    const divOne = 6 / 4;
    const divTwo = "6" / "2";
    console.log(`divOne = ${divOne}, divTwo = ${divTwo}`);

    // Остача від ділення
    const mod1 = 5 % 2;
    const mod2 = 8 % 3;
    const mod3 = -5 % 2;
    console.log(`mod1 = ${mod1}, mod2 = ${mod2}, mod3 = ${mod3}`);

    // Піднесення до степеня
    const pow1 = 2 ** 2;
    const pow2 = 4 ** 2;
    const pow3 = 2 ** 6;
    console.log(`pow1 = ${pow1}, pow2 = ${pow2}, pow3 = ${pow3}`);
}

arifmetics();
