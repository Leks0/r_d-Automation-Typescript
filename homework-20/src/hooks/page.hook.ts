import { Before, After } from '@cucumber/cucumber';
import { PracticeWorld } from '../worlds/practice-form.world.ts';

export function pageHook(): void {
    Before(async function (this: PracticeWorld) {
        this.page = await this.context.newPage();

        /** збільшуємо ліміт на навігацію — повільні CI/мережі */
        this.page.setDefaultNavigationTimeout(60_000);

        /** додатково можна налаштувати defaultTimeout для locators */
        this.page.setDefaultTimeout(15_000);
    });

    After(async function (this: PracticeWorld) {
        await this.page.close();
    });
}
