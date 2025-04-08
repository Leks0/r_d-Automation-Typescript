import { Page } from '@playwright/test';

export class CheetSheet {
    private readonly page: Page;
    private readonly headerSelector = 'xpath=//*[@id="main"]/nav/ul';
    private readonly logoSelector = 'xpath=//*[@id="icon-cheat-sheet"]/div[1]/span/i[2]';
    private readonly searchFieldSelector = 'xpath=//*[@id="glyphSearch"]';
    private readonly menuItemsSelector = 'xpath=//*[@id="main"]/nav/ul/li[contains(@class,"hide-on-smaller-view")]';

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://www.nerdfonts.com/cheat-sheet');
    }

    public async isMainMenuVisible(): Promise<boolean> {
        return this.page.isVisible(this.headerSelector);
    }

    public async isLogoVisible(): Promise<boolean> {
        return this.page.isVisible(this.logoSelector);
    }

    public async isSearchFieldVisible(): Promise<boolean> {
        return this.page.isVisible(this.searchFieldSelector);
    }

    public async getMenuItemTitles(): Promise<string[]> {
        const rawTitles = await this.page.locator(this.menuItemsSelector).allInnerTexts();
        return rawTitles.map((title) => title.trim());
    }
}
