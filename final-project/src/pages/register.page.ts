import { Page, Response } from '@playwright/test';
import { RegisterForm } from '../elements/register.element';
import { RegisterData } from '../dto/register-data.dto';

export class RegisterPage {
    public constructor(private page: Page) {}

    public get el(): RegisterForm {
        return new RegisterForm(this.page);
    }

    public async goto(): Promise<void> {
        await this.page.goto('/auth/register');
    }

    public async fillForm(data: RegisterData): Promise<void> {
        await this.el.email.fill(data.email);
        await this.el.password.fill(data.password);
        await this.el.confirmPassword.fill(data.confirmPassword);
        await this.el.groupSelect.selectOption({ label: data.group });

        if (data.vat) await this.el.vatCheckbox.check();
        if (data.general) await this.el.generalCheckbox.check();
    }

    public async submitAndCheck(): Promise<Response> {
        const [response] = await Promise.all([
            this.page.waitForResponse((res) => res.request().method() === 'POST'),
            this.el.submitButton.click()
        ]);

        return response;
    }
}
export { RegisterData };

