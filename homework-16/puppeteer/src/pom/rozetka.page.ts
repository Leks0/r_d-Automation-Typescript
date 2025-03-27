import { Locator, Page } from 'puppeteer';

export class RZTKPage {
    private get searchInput(): Locator<Element> {
        return this.page.locator('[name="search"]');
    }

    private get searchButton(): Locator<Element> {
        return this.page.locator('::-p-xpath(//button[text()=" Знайти "])');
    }

    private get goodsElements(): Locator<Element> {
        return this.page.locator(this.goodsSelector);
    }

    private goodsSelector = 'rz-button-product-page .goods-tile__title';

    public constructor(private page: Page) {};

    public async goTo(): Promise<void> {
        await this.page.goto('https://rozetka.com.ua/');
        await this.searchInput.wait();
    }

    public async fillSearchInput(value: string): Promise<void> {
        await this.searchInput.fill(value);
    }

    public async clickSearchButton(): Promise<void> {
        await this.searchButton.click();
    }

    public async waitForSearchResults(): Promise<void> {
        await this.goodsElements.wait();
    }

    public async getSearchResults(): Promise<string[]> {
        const goods = await this.page.$$(this.goodsSelector);
        const goodsText: string[] = [];
        for (const good of goods) {
            const text = (await good.evaluate((el) => el.textContent)) as string;
            goodsText.push(text);
        }

        return goodsText;
    }
}
