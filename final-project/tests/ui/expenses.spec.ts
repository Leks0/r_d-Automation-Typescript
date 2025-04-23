import { test, expect } from '@playwright/test';
import { ExpensesPage } from '../../src/pages/expenses.page';

test.describe('Сторінка Витрати', () => {
  test('Наявні всі UI елементи сторінки', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();

    await expect(expenses.el.alert).toBeVisible();
    await expect(expenses.el.table).toBeVisible();
    await expect(expenses.el.addExpenseBtn).toBeVisible();
  });

  test('Попередження закривається', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();
    await expenses.closeAlertIfVisible();
    await expect(expenses.el.alert).not.toBeVisible();
  });

  test('Вікно "Додати витрати" відкривається', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();
    await expenses.openModal();
    await expect(expenses.el.modal).toBeVisible();
  });

  test('Вікно "Додати витрати" закривається', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();
    await expenses.openModal();
    await expenses.closeModal();
    await expect(expenses.el.modal).not.toBeVisible();
  });

  test('Форма у вікні зʼявляється і зникає після закриття', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();

    await expenses.openModal();

    await expect(expenses.el.modalDate).toBeVisible();
    await expect(expenses.el.modalAmount).toBeVisible();
    await expect(expenses.el.modalComment).toBeVisible();
    await expect(expenses.el.modalCurrency).toBeVisible();
    await expect(expenses.el.modalCashCheckbox).toBeVisible();
    await expect(expenses.el.modalSaveBtn).toBeVisible();
    await expect(expenses.el.modalCancelBtn).toBeVisible();

    await expenses.closeModal();

    await expect(expenses.el.modalDate).toBeHidden();
    await expect(expenses.el.modalAmount).toBeHidden();
    await expect(expenses.el.modalComment).toBeHidden();
    await expect(expenses.el.modalCurrency).toBeHidden();
    await expect(expenses.el.modalCashCheckbox).toBeHidden();
    await expect(expenses.el.modalSaveBtn).toBeHidden();
    await expect(expenses.el.modalCancelBtn).toBeHidden();
  });

  test('Додати нову витрату', async ({ page }) => {
    const expenses = new ExpensesPage(page);
    await expenses.goto();

    const testData = {
      amount: '2000.00',
      comment: 'квіти',
      cash: true,
    };

    await expenses.fillForm(testData);
    await expenses.submitForm();

    const response = await page.waitForResponse(() => true);

    expect(response.request().method()).toBe('POST');
    expect(response.status()).toBe(200);
  });
});
