import { test } from '@playwright/test';
import { AtlassianLoginPage } from '../../src/pages/atlassian-login.page';

test.describe('Atlassian login', () => {
    test('login', async ({ page, context }) => {
        const atlassianLoginPage = new AtlassianLoginPage(page, context);
        await atlassianLoginPage.login(process.env.JIRA_LOGIN as string, process.env.JIRA_PASSWORD as string);
    });
});
