import { Page } from '@playwright/test';
import { ExpensesPageElements } from '../elements/expenses.element';

export class ExpensesPage {
    public readonly el: ExpensesPageElements;

    public constructor(private page: Page) {
        this.el = new ExpensesPageElements(page);
    }

    public async goto(): Promise<void> {
        await this.page.goto('/expenses');
    }

    public async closeAlertIfVisible(): Promise<void> {
        if (await this.el.alert.isVisible()) {
            await this.el.alertCloseBtn.click();
        }
    }

    public async openModal(): Promise<void> {
        await this.el.addExpenseBtn.click();
    }

    public async closeModal(): Promise<void> {
        await this.el.modalCancelBtn.click();
    }

    public async fillForm(data: { amount: string; comment: string; cash: boolean }): Promise<void> {
        await this.el.addExpenseBtn.click();
        await this.el.modalAmount.fill(data.amount);
        await this.el.modalComment.fill(data.comment);
        if (data.cash) {
            await this.el.modalCashCheckbox.check();
        } else {
            await this.el.modalCashCheckbox.uncheck();
        }
    }

    public async submitForm(): Promise<void> {
        await this.el.modalSaveBtn.click();
    }
}
