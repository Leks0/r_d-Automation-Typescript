import { test, expect } from '@playwright/test';
import { AuthAPI } from '../../src/api/auth.api';
import { RegisterData } from '../../src/dto/register-data.dto';
import { LoginData } from '../../src/dto/login-data.dto';

const email = `testuser_${Date.now()}@test.com`;
const password = 'demo123';

test.describe('API: Auth', () => {
    test('Реєстрація користувача', async ({ request }) => {
        const auth = new AuthAPI(request);

        const registerData: RegisterData = {
            email,
            password,
            confirmPassword: password,
            group: '3',
            vat: false,
            general: true
        };

        const res = await auth.register(registerData);
        expect(res.status()).toBe(200);
    });

    test('Логін користувача', async ({ request }) => {
        const auth = new AuthAPI(request);

        const loginData: LoginData = { email, password };

        const res = await auth.login(loginData);
        expect(res.status()).toBe(200);

        const body = await res.json();
        expect(body.token).toBeDefined();
    });
});
