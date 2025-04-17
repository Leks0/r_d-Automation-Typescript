import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect, Locator } from '@playwright/test';
import { PracticeWorld } from '../worlds/practice-form.world.ts';

const EXAMPLE_KEY = 'exampleKey';

Given('the user opens the Automation Practice Form page', async function (this: PracticeWorld) {
    await this.practiceFormPage.goto();
});

const arr = (s?: string): string[] => (s && s.trim() ? s.split(',').map((v) => v.trim()) : []);

When('the user fills in the Practice Form with:', async function (this: PracticeWorld, table: DataTable) {
    const hash = table.rowsHash() as Record<string, string>;

    type PracticeFormData = Parameters<PracticeWorld['practiceFormPage']['fillForm']>[0];

    const data: PracticeFormData = {
        firstName: hash.firstName,
        lastName: hash.lastName,
        email: hash.email,
        mobile: hash.mobile,
        gender: hash.gender as 'Male' | 'Female' | 'Other',
        hobbies: arr(hash.hobbies),
        birthDate: hash.birthDate,
        subjects: arr(hash.subjects),
        state: hash.state,
        city: hash.city
    };

    await this.practiceFormPage.fillForm(data);

    this.scenarioContext.set(EXAMPLE_KEY, 'This may be example of the test artifact in a scenario context');
});

When('the user submits the Practice Form', async function (this: PracticeWorld) {
    await this.practiceFormPage.submitForm();
});

Then('the user is able to see the submission modal', async function (this: PracticeWorld) {
    await expect(this.practiceFormPage.modalTitle).toHaveText('Thanks for submitting the form', { timeout: 15_000 });

    const exampleValue = this.scenarioContext.get(EXAMPLE_KEY);
    await expect(exampleValue).toBe('This may be example of the test artifact in a scenario context');
});

Then(
    'the user No {int} is able to see the submission modal with {string} table',
    async function (this: PracticeWorld, _userNo: number, _imageName: string, table: DataTable) {
        for (const { property, expected } of table.hashes()) {

            const key = property as keyof typeof this.practiceFormPage;

            const locator = this.practiceFormPage[key] as unknown as Locator;

            await expect(locator).toHaveText(expected, { timeout: 15_000 });
        }

        const exampleValue = this.scenarioContext.get(EXAMPLE_KEY);
        await expect(exampleValue).toBe('This may be example of the test artifact in a scenario context');
    }
);
