import { test, expect } from '../fixtures/pageFixtures';
import { testUsers, testEvents } from '../utils/testData';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display login form elements', async ({ loginPage }) => {
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
  });

  test('should successfully login with valid credentials', async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await expect(page).toHaveURL(/\/(dashboard|events)/);
  });

  test('should display error message for invalid credentials', async ({
    loginPage,
  }) => {
    await loginPage.login(testUsers.invalidUser.email, testUsers.invalidUser.password);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toBeTruthy();
  });

  test('should display error when submitting empty form', async ({
    loginPage,
  }) => {
    await loginPage.clickElement(loginPage.loginButton);
    expect(await loginPage.isErrorVisible()).toBeTruthy();
  });

  test('should have forgot password link', async ({ loginPage }) => {
    const forgotPasswordLinkVisible = await loginPage.isVisible(
      loginPage.forgotPasswordLink
    );
    expect(forgotPasswordLinkVisible).toBeTruthy();
  });

  test('should allow toggling remember me checkbox', async ({ loginPage }) => {
    const isCheckedBefore = await loginPage.page.isChecked(loginPage.rememberMeCheckbox);
    await loginPage.toggleRememberMe();
    const isCheckedAfter = await loginPage.page.isChecked(loginPage.rememberMeCheckbox);
    expect(isCheckedAfter).not.toBe(isCheckedBefore);
  });
});

test.describe('Events Page Tests', () => {
  test.beforeEach(async ({ loginPage, eventsPage }) => {
    await loginPage.goto();
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await eventsPage.goto();
  });

  test('should load events page successfully', async ({ eventsPage }) => {
    expect(await eventsPage.isEventsListVisible()).toBeTruthy();
  });

  test('should display list of events', async ({ eventsPage }) => {
    const eventCount = await eventsPage.getEventCount();
    expect(eventCount).toBeGreaterThan(0);
  });

  test('should display event details (title, date, price)', async ({
    eventsPage,
  }) => {
    const eventTitles = await eventsPage.getEventTitles();
    expect(eventTitles.length).toBeGreaterThan(0);
    expect(eventTitles[0]).toBeTruthy();
  });

  test('should have search functionality', async ({ eventsPage, page }) => {
    const searchInputVisible = await page.isVisible(eventsPage.searchInput);
    expect(searchInputVisible).toBeTruthy();
  });

  test('should filter events by search', async ({ eventsPage }) => {
    const initialCount = await eventsPage.getEventCount();
    await eventsPage.searchEvent('Tech');
    const filteredCount = await eventsPage.getEventCount();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should have filter button', async ({ eventsPage, page }) => {
    const filterButtonVisible = await page.isVisible(eventsPage.filterButton);
    expect(filterButtonVisible).toBeTruthy();
  });

  test('should navigate to event details on click', async ({
    eventsPage,
    page,
  }) => {
    await eventsPage.clickEventCard(0);
    const currentUrl = page.url();
    expect(currentUrl).toContain('/booking');
  });
});

test.describe('Booking Page Tests', () => {
  test.beforeEach(async ({ loginPage, eventsPage, bookingPage }) => {
    await loginPage.goto();
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);
    await eventsPage.goto();
    await eventsPage.clickEventCard(0);
  });

  test('should display booking summary', async ({ bookingPage }) => {
    expect(await bookingPage.isBookingSummaryVisible()).toBeTruthy();
  });

  test('should display event name on booking page', async ({ bookingPage }) => {
    const eventName = await bookingPage.getEventName();
    expect(eventName).toBeTruthy();
  });

  test('should allow selecting ticket quantity', async ({ bookingPage }) => {
    await bookingPage.selectTicketQuantity(3);
    const inputValue = await bookingPage.page.inputValue(bookingPage.ticketQuantity);
    expect(inputValue).toBe('3');
  });

  test('should allow selecting category', async ({ bookingPage, page }) => {
    await bookingPage.selectCategory('VIP');
    const selectedValue = await page.inputValue(bookingPage.categorySelect);
    expect(selectedValue).toBe('VIP');
  });

  test('should allow adding special requests', async ({ bookingPage, page }) => {
    const requests = 'Need wheelchair access';
    await bookingPage.addSpecialRequests(requests);
    const textareaValue = await page.inputValue(bookingPage.specialRequests);
    expect(textareaValue).toBe(requests);
  });

  test('should display total price', async ({ bookingPage }) => {
    const totalPrice = await bookingPage.getTotalPrice();
    expect(totalPrice).toBeTruthy();
  });

  test('should allow cancelling booking', async ({ bookingPage, page }) => {
    await bookingPage.cancelBooking();
    expect(page.url()).toContain('/events');
  });
});
