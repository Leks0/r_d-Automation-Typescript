import { ChainablePromiseElement } from 'webdriverio';
import { $, browser } from '@wdio/globals';

export class EbayHomePage {
    /**
     * Локатор поля пошуку
     */
    public get searchInput(): ChainablePromiseElement {
        return $('#gh-ac');
    }

    /**
     * Локатор кнопки "Search"
     **/
    public get searchButton(): ChainablePromiseElement {
        return $('//button[contains(.,"Search")]');
    }

    /**
     * Відкрити головну сторінку eBay
     **/
    public async open(): Promise<void> {
        await browser.url('https://www.ebay.com/');
    }

    /**
     * Ввести текст у поле пошуку й натиснути кнопку пошуку
     */
    public async searchFor(itemName: string): Promise<void> {
        await this.searchInput.setValue(itemName);
        await this.searchButton.click();
    }
}
