import { test, expect } from '@playwright/test';
import { MainPage } from '../../src/pages/main.page';

test.describe('Головна сторінка FOP Help', () => {
  test('Елементи хедера мають бути присутні', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await expect(main.header.homeLink).toBeVisible();
    await expect(main.header.registerLink).toBeVisible();
    await expect(main.header.loginLink).toBeVisible();
  });

  test('Елементи бокового меню мають бути присутні', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await expect(main.sideMenu.income).toBeVisible();
    await expect(main.sideMenu.expenses).toBeVisible();
    await expect(main.sideMenu.taxes).toBeVisible();
    await expect(main.sideMenu.reports).toBeVisible();
    await expect(main.sideMenu.basics).toBeVisible();
  });

  test('Елементи бокового підменю мають бути присутні', async ({ page }) => {
    const main = new MainPage(page);
    await main.goto();

    await main.sideMenu.taxes.click();
    await expect(main.sideMenu.taxesCurrent).toBeVisible();
    await expect(main.sideMenu.taxesPaid).toBeVisible();
    await main.sideMenu.reports.click();
    await expect(main.sideMenu.reportsAll).toBeVisible();
    await expect(main.sideMenu.reportsSubmitted).toBeVisible();
  });
});
