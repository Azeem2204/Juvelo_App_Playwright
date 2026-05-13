import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class PaymentPage extends BasePage {
  readonly cardNumberInput = 'input[name="cardNumber"]';
  readonly expiryInput = 'input[name="expiry"]';
  readonly cvvInput = 'input[name="cvv"]';
  readonly cardholderInput = 'input[name="cardholderName"]';
  readonly payButton = 'button:has-text("Pay Now")';
  readonly successMessage = '.payment-success';
  readonly errorMessage = '.payment-error';
  readonly backButton = 'button:has-text("Back")';
  readonly orderNumber = '.order-number';
  readonly orderConfirmation = '.order-confirmation';

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto('/payment');
  }

  async fillCardDetails(
    cardNumber: string,
    expiry: string,
    cvv: string,
    cardholderName: string
  ) {
    await this.fillText(this.cardNumberInput, cardNumber);
    await this.fillText(this.expiryInput, expiry);
    await this.fillText(this.cvvInput, cvv);
    await this.fillText(this.cardholderInput, cardholderName);
  }

  async completePayment() {
    await this.clickElement(this.payButton);
    await this.waitForPageLoad();
  }

  async isPaymentSuccessful(): Promise<boolean> {
    return this.isVisible(this.successMessage);
  }

  async getErrorMessage(): Promise<string | null> {
    return this.getText(this.errorMessage);
  }

  async getOrderNumber(): Promise<string | null> {
    return this.getText(this.orderNumber);
  }

  async goBack() {
    await this.clickElement(this.backButton);
    await this.waitForPageLoad();
  }

  async isOrderConfirmationVisible(): Promise<boolean> {
    return this.isVisible(this.orderConfirmation);
  }

  async closePaymentPopup() {
    try {
      // Try pressing Escape key
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
    } catch (e) {
      console.error('Error pressing Escape:', e);
    }

    try {
      // Try clicking close button (X button) if visible
      const closeButton = this.page.locator('button[aria-label="Close"], .modal-close, [class*="close"]').first();
      if (await closeButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await closeButton.click();
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      console.error('Error clicking close button:', e);
    }

    try {
      // Try clicking outside the modal (backdrop)
      const modalBackdrop = this.page.locator('[class*="backdrop"], [class*="overlay"]').first();
      if (await modalBackdrop.isVisible({ timeout: 2000 }).catch(() => false)) {
        await modalBackdrop.click();
        await this.page.waitForTimeout(500);
      }
    } catch (e) {
      console.error('Error clicking backdrop:', e);
    }
  }
}
