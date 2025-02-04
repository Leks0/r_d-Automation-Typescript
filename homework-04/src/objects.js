/**
 * Створити файл object.js, у якому зробити комплексний обʼєкт, що мав би мінімум 2 рівні ієрархії,
 * масив та метод, який виводитиме значення.
 */
// Створення комплексного обʼєкту
const school = {
    name: "Robot Dreams",
    shortName: "r_d",

    // Перший рівень ієрархії - напрямок навчання.
    direction: {
        name: "Тестування",
        // Другий рівень ієрархії - курс
        course: {
            name: "Автоматизація тестування JS/TS",
            students: ["Ярослав", "Андрій", "Ольга"]
        }
    },

    // Використання 'Map' для зберігання оцінок студентів
    grades: new Map([
        ["Ярослав", [91, 90, 92]],
        ["Андрій", [90, 97, 85]],
        ["Ольга", [80, 85, 83]]
    ]),

    // Використання 'Set' для зберігання унікальних технологій курсу
    technologies: new Set(["JavaScript", "TypeScript", "Playwright", "Cypress", "Docker"]),

    // Метод виведення інформації
    getInfo() {
        const info = {
            school: this.name,
            direction: this.direction.name,
            course: this.direction.course.name,
            studentCount: this.direction.course.students.length,
            availableTechnologies: Array.from(this.technologies)
        };

        // Використання Object.entries для виведення інформації
        Object.entries(info).forEach((Key, value) => {
            console.log(`${Key}: ${value}`);
        });

        // Виведення середніх оцінок студентів
        console.log("\nСередні оцінки студентів:");
        this.grades.forEach((grades, student) => {
            const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length; // сума оцінок / кількість оцінок
            console.log(`${student}: ${average.toFixed(2)}`);                              // округлити оцінку до 2 знаків після коми
        });
    }
};

console.log("\nІнформація про школу: ");
school.getInfo();

console.log("\nВластивості обʼєкта:");
console.log(`Ключі: ${Object.keys(school)}`);
console.log(`Значення: ${Object.values(school)}`);

console.log("\nВикористання опціонального ланцюжка");
console.log(school?.direction?.course?.name);
console.log(school?.direction?.course?.shortName);
