import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class BookingPage extends BasePage {
  readonly ticketQuantity = 'input[name="quantity"]';
  readonly categorySelect = 'select[name="category"]';
  readonly specialRequests = 'textarea[name="specialRequests"]';
  readonly continueButton = 'button:has-text("Continue to Payment")';
  readonly bookingOverview = '.booking-overview';
  readonly totalPrice = '.total-price';
  readonly cancelButton = 'button:has-text("Cancel")';
  readonly eventName = '.event-name';
  readonly eventDateTime = '.event-datetime';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('/booking');
  }

  async selectTicketQuantity(quantity: number) {
    await this.fillText(this.ticketQuantity, quantity.toString());
  }

  async selectCategory(category: string) {
    await this.page.selectOption(this.categorySelect, category);
  }

  async addSpecialRequests(requests: string) {
    await this.fillText(this.specialRequests, requests);
  }

  async getTotalPrice(): Promise<string | null> {
    return this.getText(this.totalPrice);
  }

  async proceedToPayment() {
    await this.clickElement(this.continueButton);
    await this.waitForPageLoad();
  }

  async cancelBooking() {
    await this.clickElement(this.cancelButton);
    await this.waitForPageLoad();
  }

  async isBookingSummaryVisible(): Promise<boolean> {
    return this.isVisible(this.bookingOverview);
  }

  async getEventName(): Promise<string | null> {
    return this.getText(this.eventName);
  }

  async isBookingFormValid(): Promise<boolean> {
    return this.page.evaluate(() => {
      const form = document.querySelector('form');
      return form?.checkValidity() ?? false;
    });
  }
}
