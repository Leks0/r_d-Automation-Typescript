import { Page } from '@playwright/test';
import { ExpensesPageElements } from '../elements/expenses.element';

export class ExpensesPage {
  readonly el: ExpensesPageElements;

  constructor(private page: Page) {
    this.el = new ExpensesPageElements(page);
  }

  async goto() {
    await this.page.goto('/expenses');
  }

  async closeAlertIfVisible() {
    if (await this.el.alert.isVisible()) {
      await this.el.alertCloseBtn.click();
    }
  }

  async openModal() {
    await this.el.addExpenseBtn.click();
  }

  async closeModal() {
    await this.el.modalCancelBtn.click();
  }

  async fillForm(data: { amount: string, comment: string, cash: boolean }) {
    await this.el.addExpenseBtn.click();
    await this.el.modalAmount.fill(data.amount);
    await this.el.modalComment.fill(data.comment);
    if (data.cash) {
      await this.el.modalCashCheckbox.check();
    } else {
      await this.el.modalCashCheckbox.uncheck();
    }
  }

  async submitForm() {
    await this.el.modalSaveBtn.click();
  }
}
