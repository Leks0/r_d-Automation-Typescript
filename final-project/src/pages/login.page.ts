import { Page, Response } from '@playwright/test';
import { LoginForm } from '../elements/login.element';

export class LoginPage {
    public constructor(private page: Page) {}

    public get el(): LoginForm {
        return new LoginForm(this.page);
    }

    public async goto(): Promise<void> {
        await this.page.goto('/auth/login');
    }

    public async submitAndCheck(): Promise<Response> {
        const [response] = await Promise.all([
            this.page.waitForResponse((res) => res.request().method() === 'POST'),
            this.el.submitButton.click()
        ]);

        return response;
    }
}
