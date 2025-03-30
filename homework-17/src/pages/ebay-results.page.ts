import type { ChainablePromiseElement, ChainablePromiseArray } from 'webdriverio';
import { $, $$, browser, expect } from '@wdio/globals';

/**
 * Page Object для сторінки результатів eBay
 */
export class EbayResultsPage {
    /**
     * Локатор результатів пошуку
     */
    public get resultsRiver(): ChainablePromiseElement {
        return $('div.srp-river-results');
    }

    /**
     * Список результатів пошуку
     */
    public get resultsList(): ChainablePromiseElement {
        return $('ul.srp-results.srp-list');
    }

    /**
     * Заголовок, де відображається кількість/текст пошукового запиту
     */
    public get resultsQueryText(): ChainablePromiseElement {
        return $('//*[@id="mainContent"]/div[2]/div/div[1]/div[1]/div[1]/h1/span[2]');
    }

    /**
     * Масив елементів списку результатів
     */
    public get items(): ChainablePromiseArray {
        return $$('//*[@id="srp-river-results"]/ul');
    }

    /**
     * Локатор фільтра "Buy It Now"
     */
    public get buyItNowFilter(): ChainablePromiseElement {
        return $('//*[@id="mainContent"]/div[2]/div/div[2]/div[2]/div[1]/div/ul/li[3]');
    }

    /**
     * Локатор чекбокса "New"
     */
    public get newConditionCheckbox(): ChainablePromiseElement {
        return $('.x-refine__multi-select-cbx*=New');
    }

    /**
     * Очікуємо завантаження сторінки зі списком товарів
     */
    public async waitForResults(): Promise<void> {
        await this.resultsRiver.waitForDisplayed({ timeout: 10000 });
        await this.resultsList.waitForDisplayed({ timeout: 10000 });
    }

    /**
     * Перевірити, що список товарів не пустий
     */
    public async checkAtLeastOneItemExists(): Promise<void> {
        const itemsLength = await this.items.length;
        if (itemsLength === 0) {
            throw new Error('No items found in results list.');
        }
    }

    /**
     * Перевірити наявність ключових елементів у першому товарі списку
     */
    public async checkFirstItemStructure(): Promise<void> {
        const allItems = await this.items;
        const firstItem = allItems[0];

        if (!firstItem) {
            throw new Error('No items found to check structure.');
        }

        await expect(firstItem.$('//*[@id="srp-river-results"]/ul/li[1]')).toBeExisting();
        await expect(firstItem.$('//*[@id="srp-river-results"]/ul/li[1]/div[1]')).toBeExisting();
        await expect(firstItem.$('//*[@id="srp-river-results"]/ul/li[1]/div[2]')).toBeExisting();
    }

    /**
     * Застосувати фільтр "Buy It Now"
     */
    public async filterBuyItNow(): Promise<void> {
        await this.buyItNowFilter.click();
        await browser.pause(2000); // пауза для оновлення результатів
    }

    /**
     * Застосувати фільтр "New"
     */
    public async filterNewCondition(): Promise<void> {
        await this.newConditionCheckbox.click();
        await browser.pause(2000); // пауза для оновлення результатів
    }

    /**
     * Отримати поточний URL
     */
    public async getCurrentUrl(): Promise<string> {
        return browser.getUrl();
    }
}
