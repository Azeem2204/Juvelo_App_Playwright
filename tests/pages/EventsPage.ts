import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class EventsPage extends BasePage {
  readonly eventsList = '.events-list';
  readonly eventCard = '.event-card';
  readonly eventTitle = '.event-title';
  readonly eventDate = '.event-date';
  readonly eventPrice = '.event-price';
  readonly searchInput = 'input[placeholder="Search events"]';
  readonly filterButton = 'button[data-testid="filter-button"]';
  readonly bookButton = 'button:has-text("Book Now")';
  readonly loadingSpinner = '.spinner';
  readonly emptyState = '.empty-state';
  readonly beachPartiesHeading = 'h1:has-text("Beach Parties")';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('https://juveloo.com/category/BEACH_PARTIES');
    await this.waitForPageLoad();
  }

  async isBeachPartiesHeadingVisible(): Promise<boolean> {
    try {
      const heading = this.page.getByRole('heading', { name: /Beach Parties/i });
      await expect(heading).toBeVisible({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async clickEventByName(eventName: string) {
    try {
      const eventLink = this.page.getByRole('link', { name: new RegExp(eventName, 'i') }).first();
      await expect(eventLink).toBeVisible({ timeout: 10000 });
      await eventLink.click();
      await this.waitForPageLoad();
    } catch (e) {
      console.error(`Error clicking event ${eventName}:`, e);
    }
  }

  async searchEvent(eventName: string) {
    await this.fillText(this.searchInput, eventName);
    await this.page.keyboard.press('Enter');
    await this.waitForPageLoad();
  }

  async getEventCount(): Promise<number> {
    return this.page.locator(this.eventCard).count();
  }

  async clickEventCard(index: number = 0) {
    const cards = this.page.locator(this.eventCard);
    await cards.nth(index).click();
    await this.waitForPageLoad();
  }

  async getEventTitles(): Promise<string[]> {
    return this.page.locator(this.eventTitle).allTextContents();
  }

  async bookFirstEvent() {
    const bookButtons = this.page.locator(this.bookButton);
    await bookButtons.first().click();
    await this.waitForPageLoad();
  }

  async openFilters() {
    await this.clickElement(this.filterButton);
    await this.page.waitForTimeout(500);
  }
}
    await this.clickElement(this.filterButton);
  }

  async isEventsListVisible(): Promise<boolean> {
    return this.isVisible(this.eventsList);
  }

  async waitForEventsToLoad() {
    await this.page.waitForSelector(this.eventCard);
  }
}
