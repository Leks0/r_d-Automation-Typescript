import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { PracticeFormPage } from '../pages/practice-form.page.ts';

export class PracticeWorld extends World {
    private static _browser: Browser;
    public static globalContext = new Map<string, unknown>();

    public static get browser(): Browser {
        return this._browser;
    }
    public static setBrowser(browser: Browser): void {
        this._browser = browser;
    }

    public context!: BrowserContext;
    public page!: Page;
    public scenarioContext: Map<string, unknown>;

    private _practiceFormPage?: PracticeFormPage;
    public get practiceFormPage(): PracticeFormPage {
        if (!this._practiceFormPage) {
            this._practiceFormPage = new PracticeFormPage(this.page);
        }
        return this._practiceFormPage;
    }

    public constructor(opts: IWorldOptions) {
        super(opts);
        this.scenarioContext = new Map();
    }

    public get browser(): Browser {
        return PracticeWorld.browser;
    }
    public get globalContext(): Map<string, unknown> {
        return PracticeWorld.globalContext;
    }
}
