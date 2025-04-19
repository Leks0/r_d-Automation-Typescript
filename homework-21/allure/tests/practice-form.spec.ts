import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../src/pages/practice-form.page';

test.describe('Automation Practice Form Tests', () => {
    test('повне заповнення форми з усіма полями', async ({ page }) => {
        const form = new PracticeFormPage(page);
        await form.goto();
        await form.fillForm({
            firstName: 'Olena',
            lastName: 'Petrenko',
            email: 'o.petrenko@mailto.plus',
            mobile: '0679862121',
            gender: 'Female',
            hobbies: ['Music', 'Reading'],
            birthDate: '15 Mar 1990',
            subjects: ['Maths', 'Physics'],
            state: 'Haryana',
            city: 'Panipat'
        });
        await form.submitForm();

        await expect(form.modalTitle).toHaveText('Thanks for submitting the form');

        await expect(form.studentNameCell).toHaveText('Olena Petrenko');
        await expect(form.studentEmailCell).toHaveText('o.petrenko@mailto.plus');
        await expect(form.genderCell).toHaveText('Female');
        await expect(form.mobileCell).toHaveText('0679862121');
        await expect(form.dateOfBirthCell).toContainText('15');
        await expect(form.subjectsCell).toHaveText('Maths, Physics');
        await expect(form.hobbiesCell).toHaveText('Music, Reading');
        await expect(form.pictureCell).toHaveText('');
        await expect(form.addressCell).toHaveText('');
        await expect(form.stateCityCell).toHaveText('Haryana Panipat');
    });

    test('заповнення форми з мінімальними даними', async ({ page }) => {
        const form = new PracticeFormPage(page);
        await form.goto();
        await form.fillForm({
            firstName: 'Olha',
            lastName: 'Ivanova',
            email: 'o.ivanova@mailto.plus',
            mobile: '0663987650',
            gender: 'Female',
            hobbies: [],
            birthDate: '01 Jan 2000',
            subjects: [],
            state: 'NCR',
            city: 'Delhi'
        });
        await form.submitForm();

        await expect(form.modalTitle).toHaveText('Thanks for submitting the form');

        // Замість mapping, перевіряємо напряму:
        await expect(form.studentNameCell).toHaveText('Olha Ivanova');
        await expect(form.studentEmailCell).toHaveText('o.ivanova@mailto.plus');
        await expect(form.genderCell).toHaveText('Female');
        await expect(form.mobileCell).toHaveText('0663987650');
        await expect(form.dateOfBirthCell).toContainText('01');
        await expect(form.subjectsCell).toHaveText('');
        await expect(form.hobbiesCell).toHaveText('');
        await expect(form.pictureCell).toHaveText('');
        await expect(form.addressCell).toHaveText('');
        await expect(form.stateCityCell).toHaveText('NCR Delhi');
    });

    test('заповнення форми з альтернативними даними', async ({ page }) => {
        const form = new PracticeFormPage(page);
        await form.goto();
        await form.fillForm({
            firstName: 'Alex',
            lastName: 'Ivanov',
            email: 'a.ivanov@mailto.plus',
            mobile: '0990675454',
            gender: 'Male',
            hobbies: ['Sports'],
            birthDate: '05 May 1985',
            subjects: ['Chemistry'],
            state: 'Uttar Pradesh',
            city: 'Agra'
        });
        await form.submitForm();

        await expect(form.modalTitle).toHaveText('Thanks for submitting the form');

        await expect(form.studentNameCell).toHaveText('Alex Ivanov');
        await expect(form.studentEmailCell).toHaveText('a.ivanov@mailto.plus');
        await expect(form.genderCell).toHaveText('Male');
        await expect(form.mobileCell).toHaveText('0990675454');
        await expect(form.dateOfBirthCell).toContainText('05');
        await expect(form.subjectsCell).toHaveText('Chemistry');
        await expect(form.hobbiesCell).toHaveText('Sports');
        await expect(form.pictureCell).toHaveText('');
        await expect(form.addressCell).toHaveText('');
        await expect(form.stateCityCell).toHaveText('Uttar Pradesh Agra');
    });
});
