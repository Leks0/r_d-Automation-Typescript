import { Before, After } from '@cucumber/cucumber';
import { PracticeWorld } from '../worlds/practice-form.world.ts';
import * as fs from 'fs';
import { BrowserContextOptions } from 'playwright';

export function browserContextHook(): void {
    Before(async function (this: PracticeWorld, { pickle }) {
        const feature = pickle.uri.replace('.feature', '').replace(/[:\\]/g, '-');
        const scenario = pickle.name.replace(/[:/\\]/g, '-');
        const videoDir = `videos/${feature}/${scenario}`;

        const options: BrowserContextOptions = {
            recordVideo: { dir: videoDir },
            timezoneId: 'Europe/Tallinn',
            viewport: { width: 1280, height: 1024 }
        };

        if (fs.existsSync('storageState.json')) {
            options.storageState = 'storageState.json';
        }

        this.context = await PracticeWorld.browser.newContext(options);
    });

    After(async function (this: PracticeWorld) {
        await this.context.close();
    });
}
