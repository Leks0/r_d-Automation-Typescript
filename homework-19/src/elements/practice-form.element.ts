import { Locator, Page } from '@playwright/test';

/**
 * Універсальний елемент «Input»
**/
export class Input {
    private locator: Locator;

    public constructor(page: Page, selector: string) {
        this.locator = page.locator(selector);
    }

    public async fill(value: string): Promise<void> {
        await this.locator.fill(value);
    }

    public async type(value: string, delay = 0): Promise<void> {
        await this.locator.type(value, { delay });
    }
}

/**
 * Універсальний елемент «Button»
 */
export class Button {
    private locator: Locator;

    public constructor(page: Page, selector: string) {
        this.locator = page.locator(selector);
    }

    public async click(): Promise<void> {
        await this.locator.click();
    }

    public async isVisible(): Promise<boolean> {
        return this.locator.isVisible();
    }
}

/**
 * Універсальний елемент «RadioButton»
 */
export class RadioButton {
    private inputLocator: Locator;
    private labelLocator: Locator;

    public constructor(page: Page, inputSelector: string, labelSelector: string) {
        this.inputLocator = page.locator(inputSelector);
        this.labelLocator = page.locator(labelSelector);
    }

    public async select(): Promise<void> {
        await this.labelLocator.click();
    }

    public async isChecked(): Promise<boolean> {
        return this.inputLocator.isChecked();
    }
}

/**
 * Універсальний «Checkbox»
 */
export class Checkbox {
    private inputLocator: Locator;
    private labelLocator: Locator;

    public constructor(page: Page, inputSelector: string, labelSelector: string) {
        this.inputLocator = page.locator(inputSelector);
        this.labelLocator = page.locator(labelSelector);
    }

    public async check(): Promise<void> {
        await this.labelLocator.click();
    }

    public async isChecked(): Promise<boolean> {
        return this.inputLocator.isChecked();
    }
}

/**
 * Універсальний «DatePicker»
 */
export class DatePicker {
    private locator: Locator;
    private page: Page;

    public constructor(page: Page, selector: string) {
        this.page = page;
        this.locator = page.locator(selector);
    }

    public async setDate(dateString: string): Promise<void> {
        await this.locator.click();
        await this.locator.fill(dateString);
        await this.page.keyboard.press('Enter');
    }
}

/**
 * «AutocompleteInput»
 */
export class AutocompleteInput {
    private locator: Locator;
    private page: Page;

    public constructor(page: Page, selector: string) {
        this.page = page;
        this.locator = page.locator(selector);
    }

    public async selectOption(subject: string): Promise<void> {
        await this.locator.type(subject, { delay: 100 });
        await this.page.keyboard.press('Enter');
    }
}

/**
 * «DropdownSelect»
 */
export class DropdownSelect {
    private page: Page;
    private container: Locator;
    private menu: Locator;

    /**
     * @param containerSelector
     * @param menuSelector
     */
    public constructor(page: Page, containerSelector: string, menuSelector: string) {
        this.page = page;
        this.container = page.locator(containerSelector);
        this.menu = page.locator(menuSelector);
    }

    public async selectOption(optionText: string): Promise<void> {
        await this.container.click();
        await this.menu.waitFor({ state: 'visible' });

        const options = this.menu.locator('div[class*="-option"]');

        const count = await options.count();
        for (let i = 0; i < count; i++) {
            const text = (await options.nth(i).textContent())?.trim();
            if (text === optionText) {
                await options.nth(i).click();
                return;
            }
        }

        throw new Error(`Option "${optionText}" not found in dropdown`);
    }
}


export class TableElement {
    private root: Locator;
    public constructor(root: Locator) {
        this.root = root;
    }

    public async getMapping(): Promise<Record<string, string>> {
        const mapping: Record<string, string> = {};
        const rows = this.root.locator('tr');
        const count = await rows.count();
        for (let i = 0; i < count; i++) {
            const row = rows.nth(i);
            const key = (await row.locator('td').nth(0).textContent())?.trim() || '';
            const value = (await row.locator('td').nth(1).textContent())?.trim() || '';
            if (key) {
                mapping[key] = value;
            }
        }
        return mapping;
    }
}

export class Modal {
    public constructor(public root: Locator) {}

    public async isVisible(): Promise<boolean> {
        return this.root.isVisible();
    }
}
