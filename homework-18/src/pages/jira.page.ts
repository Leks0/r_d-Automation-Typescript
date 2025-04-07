import { Locator, Page } from '@playwright/test';

export class JiraPage {
    public get userLogo(): Locator {
        return this.page.locator('nav button img');
    }

    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.goto('https://levkoniuk.atlassian.net/');
        await this.userLogo.waitFor();
    }
}
