import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { PracticeWorld } from './worlds/practice-form.world.ts';

setDefaultTimeout(60 * 1000);
setWorldConstructor(PracticeWorld);
