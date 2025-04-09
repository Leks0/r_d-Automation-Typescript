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
        await expect(nerdPage.mainMenu).toBeVisible;
        await expect(nerdPage.logo).toBeVisible;
        await expect(nerdPage.searchField).toBeVisible;

        // Отримуємо назви пунктів меню
        const menuItemTitles = await nerdPage.menuItems.allInnerTexts();
        const trimmedMenuItems = menuItemTitles.map(item => item.trim());
        // Перевіримо, що отримані всі очікувані пункти
        for (const expectedItem of expectedMenuItems) {
            expect(trimmedMenuItems).toContain(expectedItem);
        }

        console.log('Menu items:', menuItemTitles);
    });

    test('navigate Home and check elements on the main page', async ({ page }) => {
        const mainPage = new MainPage(page);
        await mainPage.goto();

        await mainPage.homeMenu.click();

        await expect(mainPage.homeLogo).toBeVisible;

        await expect(mainPage.searchButton).toBeVisible;
        const searchBtnText = await mainPage.searchButton.innerText();
        await expect(searchBtnText).toBe('Icons');

        await expect(mainPage.downloadButton).toBeVisible;
        const downloadBtnText = await mainPage.downloadButton.innerText();
        await expect(downloadBtnText).toBe('Downloads');
    });
});
