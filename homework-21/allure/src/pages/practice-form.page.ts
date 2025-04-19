import { Page, Locator } from '@playwright/test';
import {
    Input,
    Button,
    RadioButton,
    Checkbox,
    DatePicker,
    AutocompleteInput,
    DropdownSelect
    //TableElement
} from '../elements/practice-form.element';

export class PracticeFormPage {
    // Інпути
    public firstName: Input;
    public lastName: Input;
    public email: Input;
    public mobile: Input;
    public subjects: AutocompleteInput;
    public date: DatePicker;

    // Дропдауни
    public state: DropdownSelect;
    public city: DropdownSelect;

    // Радіобатони
    public maleRadio: RadioButton;
    public femaleRadio: RadioButton;
    public otherRadio: RadioButton;

    // Чекбокси
    public sportsCheckbox: Checkbox;
    public readingCheckbox: Checkbox;
    public musicCheckbox: Checkbox;

    // Кнопка «Submit»
    public submitButton: Button;

    // Локатори модального вікна з таблицею результатів
    public get modalTitle(): Locator {
        return this.page.locator('#example-modal-sizes-title-lg');
    }

    public get studentNameCell(): Locator {
        return this.page.locator('//td[text()="Student Name"]/following-sibling::td');
    }

    public get studentEmailCell(): Locator {
        return this.page.locator('//td[text()="Student Email"]/following-sibling::td');
    }

    public get genderCell(): Locator {
        return this.page.locator('//td[text()="Gender"]/following-sibling::td');
    }

    public get mobileCell(): Locator {
        return this.page.locator('//td[text()="Mobile"]/following-sibling::td');
    }

    public get dateOfBirthCell(): Locator {
        return this.page.locator('//td[text()="Date of Birth"]/following-sibling::td');
    }

    public get subjectsCell(): Locator {
        return this.page.locator('//td[text()="Subjects"]/following-sibling::td');
    }

    public get hobbiesCell(): Locator {
        return this.page.locator('//td[text()="Hobbies"]/following-sibling::td');
    }

    public get pictureCell(): Locator {
        return this.page.locator('//td[text()="Picture"]/following-sibling::td');
    }

    public get addressCell(): Locator {
        return this.page.locator('//td[text()="Address"]/following-sibling::td');
    }

    public get stateCityCell(): Locator {
        return this.page.locator('//td[text()="State and City"]/following-sibling::td');
    }

    public constructor(private page: Page) {
        // Інпути
        this.firstName = new Input(page, '#firstName');
        this.lastName = new Input(page, '#lastName');
        this.email = new Input(page, '#userEmail');
        this.mobile = new Input(page, '#userNumber');
        this.subjects = new AutocompleteInput(page, '#subjectsInput');
        this.date = new DatePicker(page, '#dateOfBirthInput');

        // Дропдауни (React Select: State / City)
        this.state = new DropdownSelect(page, '#state', '.css-26l3qy-menu');
        this.city = new DropdownSelect(page, '#city', '.css-26l3qy-menu');

        // Радіобатони (Male, Female, Other)
        this.maleRadio = new RadioButton(page, '#gender-radio-1', 'label[for="gender-radio-1"]');
        this.femaleRadio = new RadioButton(page, '#gender-radio-2', 'label[for="gender-radio-2"]');
        this.otherRadio = new RadioButton(page, '#gender-radio-3', 'label[for="gender-radio-3"]');

        // Чекбокси (Sports, Reading, Music)
        this.sportsCheckbox = new Checkbox(page, '#hobbies-checkbox-1', 'label[for="hobbies-checkbox-1"]');
        this.readingCheckbox = new Checkbox(page, '#hobbies-checkbox-2', 'label[for="hobbies-checkbox-2"]');
        this.musicCheckbox = new Checkbox(page, '#hobbies-checkbox-3', 'label[for="hobbies-checkbox-3"]');

        // Кнопка «Submit»
        this.submitButton = new Button(page, '#submit');
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://demoqa.com/automation-practice-form');

        // Закрити рекламу
        await this.page.evaluate(() => {
            const fixedBan = document.getElementById('fixedban');
            if (fixedBan) fixedBan.remove();
        });
    }

    public async fillForm(data: {
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        gender: 'Male' | 'Female' | 'Other';
        hobbies: string[];
        birthDate: string;
        subjects: string[];
        state: string;
        city: string;
    }): Promise<void> {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.mobile.fill(data.mobile);
        await this.date.setDate(data.birthDate);

        switch (data.gender) {
            case 'Male':
                await this.maleRadio.select();
                break;
            case 'Female':
                await this.femaleRadio.select();
                break;
            case 'Other':
                await this.otherRadio.select();
                break;
        }

        for (const hobby of data.hobbies) {
            if (hobby === 'Sports') {
                await this.sportsCheckbox.check();
            }
            if (hobby === 'Reading') {
                await this.readingCheckbox.check();
            }
            if (hobby === 'Music') {
                await this.musicCheckbox.check();
            }
        }

        for (const subject of data.subjects) {
            await this.subjects.selectOption(subject);
        }

        await this.state.selectOption(data.state);
        await this.city.selectOption(data.city);
    }

    public async submitForm(): Promise<void> {
        await this.submitButton.click();
    }
}
