import { test, expect, request } from '@playwright/test';

const email = `testuser_${Date.now()}@test.com`;
const password = 'demo123';

test.describe('Auth API', () => {
  test('Реєстрація користувача', async ({ request }) => {
    const res = await request.post('/api/auth/register', {
      data: {
        email,
        password,
        confirmPassword: password,
        group: 3
      }
    });

    expect(res.status()).toBe(200);
  });

  test('Логін користувача', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { email, password }
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.token).toBeDefined();
  });
});
