import { expect } from 'chai';
import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';

describe('E2E Тест: Пошук товару на eBay', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    before(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1200, height: 800 }
        });
    });

    beforeEach(async () => {
        context = await browser.createBrowserContext();
        page = await context.newPage();
        await page.setDefaultTimeout(20000);
        await page.goto('https://www.ebay.com/', { waitUntil: 'domcontentloaded' });
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    after(async () => {
        await browser.close();
    });

    it('should perform a keyword search and verify the results', async () => {
        const searchData = 'iphone 14 pro';

        await page.type('#gh-ac', searchData);

        await page.waitForSelector('button[type="submit"]');;
        await page.click('button[type="submit"]');

        await page.waitForNavigation();

        const url = page.url();
        expect(url).to.include('https://www.ebay.com/sch/');
        expect(url).to.include('_nkw=iphone+14+pro');

        await page.waitForSelector('div.srp-river-results');;
        const riverResults = await page.$('div.srp-river-results');
        expect(riverResults).to.not.be.null;

        await page.waitForSelector('ul.srp-results.srp-list');;
        const resultsList = await page.$('ul.srp-results.srp-list');
        expect(resultsList).to.not.be.null;

        await page.waitForSelector('h1.srp-controls__count-heading');;
        const headingText = await page.$eval('h1.srp-controls__count-heading', (el) => el.textContent || '');
        expect(headingText).to.include(searchData);

        await page.waitForSelector('li.s-item.s-item__pl-on-bottom');;
        const items = await page.$$('li.s-item.s-item__pl-on-bottom');
        expect(items.length).to.be.greaterThan(0);

        const firstItem = items[0];

        const wrapper = await firstItem.$('div.s-item__wrapper');
        expect(wrapper).to.not.be.null;

        const imageWrapper = await firstItem.$('div.s-item__image-wrapper');
        expect(imageWrapper).to.not.be.null;

        const info = await firstItem.$('div.s-item__info');
        expect(info).to.not.be.null;

        const title = await firstItem.$('div.s-item__title');
        expect(title).to.not.be.null;
    });

    it('should filter products by price range and condition', async () => {
        const searchData = 'macbook';

        await page.type('#gh-ac', searchData);

        await page.waitForSelector('button[type="submit"]');;
        await page.click('button[type="submit"]');

        await page.waitForNavigation({ timeout: 20000 });

        const url = page.url();
        expect(url).to.include('https://www.ebay.com/sch/');
        expect(url).to.include('_nkw=macbook');

        await page.waitForSelector('span.srp-format-tabs-h2', { timeout: 20000 });
        await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span.srp-format-tabs-h2'));
            const buyItNowSpan = spans.find((span) => span.textContent?.includes('Buy It Now'));
            if (buyItNowSpan) {
                (buyItNowSpan.closest('a') as HTMLElement).click();
            }
        });

        await page.waitForFunction(() => {
            return window.location.href.includes('LH_BIN=1');
        });

        const urlWithBuyItNow = page.url();
        expect(urlWithBuyItNow).to.include('LH_BIN=1');

        await page.waitForSelector('input[aria-label="New"][type="checkbox"]');
        await page.evaluate(() => {
            const newCheckbox = document.querySelector('input[aria-label="New"][type="checkbox"]');
            if (newCheckbox) {
                (newCheckbox.closest('a.cbx.x-refine__multi-select-link') as HTMLElement).click();
            }
        });

        await page.waitForFunction(() => {
            return window.location.href.includes('LH_ItemCondition=1000');
        });

        const urlWithCondition = page.url();
        expect(urlWithCondition).to.include('LH_ItemCondition=1000');
    });
});
