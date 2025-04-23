import { Locator, Page } from '@playwright/test';

export class RegisterForm {
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly groupSelect: Locator;
  readonly vatCheckbox: Locator;
  readonly generalCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.email = page.locator('#formEmail');
    this.password = page.locator('#formPassword');
    this.confirmPassword = page.locator('#formConfirmPassword');
    this.groupSelect = page.locator('#formFopGroup');
    this.vatCheckbox = page.locator('#formFopVat');
    this.generalCheckbox = page.locator('#formFopGeneral');
    this.submitButton = page.locator('.btn.btn-primary'); // спрощений селектор
  }
}
