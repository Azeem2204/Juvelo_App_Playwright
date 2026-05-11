import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { EventsPage } from '../pages/eventsPage';
import { BookingPage } from '../pages/bookingPage';
import { PaymentPage } from '../pages/paymentPage';

type PageFixtures = {
  loginPage: LoginPage;
  eventsPage: EventsPage;
  bookingPage: BookingPage;
  paymentPage: PaymentPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  eventsPage: async ({ page }, use) => {
    const eventsPage = new EventsPage(page);
    await use(eventsPage);
  },

  bookingPage: async ({ page }, use) => {
    const bookingPage = new BookingPage(page);
    await use(bookingPage);
  },

  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },
});

export { expect } from '@playwright/test';
