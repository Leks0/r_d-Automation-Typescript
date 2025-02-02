function switchCondition() {

    const grade = 85;
    const roundedGrade = Math.floor(grade/10);
    console.log(roundedGrade);

    // Перевіряємо по значенню:
    switch (roundedGrade) {
        case 10:
        case 9: {
            console.log(`Ваша оцінка "5" (${grade})`);
            break;
        }
        case 8: {
            console.log(`Ваша оцінка "4" (${grade})`);
            break;
        }
        case 7:
        case 6: {
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
