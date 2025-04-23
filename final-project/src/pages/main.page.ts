import { Page } from '@playwright/test';
import { Header, SideMenu } from '../elements/main.element';

export class MainPage {
  readonly header: Header;
  readonly sideMenu: SideMenu;

  constructor(private page: Page) {
    this.header = new Header(page);
    this.sideMenu = new SideMenu(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}
