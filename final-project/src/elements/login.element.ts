import { Locator, Page } from '@playwright/test';

export class LoginForm {
  readonly email: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly errorLabel: Locator;

  constructor(page: Page) {
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.submitButton = page.locator('button.btn-primary:has-text("Увійти")');
    this.errorLabel = page.locator('label.form-label', { hasText: 'Помилка авторизації' });
  }
}
