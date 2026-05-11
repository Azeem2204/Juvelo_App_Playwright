import { Page } from '@playwright/test';
import { BasePage } from './basePage';

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

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('/events');
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
  }

  async isEventsListVisible(): Promise<boolean> {
    return this.isVisible(this.eventsList);
  }

  async waitForEventsToLoad() {
    await this.page.waitForSelector(this.eventCard);
  }
}
