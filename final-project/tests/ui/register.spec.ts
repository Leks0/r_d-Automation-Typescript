import { test, expect } from '@playwright/test';
import { RegisterPage, RegisterData } from '../../src/pages/register.page';

const validData: RegisterData = {
    email: 'fydeag@mailto.plus',
    password: 'demo123',
    confirmPassword: 'demo123',
    group: '3',
    vat: true,
    general: true
};

const invalidData: RegisterData = {
    email: 'invalid@user.com',
    password: 'demo123',
    confirmPassword: 'demo123',
    group: '3',
    vat: false,
    general: false
};

test.describe('Сторінка реєстрації', () => {
    test('Всі UI елементі наявні на сторінці', async ({ page }) => {
        const register = new RegisterPage(page);
        await register.goto();

        await expect(register.el.email).toBeVisible();
        await expect(register.el.password).toBeVisible();
        await expect(register.el.confirmPassword).toBeVisible();
        await expect(register.el.groupSelect).toBeVisible();
        await expect(register.el.submitButton).toBeVisible();
    });

    test('Успішна реєстрація', async ({ page }) => {
        const register = new RegisterPage(page);
        await register.goto();

        await register.fillForm(validData);
        const response = await register.submitAndCheck();
        expect(response.status()).toBe(200);
    });

    test('НЕуспішна реєстрація', async ({ page }) => {
        const register = new RegisterPage(page);
        await register.goto();

        await register.fillForm(invalidData);
        const response = await register.submitAndCheck();
        expect(response.status()).toBe(500);
    });
});
