import { Locator, Page } from '@playwright/test';

export class Header {
    public constructor(private page: Page) {}

    public get homeLink(): Locator {
        return this.page.getByRole('link', { name: 'Домашня' });
    }

    public get registerLink(): Locator {
        return this.page.getByRole('link', { name: 'Реєстрація' });
    }

    public get loginLink(): Locator {
        return this.page.getByRole('link', { name: 'Увійти' });
    }
}

export class SideMenu {
    public constructor(private page: Page) {}

    public get income(): Locator {
        return this.page.locator('text=Прибутки');
    }

    public get expenses(): Locator {
        return this.page.locator('text=Витрати');
    }

    public get taxes(): Locator {
        return this.page.locator('text=Податки');
    }

    public get reports(): Locator {
        return this.page.locator('text=Звіти');
    }

    public get basics(): Locator {
        return this.page.locator('text=Основи для розрахунку');
    }

    public get taxesCurrent(): Locator {
        return this.page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Поточні' });
    }

    public get taxesPaid(): Locator {
        return this.page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Сплачені' });
    }

    public get reportsAll(): Locator {
        return this.page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Усі' });
    }

    public get reportsSubmitted(): Locator {
        return this.page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Подані' });
    }
}
