import { Page } from '@playwright/test';
import { Header, SideMenu } from '../elements/main.element';

export class MainPage {
    public constructor(private page: Page) {}

    public get el(): { header: Header; sideMenu: SideMenu } {
        return {
            header: new Header(this.page),
            sideMenu: new SideMenu(this.page)
        };
    }

    public async goto(): Promise<void> {
        await this.page.goto('/');
    }
}
