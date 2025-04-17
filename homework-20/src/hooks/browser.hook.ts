import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { PracticeWorld } from '../worlds/practice-form.world.ts';

export function browserHook(): void {
    BeforeAll(async () => {
        PracticeWorld.setBrowser(await chromium.launch({ headless: false }));
    });

    AfterAll(async () => {
        await PracticeWorld.browser.close();
    });
}
