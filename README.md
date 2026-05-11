# Event Booking Application - Playwright Test Suite

Automated end-to-end and functional tests for an event booking application using Playwright.

## 📁 Project Structure

```
tests/
├── pages/                           # Page Object Model classes
│   ├── basePage.ts                  # Base page with shared methods
│   ├── loginPage.ts                 # Login page interactions
│   ├── eventsPage.ts                # Events listing and search
│   ├── bookingPage.ts               # Booking details page
│   └── paymentPage.ts               # Payment processing page
│
├── fixtures/                        # Test fixtures and setup
│   └── pageFixtures.ts              # Page object fixtures for tests
│
├── utils/                           # Utility files and helpers
│   ├── testData.ts                  # Centralized test data
│   └── helpers.ts                   # Helper functions
│
├── e2e/                             # End-to-end test scenarios
│   ├── eventBooking.spec.ts         # Complete booking workflow
│   └── basicTests.spec.ts           # Individual feature tests
│
├── example.spec.ts                  # Example test file
├── playwright.config.ts             # Playwright configuration
└── tsconfig.json                    # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Browsers are already installed by the initialization script

3. Configure the base URL in `.env`:
```bash
BASE_URL=http://localhost:3000
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm test -- --headed
```

### Run specific test file
```bash
npm test -- eventBooking.spec.ts
```

### Run tests in debug mode
```bash
npm test -- --debug
```

### Run tests with UI mode (interactive)
```bash
npm test -- --ui
```

### Run specific project (browser)
```bash
npm test -- --project=chromium
```

### Generate test code from browser interactions
```bash
npx playwright codegen http://localhost:3000
```

## 📋 Page Object Model

Each page has a dedicated class for maintainability and reusability.

### BasePage (Base Class)
Common methods used by all pages:
- `goto(path)` - Navigate to a page
- `clickElement(selector)` - Click an element
- `fillText(selector, text)` - Fill form input
- `getText(selector)` - Get element text
- `isVisible(selector)` - Check element visibility
- `waitForElement(selector)` - Wait for element to appear
- `getURL()` - Get current page URL

### LoginPage
- `goto()` - Navigate to login page
- `login(email, password)` - Perform login
- `isLoginFormVisible()` - Check form visibility
- `getErrorMessage()` - Get error message text
- `isErrorVisible()` - Check if error is shown
- `toggleRememberMe()` - Toggle remember me checkbox
- `clickForgotPassword()` - Click forgot password link

### EventsPage
- `goto()` - Navigate to events page
- `searchEvent(eventName)` - Search for events
- `getEventCount()` - Get number of displayed events
- `clickEventCard(index)` - Click specific event
- `getEventTitles()` - Get all event titles
- `bookFirstEvent()` - Book first visible event
- `openFilters()` - Open filter panel
- `isEventsListVisible()` - Check events list visibility

### BookingPage
- `goto()` - Navigate to booking page
- `selectTicketQuantity(quantity)` - Select number of tickets
- `selectCategory(category)` - Select ticket category (e.g., VIP)
- `addSpecialRequests(requests)` - Add special request notes
- `getTotalPrice()` - Get total booking price
- `proceedToPayment()` - Go to payment page
- `cancelBooking()` - Cancel booking
- `isBookingSummaryVisible()` - Check summary visibility
- `getEventName()` - Get event name on booking page

### PaymentPage
- `goto()` - Navigate to payment page
- `fillCardDetails(cardNumber, expiry, cvv, cardholderName)` - Fill card info
- `completePayment()` - Submit payment
- `isPaymentSuccessful()` - Check payment success message
- `getErrorMessage()` - Get payment error message
- `getOrderNumber()` - Get order confirmation number
- `goBack()` - Return to previous page
- `isOrderConfirmationVisible()` - Check order confirmation

## 📊 Test Data

Centralized test data in `tests/utils/testData.ts`:

### Test Users
```typescript
testUsers.validUser
testUsers.invalidUser
testUsers.adminUser
```

### Test Events
```typescript
testEvents.event1  // Tech Conference 2026
testEvents.event2  // Music Festival
testEvents.event3  // Workshop: Web Development
```

### Payment Data
```typescript
paymentData.validCard      // Valid test card
paymentData.expiredCard    // Expired card for testing
paymentData.invalidCard    // Invalid card for testing
```

### Booking Data
```typescript
bookingData.standardBooking  // Basic booking
bookingData.vipBooking       // VIP booking
```

## 🧩 Using Fixtures

Tests use custom fixtures for page objects:

```typescript
import { test, expect } from '../fixtures/pageFixtures';

