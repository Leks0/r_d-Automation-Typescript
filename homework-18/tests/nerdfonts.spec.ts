import { test, expect } from '@playwright/test';
import { CheetSheet } from '../src/pages/cheat-sheet.page';
import { MainPage } from '../src/pages/main.page';


const expectedMenuItems = [
    'HOME',
    'FEATURES',
    'FONTS DOWNLOADS',
    'CHEAT SHEET',
    'CONTRIBUTORS',
    'BACKERS',
    'CHANGELOG'
];

test.describe('NerdFonts page checks', () => {
    test('open page', async ({ page }) => {
        const nerdPage = new CheetSheet(page);
        await nerdPage.goto();
    });

    test('verify elements are visible and fetch menu item titles', async ({ page }) => {
        const nerdPage = new CheetSheet(page);
        await nerdPage.goto();

        // Перевіримо, що хедер, лого та поле пошуку присутні:
        await expect(await nerdPage.isMainMenuVisible()).toBe(true);
        await expect(await nerdPage.isLogoVisible()).toBe(true);
        await expect(await nerdPage.isSearchFieldVisible()).toBe(true);

        // Отримуємо назви пунктів меню
        const menuItemTitles = await nerdPage.getMenuItemTitles();
        // Перевіримо, що отримані всі очікувані пункти
        for (const expectedItem of expectedMenuItems) {
            expect(menuItemTitles).toContain(expectedItem);
        }

        // Для прикладу, виведемо назви у консоль (за бажанням)
        console.log('Menu items:', menuItemTitles);
    });

    test('navigate Home and check elements on the main page', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();

        await mainPage.clickHomeMenu();

        await expect(await mainPage.isHomeLogoVisible()).toBe(true);

        await expect(await mainPage.isSearchButtonVisible()).toBe(true);
        const searchBtnText = await mainPage.getSearchButtonText();
        await expect(searchBtnText).toBe('Icons');

        await expect(await mainPage.isDownloadButtonVisible()).toBe(true);
        const downloadBtnText = await mainPage.getDownloadButtonText();
        await expect(downloadBtnText).toBe('Downloads');
    });
});
