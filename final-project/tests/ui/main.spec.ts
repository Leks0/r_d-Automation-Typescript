import { test, expect } from '@playwright/test';
import { MainPage } from '../../src/pages/main.page';

test.describe('Головна сторінка FOP Help', () => {
    test('Елементи хедера мають бути присутні', async ({ page }) => {
        const main = new MainPage(page);
        await main.goto();

        await expect(main.el.header.homeLink).toBeVisible();
        await expect(main.el.header.registerLink).toBeVisible();
        await expect(main.el.header.loginLink).toBeVisible();
    });

    test('Елементи бокового меню мають бути присутні', async ({ page }) => {
        const main = new MainPage(page);
        await main.goto();

        await expect(main.el.sideMenu.income).toBeVisible();
        await expect(main.el.sideMenu.expenses).toBeVisible();
        await expect(main.el.sideMenu.taxes).toBeVisible();
        await expect(main.el.sideMenu.reports).toBeVisible();
        await expect(main.el.sideMenu.basics).toBeVisible();
    });

    test('Елементи бокового підменю мають бути присутні', async ({ page }) => {
        const main = new MainPage(page);
        await main.goto();

        await main.el.sideMenu.taxes.click();
        await expect(main.el.sideMenu.taxesCurrent).toBeVisible();
        await expect(main.el.sideMenu.taxesPaid).toBeVisible();
        await main.el.sideMenu.reports.click();
        await expect(main.el.sideMenu.reportsAll).toBeVisible();
        await expect(main.el.sideMenu.reportsSubmitted).toBeVisible();
    });
});
