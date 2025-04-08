import { Page } from '@playwright/test';

export class MainPage {
    private readonly page: Page;
    private readonly homeMenuSelector = 'xpath=//*[@id="main"]/nav/ul/li[2]';
    private readonly homeLogoSelector = 'xpath=//*[@id="home"]/div[2]/h1/a/img';
    private readonly searchButtonSelector = 'xpath=//*[@id="home"]/div[2]/div[3]/div/h3[1]/a';
    private readonly downloadButtonSelector = 'xpath=//*[@id="home"]/div[2]/div[3]/div/h3[2]/a';

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://www.nerdfonts.com/cheat-sheet');
    }

    public async clickHomeMenu(): Promise<void> {
        await this.page.click(this.homeMenuSelector);
        await this.page.waitForLoadState('networkidle');
    }

    public async isHomeLogoVisible(): Promise<boolean> {
        return this.page.isVisible(this.homeLogoSelector);
    }

    public async getSearchButtonText(): Promise<string> {
        return (await this.page.innerText(this.searchButtonSelector)).trim();
    }

    public async isSearchButtonVisible(): Promise<boolean> {
        return this.page.isVisible(this.searchButtonSelector);
    }

    public async getDownloadButtonText(): Promise<string> {
        return (await this.page.innerText(this.downloadButtonSelector)).trim();
    }

    public async isDownloadButtonVisible(): Promise<boolean> {
        return this.page.isVisible(this.downloadButtonSelector);
    }
}
