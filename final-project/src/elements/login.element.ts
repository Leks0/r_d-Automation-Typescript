import { Locator, Page } from '@playwright/test';

export class LoginForm {
    public constructor(private page: Page) {}

    public get email(): Locator {
        return this.page.locator('#email');
    }

    public get password(): Locator {
        return this.page.locator('#password');
    }

    public get submitButton(): Locator {
        return this.page.locator('button.btn-primary:has-text("Увійти")');
    }

    public get errorLabel(): Locator {
        return this.page.locator('label.form-label', { hasText: 'Помилка авторизації' });
    }
}
