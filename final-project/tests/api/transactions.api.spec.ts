import { test, expect } from '@playwright/test';
import { TransactionsAPI } from '../../src/api/transactions.api';

test.describe('API: Transactions', () => {
    test('Додати прибуток', async ({ request }) => {
        const api = new TransactionsAPI(request);
        const res = await api.addIncome({
            date: new Date().toISOString().split('T')[0],
            amount: 5000,
            currency: 'UAH',
            comment: 'зарплата'
        });
        expect(res.status()).toBe(200);
    });

    test('Додати витрату', async ({ request }) => {
        const api = new TransactionsAPI(request);
        const res = await api.addExpense({
            date: new Date().toISOString().split('T')[0],
            amount: 2000,
            currency: 'UAH',
            comment: 'квіти',
            cash: true
        });
        expect(res.status()).toBe(200);
    });
});
