import { Locator, Page } from '@playwright/test';

export class RegisterForm {
    public constructor(private page: Page) {}

    public get email(): Locator {
        return this.page.locator('#formEmail');
    }

    public get password(): Locator {
        return this.page.locator('#formPassword');
    }

    public get confirmPassword(): Locator {
        return this.page.locator('#formConfirmPassword');
    }

    public get groupSelect(): Locator {
        return this.page.locator('#formFopGroup');
    }

    public get vatCheckbox(): Locator {
        return this.page.locator('#formFopVat');
    }

    public get generalCheckbox(): Locator {
        return this.page.locator('#formFopGeneral');
    }

    public get submitButton(): Locator {
        return this.page.locator('.btn.btn-primary');
    }
}
