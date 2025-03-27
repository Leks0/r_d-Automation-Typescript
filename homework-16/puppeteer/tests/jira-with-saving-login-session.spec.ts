import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { clearSession, restoreSession, saveSession } from '../src/state-management';

describe('Jira Puppeteer tests', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    before(async () => {
        browser = await puppeteer.launch({headless: false, defaultViewport: {width: 1200, height: 800}});
    });

    beforeEach(async () => {
        context = await browser.createBrowserContext();
        await restoreSession(context);
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });

    after(async () => {
        await browser.close();
        await clearSession();
    });

    it('should login to Jira (on a real project it should be a global hook)', async () => {
        await page.goto('https://www.atlassian.com/', { waitUntil: 'domcontentloaded' });
        await page.locator('[name="sign-in"]').click();
        await page.locator('#username').fill('<your email here>'); // change to you login email
        await page.locator('#login-submit').click();
        await page.locator('#password').fill('<your password here>'); // change to you password
        await page.locator('#login-submit').click();
        await page.waitForNavigation();

        await page.waitForSelector('[data-testid="nav-profile-button--trigger"]');
        await saveSession(context);
    });

    it('should open Jira without login', async () => {
        await page.goto('https://levkoniuk.atlassian.net/', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('[data-testid="atlassian-navigation--secondary-actions--profile--trigger"]');
    });
});
