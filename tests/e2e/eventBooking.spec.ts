import { test, expect } from '../fixtures/pageFixtures';
import { testUsers, testEvents, paymentData, bookingData } from '../utils/testData';

test.describe('Event Booking End-to-End Workflow', () => {
  test('complete booking flow from login to payment confirmation', async ({
    loginPage,
    eventsPage,
    bookingPage,
    paymentPage,
    page,
  }) => {
    // Step 1: Login
    await loginPage.goto();
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
    await loginPage.login(testUsers.validUser.email, testUsers.validUser.password);

    // Step 2: Browse Events
    await eventsPage.goto();
    expect(await eventsPage.isEventsListVisible()).toBeTruthy();
    const eventCount = await eventsPage.getEventCount();
    expect(eventCount).toBeGreaterThan(0);

    // Step 3: Select Event and Book
    await eventsPage.clickEventCard(0);
    await bookingPage.goto();
    expect(await bookingPage.isBookingSummaryVisible()).toBeTruthy();

    // Step 4: Fill Booking Details
    await bookingPage.selectTicketQuantity(bookingData.standardBooking.ticketQuantity);
    await bookingPage.selectCategory(bookingData.standardBooking.category);
    await bookingPage.addSpecialRequests(bookingData.standardBooking.specialRequests);

    const totalPrice = await bookingPage.getTotalPrice();
    expect(totalPrice).toBeTruthy();

    // Step 5: Proceed to Payment
    await bookingPage.proceedToPayment();
    await paymentPage.waitForPageLoad();

    // Step 6: Fill Payment Details
    await paymentPage.fillCardDetails(
      paymentData.validCard.cardNumber,
      paymentData.validCard.expiry,
      paymentData.validCard.cvv,
      paymentData.validCard.cardholderName
    );

    // Step 7: Complete Payment
    await paymentPage.completePayment();

    // Step 8: Verify Success
    expect(await paymentPage.isPaymentSuccessful()).toBeTruthy();
    expect(await paymentPage.isOrderConfirmationVisible()).toBeTruthy();
    const orderNumber = await paymentPage.getOrderNumber();
    expect(orderNumber).toBeTruthy();
  });
});
