import { BrowserContext, Locator, Page } from '@playwright/test';
import * as fs from 'fs';

export class AtlassianLoginPage {
    private signInSelector = 'sign-in';

    private get loginState(): Locator {
        return this.page.locator('//nav/following-sibling::div//button[@name="sign-in"] | //nav/following-sibling::div//div[@data-testid="main-container"]');
    }

    private get signInButton(): Locator {
        return this.page.locator('//nav/following-sibling::div//button[@name="sign-in"]');
    }

    private get emailInput(): Locator {
        return this.page.locator('#username');
    }

    private get continueButton(): Locator {
        return this.page.locator('#login-submit');
    }

    private get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    private get loginButton(): Locator {
        return this.page.locator('#login-submit');
    }

    public get userLogo(): Locator {
        return this.page.locator('//nav/following-sibling::div//div[@data-testid="main-container"]');
    }

    public get successLoginImg(): Locator {
        return this.page.locator('[data-testid="nav-profile-button--trigger"]');
    }

    public constructor(private page: Page, private context: BrowserContext) {}


    public async goto(): Promise<void> {
        await this.page.goto('https://atlassian.com/');
        await this.loginState.waitFor();
    }

    public async login(username: string, password: string): Promise<void> {
        await this.goto();
        await this.loginState.waitFor();
        if (await this.userLogo.isVisible()) {
            return;
        }

        await this.signInButton.click();
        await this.emailInput.fill(username);
        await this.continueButton.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await this.successLoginImg.waitFor();

        const browserState = await this.context.storageState();
        fs.writeFileSync('browser-context.json', JSON.stringify(browserState, null, 2));
    }
}
