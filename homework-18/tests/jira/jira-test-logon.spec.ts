import { expect, test } from '@playwright/test';
import { AtlassianLoginPage, JiraPage } from '../../src/pages';

test.describe('Atlassian login', () => {
    test('login', async ({ page, context }) => {
        const atlassianLoginPage = new AtlassianLoginPage(page, context);

        await atlassianLoginPage.login(process.env.JIRA_LOGIN as string, process.env.JIRA_PASSWORD as string);
    });

    test('jira is logged in', async ({ page }) => {
        const jiraPage = new JiraPage(page);

        await jiraPage.goTo();

        await expect(jiraPage.userLogo).toBeVisible();
    });
});
