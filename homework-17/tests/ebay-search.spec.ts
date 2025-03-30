import { describe, it, beforeEach } from 'mocha';
import { expect } from 'expect-webdriverio';
import { EbayHomePage } from '../src/pages/ebay-home.page';
import { EbayResultsPage } from '../src/pages/ebay-results.page';

describe('E2E Тест: Пошук товару на eBay', () => {
    const homePage = new EbayHomePage();
    const resultsPage = new EbayResultsPage();

    beforeEach(async () => {
        await homePage.open();
    });

    it('should perform a keyword search and verify the results', async () => {
        const searchData = 'iphone 14 pro';

        await homePage.searchFor(searchData);

        const currentUrl = await resultsPage.getCurrentUrl();
        expect(currentUrl).toContain('ebay.com/sch/');
        expect(currentUrl).toContain('_nkw=iphone+14+pro');

        await resultsPage.waitForResults();
        await resultsPage.checkAtLeastOneItemExists();
        await expect(resultsPage.resultsQueryText).toBeDisplayed();

        const headingText = await resultsPage.resultsQueryText.getText();
        expect(headingText.toLowerCase()).toContain(searchData.toLowerCase());

        await resultsPage.checkFirstItemStructure();
    });

    it('should filter products: "Buy it now" + "New"', async () => {
        const searchData = 'macbook';

        await homePage.searchFor(searchData);

        let currentUrl = await resultsPage.getCurrentUrl();
        expect(currentUrl).toContain('ebay.com/sch/');
        expect(currentUrl).toContain('_nkw=macbook');

        await resultsPage.filterBuyItNow();
        currentUrl = await resultsPage.getCurrentUrl();
        expect(currentUrl).toContain('LH_BIN=1');

        await resultsPage.filterNewCondition();
        currentUrl = await resultsPage.getCurrentUrl();
        expect(currentUrl).toContain('LH_ItemCondition=1000');
    });
});
