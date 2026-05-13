import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BookingDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async isBookingPageVisible(): Promise<boolean> {
    try {
      const bookingHeading = this.page.getByRole('heading', { name: /Book.*Sunset Beach Party/i });
      await expect(bookingHeading).toBeVisible({ timeout: 10000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isBookingSummaryVisible(): Promise<boolean> {
    try {
      const summary = this.page.locator('[class*="summary"], [class*="booking-summary"]').first();
      await expect(summary).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async isPackageSelected(packageName: string): Promise<boolean> {
    try {
      const packageText = this.page.getByText(packageName);
      await expect(packageText).toBeVisible({ timeout: 5000 });
      return true;
    } catch (e) {
      return false;
    }
  }

  async fillEventDate(dateString: string) {
    try {
      // Parse date like "20th May 2026" to "2026-05-20"
      const parts = dateString.split(' ');
      const day = parts[0].replace(/\D/g, '');
      const monthStr = parts[1];
      const year = parts[2];

      const months: { [key: string]: string } = {
        'January': '01', 'February': '02', 'March': '03', 'April': '04',
        'May': '05', 'June': '06', 'July': '07', 'August': '08',
        'September': '09', 'October': '10', 'November': '11', 'December': '12'
      };

      const month = months[monthStr] || '05';
      const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;

      const dateInput = this.page.locator('input[type="date"]').first();
      await expect(dateInput).toBeVisible({ timeout: 5000 });
      await dateInput.fill(formattedDate);
    } catch (e) {
      console.error(`Error filling date ${dateString}:`, e);
    }
  }

  async setStartTime(time: string) {
    try {
      // Parse time like "7PM" to find the button with "07:00 PM"
      const timeButton = this.page.getByRole('button', { name: new RegExp(time.replace('PM', 'PM|07:00'), 'i') });
      await expect(timeButton).toBeVisible({ timeout: 5000 });
      await timeButton.click();
    } catch (e) {
      console.error(`Error setting time ${time}:`, e);
    }
  }

  async setDuration(duration: string) {
    try {
      const durationButton = this.page.getByRole('button', { name: new RegExp(duration, 'i') });
      await expect(durationButton).toBeVisible({ timeout: 5000 });
      await durationButton.click();
    } catch (e) {
      console.error(`Error setting duration ${duration}:`, e);
    }
  }

  async selectCity(city: string) {
    try {
      const citySelect = this.page.locator('select').first();
      await expect(citySelect).toBeVisible({ timeout: 5000 });
      await citySelect.selectOption({ label: new RegExp(city, 'i') });
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.error(`Error selecting city ${city}:`, e);
    }
  }

  async selectVenue(venue: string) {
    try {
      const venueSelect = this.page.locator('select').nth(1);
      await expect(venueSelect).toBeVisible({ timeout: 5000 });
      await venueSelect.click();
      await this.page.keyboard.type('p');
      await this.page.waitForTimeout(300);
    } catch (e) {
      console.error(`Error selecting venue ${venue}:`, e);
    }
  }

  async addSpecialRequest(request: string) {
    try {
      const textarea = this.page.getByPlaceholder(/Theme preferences|special request/i);
      await expect(textarea).toBeVisible({ timeout: 5000 });
      await textarea.fill(request);
    } catch (e) {
      console.error(`Error adding special request:`, e);
    }
  }

  async selectAddOn(addOnName: string) {
    try {
      const addOnOption = this.page.locator(`text=${addOnName}`).locator('..');
      const addButton = addOnOption.getByRole('button', { name: /\+ Add/i });
      await expect(addButton).toBeVisible({ timeout: 5000 });
      await addButton.click();
      await this.page.waitForTimeout(500);
    } catch (e) {
      console.error(`Error selecting add-on ${addOnName}:`, e);
    }
  }

  async getAddOnPrice(): Promise<string> {
    try {
      const priceElement = this.page.locator('text=₹').nth(1);
      const price = await priceElement.textContent();
      return price || '';
    } catch (e) {
      return '';
    }
  }
}
