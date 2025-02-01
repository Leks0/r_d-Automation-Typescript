function ifElse() {
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
}

ifElse();