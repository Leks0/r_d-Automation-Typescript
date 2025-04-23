import { Locator, Page } from '@playwright/test';

export class Header {
  readonly homeLink: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;

  constructor(page: Page) {
    this.homeLink = page.getByRole('link', { name: 'Домашня' });
    this.registerLink = page.getByRole('link', { name: 'Реєстрація' });
    this.loginLink = page.getByRole('link', { name: 'Увійти' });
  }
}

export class SideMenu {
  readonly income: Locator;
  readonly expenses: Locator;
  readonly taxes: Locator;
  readonly reports: Locator;
  readonly basics: Locator;

  // Вкладені пункти "Податки"
  readonly taxesCurrent: Locator;
  readonly taxesPaid: Locator;

  // Вкладені пункти "Звіти"
  readonly reportsAll: Locator;
  readonly reportsSubmitted: Locator;

  constructor(page: Page) {
    this.income = page.locator('text=Прибутки');
    this.expenses = page.locator('text=Витрати');
    this.taxes = page.locator('text=Податки');
    this.reports = page.locator('text=Звіти');
    this.basics = page.locator('text=Основи для розрахунку');

    this.taxesCurrent = page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Поточні' });
    this.taxesPaid = page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Сплачені' });

    this.reportsAll = page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Усі' });
    this.reportsSubmitted = page.locator('div.side-navigation-panel-select-inner-option', { hasText: 'Подані' });
  }
}
