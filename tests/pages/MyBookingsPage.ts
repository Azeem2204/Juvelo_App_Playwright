import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class MyBookingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToMyBookings() {
    try {
      // First try clicking on the profile/account menu
      let menu = this.page.getByRole('button', { name: /profile|account|my account/i }).first();
      if (await menu.isVisible({ timeout: 2000 }).catch(() => false)) {
        await menu.click();
        await this.page.waitForTimeout(500);
      }

      // Then try clicking on My Bookings link
      let myBookingsLink = this.page.getByRole('link', { name: /My Bookings|My bookings|my bookings/i });
      if (await myBookingsLink.isVisible({ timeout: 3000 }).catch(() => false)) {
        await myBookingsLink.click();
        await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
        return;
      }

      // Try alternative: navigate directly to URL
      const currentUrl = this.page.url();
      const baseUrl = new URL(currentUrl).origin;
      await this.page.goto(`${baseUrl}/my-bookings`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    } catch (e) {
      console.error('Error navigating to My Bookings:', e);
    }
  }

  async isMyBookingsPageVisible(): Promise<boolean> {
    try {
      const heading = this.page.getByRole('heading', { name: /My Bookings|bookings/i });
      await expect(heading).toBeVisible({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async findRecentBooking(eventTitle: string, eventDate: string): Promise<boolean> {
    try {
      // Look for booking card with event title
      const bookingCard = this.page.locator(`text=${eventTitle}`).locator('..').first();
      await expect(bookingCard).toBeVisible({ timeout: 10000 });
      return true;
    } catch (e) {
      console.error(`Error finding booking for ${eventTitle}:`, e);
      return false;
    }
  }

  async getBookingNumber(): Promise<string> {
    try {
      // Look for booking ID/number pattern (e.g., "Order #12345" or "Booking #ABC123")
      const bookingNumberElement = this.page.locator('[class*="booking-id"], [class*="order-id"], text=/Booking #|Order #/').first();
      const text = await bookingNumberElement.textContent();
      
      // Extract booking number from text like "Booking #12345"
      const match = text?.match(/#[\w]+/);
      return match ? match[0].substring(1) : '';
    } catch (e) {
      console.error('Error getting booking number:', e);
      return '';
    }
  }

  async isBookingStatusVisible(status: string): Promise<boolean> {
    try {
      const statusElement = this.page.getByText(new RegExp(status, 'i'));
      await expect(statusElement).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getBookingDate(): Promise<string> {
    try {
      const dateElement = this.page.locator('[class*="date"]').first();
      const date = await dateElement.textContent();
      return date || '';
    } catch (e) {
      return '';
    }
  }

  async viewBookingDetails() {
    try {
      const viewButton = this.page.getByRole('button', { name: /View|Details|View Details/i }).first();
      if (await viewButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await viewButton.click();
        await this.page.waitForTimeout(1000);
      }
    } catch (e) {
      console.error('Error viewing booking details:', e);
    }
  }

  async isEventTitleVisible(eventTitle: string): Promise<boolean> {
    try {
      const titleElement = this.page.getByText(eventTitle);
      await expect(titleElement).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isVenueVisible(venue: string): Promise<boolean> {
    try {
      const venueElement = this.page.getByText(new RegExp(venue, 'i'));
      await expect(venueElement).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isCityVisible(city: string): Promise<boolean> {
    try {
      const cityElement = this.page.getByText(new RegExp(city, 'i'));
      await expect(cityElement).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }
}
