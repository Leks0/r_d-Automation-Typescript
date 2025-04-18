import { BeforeAll } from '@cucumber/cucumber';
import { PracticeWorld } from '../worlds/practice-form.world.ts';

export function globalContextHook(): void {
    BeforeAll(() => {
        PracticeWorld.globalContext = new Map();
    });
}
