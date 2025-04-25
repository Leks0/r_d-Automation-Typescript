import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';

test.describe('Сторінка логіну', () => {
    test('На сторінці логіну наявні всі UI елементи', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();

        await expect(login.el.email).toBeVisible();
        await expect(login.el.password).toBeVisible();
        await expect(login.el.submitButton).toBeVisible();
    });

    test('Успішний логін', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();

        //тут також можна було зробити через інтерфейс, але даних не багато, вирішив інакше зробити.
        await login.el.email.fill('fydeag@mailto.plus');
        await login.el.password.fill('Qazxc1234');

        const response = await login.submitAndCheck();
        expect(response.status()).toBe(200);
    });

    test('НЕуспішний логін', async ({ page }) => {
        const login = new LoginPage(page);
        await login.goto();

        await login.el.email.fill('test@email.com');
        await login.el.password.fill('password');

        const response = await login.submitAndCheck();

        await expect(login.el.errorLabel).toBeVisible();
        expect(response.status()).toBe(401);
    });
});
