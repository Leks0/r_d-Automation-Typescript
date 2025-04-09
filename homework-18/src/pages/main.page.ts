import { Locator, Page } from '@playwright/test';

export class MainPage {
    private readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://www.nerdfonts.com/cheat-sheet');
    }

    public get homeMenu(): Locator {
        return this.page.locator('xpath=//*[@id="main"]/nav/ul/li[2]');
    }

    public get homeLogo(): Locator {
        return this.page.locator('xpath=//*[@id="home"]/div[2]/h1/a/img');
    }

    public get searchButton(): Locator {
        return this.page.locator('xpath=//*[@id="home"]/div[2]/div[3]/div/h3[1]/a');
    }

    public get downloadButton(): Locator {
        return this.page.locator('xpath=//*[@id="home"]/div[2]/div[3]/div/h3[2]/a');
    }
}
