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
        return $('//*[@id="mainContent"]//h1/span[2]');
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
        return $('//li[contains(@class, "fake-tabs__item") and contains(., "Buy It Now")]');
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
        const firstItem = await $('//*[@id="srp-river-results"]/ul/li[1]');

        if (!(await firstItem.isExisting())) {
            throw new Error('No first item found in results.');
        }

        // Вкладені елементи шукаємо відносними селекторами (починаючи з .//)
        await expect(firstItem.$('.//div[contains(@class,"s-item__wrapper")]')).toBeExisting();
        await expect(firstItem.$('.//div[contains(@class,"s-item__image-wrapper")]')).toBeExisting();
        await expect(firstItem.$('.//div[contains(@class,"s-item__info")]')).toBeExisting();
        await expect(firstItem.$('.//div[contains(@class,"s-item__title")]')).toBeExisting();
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

    /**
     * Перевірити, що фільтр "Buy it now" застосовано
     */
    public async isBuyItNowActive(): Promise<boolean> {
        const classAttribute = await this.buyItNowFilter.getAttribute('class');
        return classAttribute.includes('fake-tabs__item--current');
    }

    /**
     * Геттер для чекбокса "New"
     */
    public get checkboxInput(): ChainablePromiseElement {
        return this.newConditionCheckbox.$('input');
    }
}