test('example test', async ({ loginPage, eventsPage, bookingPage, paymentPage }) => {
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  // ... test continues
});
```

## ✅ Test Scenarios

### 1. Complete Booking Flow (eventBooking.spec.ts)
- Login with valid credentials
- Browse available events
- Select and book an event
- Fill booking details
- Complete payment
- Verify order confirmation

### 2. Basic Feature Tests (basicTests.spec.ts)

**Login Tests:**
- Display form elements
- Successful login
- Invalid credentials error
- Empty form submission error
- Forgot password link

**Events Page Tests:**
- Load events successfully
- Display event list
- Show event details
- Search functionality
- Filter events

**Booking Page Tests:**
- Display booking summary
- Select ticket quantity
- Select ticket category
- Add special requests
- Display total price
- Cancel booking

## 📈 Test Reports

Test results are automatically generated in multiple formats:

- **HTML Report**: `playwright-report/`
- **JSON Results**: `test-results/results.json`
- **JUnit XML**: `test-results/junit.xml`

### View Reports

```bash
# View HTML report
npx playwright show-report

# View test results
cat test-results/results.json
```

## 🔧 Configuration

Edit `playwright.config.ts` to customize:

- **baseURL** - Application URL (uses `BASE_URL` env var or defaults to http://localhost:3000)
- **browsers** - Change tested browsers (chromium, firefox, webkit)
- **retries** - Number of retries for CI environment
- **workers** - Parallel test execution
- **timeout** - Test timeout settings
- **screenshot** - Capture on failure only
- **video** - Retain videos on failure
- **trace** - Collect traces on first retry

## 🌍 Environment Variables

Create a `.env` file in the root directory:

```env
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=test.user@example.com
TEST_USER_PASSWORD=ValidPassword123!
API_URL=http://localhost:3001
DEBUG=false
```

## 💡 Best Practices

1. **Use Page Objects** - Keep selectors in page classes, not tests
2. **Centralize Test Data** - Update data in `testData.ts`
3. **Use Fixtures** - Leverage page fixtures for consistency
4. **Descriptive Names** - Use clear, meaningful test names
5. **Add Waits** - Always wait for navigation and elements
6. **Run Locally** - Test locally before pushing to CI
7. **Review Reports** - Always check test reports for issues
8. **Keep Tests Independent** - Each test should be standalone

## 🐛 Troubleshooting

### Tests Timing Out
- Increase timeout in `playwright.config.ts`
- Ensure application server is running
- Check network connectivity

### Element Not Found
- Verify selector in page class
- Use `npx playwright codegen` to inspect elements
- Check page has loaded completely with `waitForPageLoad()`

### Authentication Failing
- Verify test credentials in `testData.ts`
- Check login endpoint is accessible
- Look for CSRF token requirements

### Navigation Issues
- Ensure base URL is correct in config
- Add proper `waitForPageLoad()` calls
- Check for redirect URLs

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Test Configuration](https://playwright.dev/docs/test-configuration)

## 🔄 CI/CD Integration

The project includes GitHub Actions workflow at `.github/workflows/playwright.yml`:

- Runs tests on push and pull requests
- Supports multiple browsers
- Uploads test reports as artifacts
- Retries failed tests in CI environment

## 📝 License

ISC

## 🤝 Contributing

1. Create tests following existing patterns
2. Use page objects for UI interactions
3. Update test data in `testData.ts`
4. Run tests locally before submitting
5. Update documentation as needed

## ❓ Support

For questions or issues:
- Check Playwright official documentation
- Review test examples in `tests/e2e/`
- Examine page object implementations
- Check `.env` configuration
