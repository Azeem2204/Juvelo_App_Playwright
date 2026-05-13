import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EventDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isMainHeadingVisible(heading: string): Promise<boolean> {
    try {
      const headingElement = this.page.getByRole('heading', { name: new RegExp(heading, 'i') });
      await expect(headingElement).toBeVisible({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isDescriptionVisible(description: string): Promise<boolean> {
    try {
      const descElement = this.page.getByText(new RegExp(description, 'i'));
      await expect(descElement).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async selectPackage(packageName: string) {
    try {
      // Find the package option by name
      const packageOption = this.page.locator(`text=${packageName}`).first().locator('../..');
      await expect(packageOption).toBeVisible({ timeout: 5000 });
      await packageOption.click();
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.error(`Error selecting package ${packageName}:`, e);
    }
  }

  async getPackagePrice(): Promise<string> {
    try {
      const priceElement = this.page.locator('text=₹').first();
      const price = await priceElement.textContent();
      return price || '';
    } catch (e) {
      return '';
    }
  }

  async clickButton(buttonName: string) {
    try {
      const button = this.page.getByRole('button', { name: new RegExp(buttonName, 'i') });
      await expect(button).toBeVisible({ timeout: 5000 });
      await button.click();
      await this.page.waitForLoadState('networkidle');
    } catch (e) {
      console.error(`Error clicking button ${buttonName}:`, e);
    }
  }

  async isButtonEnabled(buttonName: string): Promise<boolean> {
    try {
      const button = this.page.getByRole('button', { name: new RegExp(buttonName, 'i') });
      return await button.isEnabled({ timeout: 5000 });
    } catch (e) {
      return false;
    }
  }
}
