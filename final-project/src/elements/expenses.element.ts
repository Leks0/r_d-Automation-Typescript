import { Locator, Page } from '@playwright/test';

export class ExpensesPageElements {
    public constructor(private page: Page) {}

    public get alert(): Locator {
        return this.page.locator('.MuiAlert-message', { hasText: 'потрібно авторизуватися' });
    }

    public get alertCloseBtn(): Locator {
        return this.page.locator('[aria-label="Close"]');
    }

    public get table(): Locator {
        return this.page.locator('#test-table table');
    }

    public get addExpenseBtn(): Locator {
        return this.page.locator('button[title="Додати витрати"]');
    }

    public get modal(): Locator {
        return this.page.locator('#Row-new');
    }

    public get modalDate(): Locator {
        return this.page.locator('input#Date-New');
    }

    public get modalAmount(): Locator {
        return this.page.locator('input#Expense-New');
    }

    public get modalCurrency(): Locator {
        return this.page.locator('select#Currency-New');
    }

    public get modalComment(): Locator {
        return this.page.locator('input#Comment-New');
    }

    public get modalCashCheckbox(): Locator {
        return this.page.locator('input#Cash-New');
    }

    public get modalSaveBtn(): Locator {
        return this.page.locator('button#BtnAdd-New');
    }

    public get modalCancelBtn(): Locator {
        return this.page.locator('button#BtnCancel-New');
    }
}
