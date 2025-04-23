import { Page } from "@playwright/test";
import { RegisterForm } from "../elements/register.element";

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  group: string;
  vat: boolean;
  general: boolean;
}

export class RegisterPage {
  readonly form: RegisterForm;

  constructor(private page: Page) {
    this.form = new RegisterForm(page);
  }

  async goto() {
    await this.page.goto("/auth/register");
  }

  async fillForm(data: RegisterData) {
    await this.form.email.fill(data.email);
    await this.form.password.fill(data.password);
    await this.form.confirmPassword.fill(data.confirmPassword);
    await this.form.groupSelect.selectOption({ label: data.group });

    if (data.vat) await this.form.vatCheckbox.check();
    if (data.general) await this.form.generalCheckbox.check();
  }

  async submitAndCheck() {
    const [response] = await Promise.all([
      this.page.waitForResponse((res) => res.request().method() === "POST"),
      this.form.submitButton.click(),
    ]);

    return response;
  }
}
