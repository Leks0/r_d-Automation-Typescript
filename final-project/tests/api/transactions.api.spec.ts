import { test, expect, request } from '@playwright/test';

const credentials = {
  email: `testuser_${Date.now()}@test.com`,
  password: 'demo123',
};

test.describe('API: Transactions', () => {
  test('Додати прибуток', async ({ request }) => {
    const res = await request.post('/api/income', {
      //headers: { Authorization: `Bearer ${token}` }, // якщо б залогінився - був би токен
      data: {
        date: new Date().toISOString().split('T')[0],
        amount: 5000,
        currency: 'UAH',
        comment: 'зарплата'
      }
    });

    expect(res.status()).toBe(200);
  });

  test('Додати витрату', async ({ request }) => {
    const res = await request.post('/api/expense', {
      //headers: { Authorization: `Bearer ${token}` }, // якщо б залогінився - був би токен
      data: {
        date: new Date().toISOString().split('T')[0],
        amount: 2000,
        currency: 'UAH',
        comment: 'квіти',
        cash: true
      }
    });

    expect(res.status()).toBe(200);
  });
});
