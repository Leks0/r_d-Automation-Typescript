import { expect } from 'chai';
import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { RZTKPage } from '../src/pom/rozetka.page';

describe('Puppeteer rozetka tests', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let rztkPage: RZTKPage;

    before(async () => {
        browser = await puppeteer.launch({headless: false, defaultViewport: {width: 1200, height: 800}});
    });

    beforeEach(async () => {
        context = await browser.createBrowserContext();
        page = await context.newPage();
        rztkPage = new RZTKPage(page);
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    after(async () => {
        await browser.close();
    });

    it('should find RZTK goods', async () => {
        await page.goto('https://rozetka.com.ua/', { waitUntil: 'domcontentloaded' });
        const inputSelector = '[name="search"]';
        await page.waitForSelector(inputSelector);
        await page.type(inputSelector, 'RZTK');
        await page.locator('::-p-xpath(//button[text()=" Знайти "])').click();

        const goodsSelector = 'rz-button-product-page .goods-tile__title';
        await page.waitForSelector(goodsSelector);
        const goods = await page.$$(goodsSelector);

        //const goodsText: string[] = [];
        for (const good of goods) {
            const text = await good.evaluate((el) => el.textContent);
            //goodsText.push(text);
            expect(text).to.include('RZTK');
        }
    });

    it('should find RZTK goods with POM', async () => {
        await rztkPage.goTo();
        await rztkPage.fillSearchInput('RZTK');
        await rztkPage.clickSearchButton();
        await rztkPage.waitForSearchResults();
        const goodsText = await rztkPage.getSearchResults();

        goodsText.forEach((text) => {
            expect(text).to.include('RZTK');
        });
    });
});
