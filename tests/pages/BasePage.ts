import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(selector: string) {
    await this.page.click(selector);
  }

  async fillText(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string | null> {
    return this.page.textContent(selector);
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.isVisible(selector);
  }

  async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }
}
