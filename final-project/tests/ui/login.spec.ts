import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Сторінка логіну', () => {
  test('На сторінці логіну наявні всі UI елементи', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await expect(login.form.email).toBeVisible();
    await expect(login.form.password).toBeVisible();
    await expect(login.form.submitButton).toBeVisible();
  });

  test('Успішний логін', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    
    //тут також можна було зробити через інтерфейс, але даних не багато, вирішив інакше зробити.
    await login.form.email.fill('fydeag@mailto.plus');
    await login.form.password.fill('Qazxc1234');

    const response = await login.submitAndCheck();
    expect(response.status()).toBe(200);
  });

  test('НЕуспішний логін', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();

    await login.form.email.fill('test@email.com');
    await login.form.password.fill('password');

    const response = await login.submitAndCheck();

    await expect(login.form.errorLabel).toBeVisible();
    expect(response.status()).toBe(401);
  });
});
