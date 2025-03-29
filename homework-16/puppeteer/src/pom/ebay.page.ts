import { Page } from 'puppeteer';

export class EbayPage {
    // Selectors
    private readonly searchInputSelector = '#gh-ac';
    private readonly searchButtonSelector = 'button[type="submit"]';
    private readonly searchResultsContainerSelector = 'div.srp-river-results';
    private readonly searchResultsListSelector = 'ul.srp-results.srp-list';
    private readonly searchResultsHeadingSelector = 'h1.srp-controls__count-heading';
    private readonly searchResultItemsSelector = 'li.s-item.s-item__pl-on-bottom';
    private readonly buyItNowFilterSelector = 'span:text("Buy It Now")';
    private readonly newConditionFilterSelector = '.x-refine__multi-select-cbx:has-text("New")';
    private readonly firstItemSelector = 'li.s-item.s-item__pl-on-bottom:first-child';

    public constructor(private page: Page) {}

    /**
     * Navigate to eBay homepage
     */
    public async goTo(): Promise<void> {
        await this.page.goto('https://www.ebay.com/');
        await this.page.waitForSelector(this.searchInputSelector);
    }

    /**
     * Fill search input with provided value
     */
    public async fillSearchInput(value: string): Promise<void> {
        const searchInput = await this.page.$(this.searchInputSelector);
        if (searchInput) {
            await searchInput.type(value);
        }
    }

    /**
     * Click search button
     */
    public async clickSearchButton(): Promise<void> {
        const searchButton = await this.page.$(this.searchButtonSelector);
        if (searchButton) {
            await searchButton.click();
            await this.page.waitForNavigation();
        }
    }

    /**
     * Search for an item
     */
    public async searchFor(searchText: string): Promise<void> {
        await this.fillSearchInput(searchText);
        await this.clickSearchButton();
    }

    /**
     * Wait for search results to load
     */
    public async waitForSearchResults(): Promise<void> {
        await this.page.waitForSelector(this.searchResultsContainerSelector);
        await this.page.waitForSelector(this.searchResultsListSelector);
    }

    /**
     * Check if URL contains expected parameters
     */
    public async verifySearchUrl(expectedText: string): Promise<boolean> {
        const currentUrl = this.page.url();
        return currentUrl.includes('https://www.ebay.com/sch/') && currentUrl.includes(`_nkw=${expectedText.replace(/ /g, '+')}`);
    }

    /**
     * Get search heading text
     */
    public async getSearchHeadingText(): Promise<string> {
        const heading = await this.page.$(this.searchResultsHeadingSelector);
        if (heading) {
            return await heading.evaluate((el) => el.textContent || '');
        }
        return '';
    }

    /**
     * Get number of search results
     */
    public async getSearchResultsCount(): Promise<number> {
        const items = await this.page.$$(this.searchResultItemsSelector);
        return items.length;
    }

    /**
     * Verify first item structure
     */
    public async verifyFirstItemStructure(): Promise<boolean> {
        const wrapper = await this.page.$(`${this.firstItemSelector} div.s-item__wrapper`);
        const imageWrapper = await this.page.$(`${this.firstItemSelector} div.s-item__image-wrapper`);
        const info = await this.page.$(`${this.firstItemSelector} div.s-item__info`);
        const title = await this.page.$(`${this.firstItemSelector} div.s-item__title`);

        return Boolean(wrapper && imageWrapper && info && title);
    }

    /**
     * Click Buy It Now filter
     */
    public async clickBuyItNowFilter(): Promise<void> {
        await this.page.waitForSelector(this.buyItNowFilterSelector);
        const buyItNowFilter = await this.page.$(this.buyItNowFilterSelector);
        if (buyItNowFilter) {
            await buyItNowFilter.click();
            await this.page.waitForFunction(() => {
                return window.location.href.includes('LH_BIN=1');
            });
        }
    }

    /**
     * Click New condition filter
     */
    public async clickNewConditionFilter(): Promise<void> {
        await this.page.waitForSelector(this.newConditionFilterSelector);
        await this.page.evaluate((selector) => {
            const newCheckbox = document.querySelector(selector);
            if (newCheckbox) (newCheckbox as HTMLElement).click();
        }, this.newConditionFilterSelector);

        await this.page.waitForFunction(() => {
            return window.location.href.includes('LH_ItemCondition=1000');
        });
    }

    /**
     * Check if URL contains specific filter
     */
    public async urlContainsFilter(filter: string): Promise<boolean> {
        const currentUrl = this.page.url();
        return currentUrl.includes(filter);
    }
}
