export const testUsers = {
  validUser: {
    email: 'test.user@example.com',
    password: 'ValidPassword123!',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'WrongPassword123!',
  },
  adminUser: {
    email: 'admin@example.com',
    password: 'AdminPassword123!',
  },
};

export const testEvents = {
  event1: {
    name: 'Tech Conference 2026',
    date: '2026-06-15',
    price: 99.99,
  },
  event2: {
    name: 'Music Festival',
    date: '2026-07-20',
    price: 79.99,
  },
  event3: {
    name: 'Workshop: Web Development',
    date: '2026-05-25',
    price: 49.99,
  },
};

export const paymentData = {
  validCard: {
    cardNumber: '4111111111111111',
    expiry: '12/25',
    cvv: '123',
    cardholderName: 'Test User',
  },
  expiredCard: {
    cardNumber: '4111111111111111',
    expiry: '01/20',
    cvv: '123',
    cardholderName: 'Test User',
  },
  invalidCard: {
    cardNumber: '4000000000000002',
    expiry: '12/25',
    cvv: '123',
    cardholderName: 'Test User',
  },
};

export const bookingData = {
  standardBooking: {
    ticketQuantity: 2,
    category: 'General',
    specialRequests: 'No special requirements',
  },
  vipBooking: {
    ticketQuantity: 4,
    category: 'VIP',
    specialRequests: 'Need accessible seating',
  },
};
