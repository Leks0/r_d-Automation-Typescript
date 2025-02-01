function switchCondition() {

    let grade = 85;

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
}

switchCondition();