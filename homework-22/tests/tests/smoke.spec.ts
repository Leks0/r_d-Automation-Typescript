import { test, expect } from '@playwright/test';

test.describe('Expense Tracker App UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    await page.goto(baseUrl);
    await expect(page.locator('h2:has-text("Expense Tracker App")')).toBeVisible();
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Expense Tracker App With React.JS!/);
  });

  test('should display initial values correctly', async ({ page }) => {
    await expect(page.locator('#balance')).toHaveText('$0.00');
    await expect(page.locator('.inc-exp-container div:has-text("Income") > p.money.plus')).toHaveText('0.00');
    await expect(page.locator('.inc-exp-container div:has-text("Expense") > p.money.minus')).toHaveText('0.00');
  });

  test('should display main components', async ({ page }) => {
    await expect(page.locator('h2:has-text("Expense Tracker App")')).toBeVisible();
    await expect(page.locator('h4:has-text("Current Balance")')).toBeVisible();
    await expect(page.locator('h4:has-text("Income")')).toBeVisible();
    await expect(page.locator('h4:has-text("Expense")')).toBeVisible();
    await expect(page.locator('h3:has-text("Transaction History")')).toBeVisible();
    await expect(page.locator('h3:has-text("Add New Transaction")')).toBeVisible();
    await expect(page.locator('#description')).toBeVisible();
    await expect(page.locator('#transactionamount')).toBeVisible();
    await expect(page.locator('button:has-text("Add Transaction")')).toBeVisible();
  });

  test('should add a new income transaction', async ({ page }) => {
    await page.fill('#description', 'Test Income');
    await page.fill('#transactionamount', '100');
    await page.click('button:has-text("Add Transaction")');
    await expect(page.locator('.list li:has-text("Test Income")')).toBeVisible();
    await expect(page.locator('#balance')).not.toHaveText('$0.00');
    await expect(page.locator('.money.plus')).not.toHaveText('0.00');
  });

  test('should add a new expense transaction', async ({ page }) => {
    await page.fill('#description', 'Test Expense');
    await page.fill('#transactionamount', '-50');
    await page.click('button:has-text("Add Transaction")');

    await expect(page.locator('.list li:has-text("Test Expense")')).toBeVisible();
    await expect(page.locator('.money.minus')).not.toHaveText('0.00');
  });

  test('should delete a transaction', async ({ page }) => {
    await page.fill('#description', 'Transaction to delete');
    await page.fill('#transactionamount', '75');
    await page.click('button:has-text("Add Transaction")');
    
    await expect(page.locator('.list li:has-text("Transaction to delete")')).toBeVisible();
    
    const transactionsBeforeCount = await page.locator('.list li').count();

    await page.hover('.list li:has-text("Transaction to delete")');
    await page.click('.list li:has-text("Transaction to delete") .delete-btn');

    const transactionsAfterCount = await page.locator('.list li').count();
    expect(transactionsAfterCount).toBeLessThan(transactionsBeforeCount);
    await expect(page.locator('.list li:has-text("Transaction to delete")')).not.toBeVisible();
  });
});