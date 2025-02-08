/**
 * Створити файл getter-setters.js куди додати довільний, щонайменше 2-рівневий, обʼєкт, у якому будуть як гетери, так і сетери.
 * Також можна впровадити функцію обʼєкта, що здійснюватиме якусь маніпуляцію з полями обʼєкта й повертатиме результат обробки.
 */

// Створення обʼєкту з гетерами та сетерами
const school = {
    _name: "Robot Dreams",
    _shortName: "r_d",
    _location: "Київ",
    _programs: [
        {
            _name: "JS/TS Automation",
            _students: 0,
            _technologies: ["JavaScript", "TypeScript", "Docker"],

            get name() {
                return this._name;
            },

            set name(newName) {
                if (typeof newName === "string" && newName.length > 0) {
                    this._name = newName;
                } else {
                    console.log("Помилка. Назва курсу має бути НЕпустим рядком!");
                }
            },

            get studentsCount() {
                return this._students;
            },

            set studentsCount(count) {
                if (typeof count === 'number' && count >= 0) {
                    this._students = count;
                } else {
                    console.log("Помилка: Кількість студентів повинна бути невідʼємним числом!");
                }
            },

            get technologies() {
                return this._technologies;
            },

            set technologies(newTechnologies) {
                // Перевірити, чи передано масив
                if (!Array.isArray(newTechnologies)) {
                    console.log("Помилка: Очікується масив технологій");
                    return;
                }
                // Перевірити кожен елемент масиву
                if (newTechnologies.some(tech => typeof tech !== "string" || tech.length === 0)) {
                    console.log("Помилка: Назви технологій мають бути непустими рядками");
                    return;
                }
                // Перевірити на дублікати
                if (new Set(newTechnologies).size !== newTechnologies.length) {
                    console.log("Помилка: Виявлено дублікати департаментів");
                    return;
                }
                // Оновити масив, якщо всі перевірки пройдено
                this._technologies = [...newTechnologies];
            }
        },
        {
            _name: "API Testing",
            _students: 0,
            _technologies: ["Postman", "Rest API", "JavaScript"],

            get name() {
                return this._name;
            },

            set name(newName) {
                if (typeof newName === "string" && newName.length > 0) {
                    this._name = newName;
                } else {
                    console.log("Помилка. Назва курсу має бути НЕпустим рядком!");
                }
            },

            get studentsCount() {
                return this._students;
            },

            set studentsCount(count) {
                if (typeof count === 'number' && count >= 0) {
                    this._students = count;
                } else {
                    console.log("Помилка: Кількість студентів повинна бути невідʼємним числом!");
                }
            },

            get technologies() {
                return this._technologies;
            },

            set technologies(newTechnologies) {
                // Перевірити, чи передано масив
                if (!Array.isArray(newTechnologies)) {
                    console.log("Помилка: Очікується масив технологій");
                    return;
                }
                // Перевірити кожен елемент масиву
                if (newTechnologies.some(tech => typeof tech !== "string" || tech.length === 0)) {
                    console.log("Помилка: Назви технологій мають бути непустими рядками");
                    return;
                }
                // Перевірити на дублікати
                if (new Set(newTechnologies).size !== newTechnologies.length) {
                    console.log("Помилка: Виявлено дублікати департаментів");
                    return;
                }
                // Оновити масив, якщо всі перевірки пройдено
                this._technologies = [...newTechnologies];
            }
        }
    ],

    // Гетер для назви школи
    get name() {
        return this._name;
    },
    // Сетер для назви школи
    set name(newName) {
        if (typeof newName === "string" && newName.length > 0) {
            this._name = newName;
        } else {
            console.log("Помилка: Назва школи має бути непустою");
        }
    },

    // Гетер для отримання всіх програм
    get programs() {
        return this._programs;
    },
    getSchoolInfo() {
        return {
            schoolName: this._name,
            location: this._location,
            programs: this._programs.map(program => {
                return {
                    name: program.name,
                    students: program._students,
                    technologies: JSON.stringify(program._technologies)
                };
            })
        };
    },
    calculateTotalStudent() {
        return this._programs.reduce((total, program) => total + program._students, 0);
    },
    getProgramByName(name) {
        return this._programs.find(program => program._name === name);
    },
    getAllTechnologies() {
        return this._programs.reduce((technologies, program) => {
            return [...technologies, ...program.technologies];
        }, []);
    }
};

console.log("1. Загальна інформація про школу");
console.log(school.getSchoolInfo());

// Робота з програмами через сетер
const infProgram = school.getProgramByName("JS/TS Automation");
console.log(`Програма: ${infProgram}`);

console.log("\n2. Додавання нової технології");
infProgram.technologies = [...infProgram.technologies, "Cypress"];
console.log(`В курсі "${infProgram.name} оновлено технології: ${infProgram.technologies}"`);

console.log("\n3. Видалення технології");
infProgram.technologies = infProgram.technologies.filter(tech => tech !== "Cypress");
console.log(`В курсі "${infProgram.name} оновлено технології: ${infProgram.technologies}"`);

console.log("\n4. Зміна назви технології");
infProgram.technologies = infProgram.technologies.map(tech =>
    tech === "Docker" ? "Cypress" : tech
);
console.log(`В курсі "${infProgram.name} оновлено технології: ${infProgram.technologies}"`);

console.log("\n5. Тестування валідації");
infProgram.technologies = "Неправильний тип даних";
infProgram.technologies = ["", "Playwright"];
infProgram.technologies = ["Playwright", "Playwright"];
