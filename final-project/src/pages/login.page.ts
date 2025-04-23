import { Page } from '@playwright/test';
import { LoginForm } from '../elements/login.element';

export class LoginPage {
  readonly form: LoginForm;

  constructor(private page: Page) {
    this.form = new LoginForm(page);
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async submitAndCheck() {
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.request().method() === "POST"),
      this.form.submitButton.click(),
    ]);

    return response;
  }
}