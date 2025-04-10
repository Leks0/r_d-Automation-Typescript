import { Locator, Page } from '@playwright/test';

export class CheetSheet {
    private readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://www.nerdfonts.com/cheat-sheet');
    }

    public get mainMenu(): Locator {
        return this.page.locator('xpath=//*[@id="main"]/nav/ul');
    }

    public get logo(): Locator {
        return this.page.locator('xpath=//*[@id="icon-cheat-sheet"]/div[1]/span/i[2]');
    }

    public get searchField(): Locator {
        return this.page.locator('xpath=//*[@id="glyphSearch"]');
    }

    public get menuItems(): Locator {
        return this.page.locator('xpath=//*[@id="main"]/nav/ul/li');
    }
}
