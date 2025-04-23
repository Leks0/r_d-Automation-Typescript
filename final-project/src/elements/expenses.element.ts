import { Locator, Page } from '@playwright/test';

export class ExpensesPageElements {
  readonly alert: Locator;
  readonly alertCloseBtn: Locator;
  readonly table: Locator;
  readonly addExpenseBtn: Locator;

  // modal elements
  readonly modal: Locator;
  readonly modalDate: Locator;
  readonly modalAmount: Locator;
  readonly modalCurrency: Locator;
  readonly modalComment: Locator;
  readonly modalCashCheckbox: Locator;
  readonly modalSaveBtn: Locator;
  readonly modalCancelBtn: Locator;

  constructor(page: Page) {
    this.alert = page.locator('.MuiAlert-message', {
      hasText: 'потрібно авторизуватися',
    });

    this.alertCloseBtn = page.locator('[aria-label="Close"]');
    this.table = page.locator('#test-table table');
    this.addExpenseBtn = page.locator('button[title="Додати витрати"]');

    this.modal = page.locator('#Row-new');
    this.modalDate = page.locator('input#Date-New');
    this.modalAmount = page.locator('input#Expense-New');
    this.modalCurrency = page.locator('select#Currency-New');
    this.modalComment = page.locator('input#Comment-New');
    this.modalCashCheckbox = page.locator('input#Cash-New');
    this.modalSaveBtn = page.locator('button#BtnAdd-New');
    this.modalCancelBtn = page.locator('button#BtnCancel-New');
  }
}
