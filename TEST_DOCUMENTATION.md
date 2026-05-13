# Event Booking Flow Test - Playwright Test Case

## Test File
**Location:** `tests/e2e/eventBookingFlow.spec.ts`

## Test Scenario Summary
This test case automates the complete event booking workflow on the Juveloo application, following these steps:

### Test Steps Executed:

1. **Homepage Navigation**
   - Navigate to https://juveloo.com/
   - Verify homepage loads with hero heading: "Beach Events Crafted with Love & Sea 🌊"

2. **Category Navigation**
   - Navigate to Beach Parties category: https://juveloo.com/category/BEACH_PARTIES
   - Verify "Beach Parties" page heading is visible

3. **Event Selection**
   - Find and click on "Sunset Beach Party" event
   - Verify main event heading: **"Sunset Beach Party"** ✓
   - Verify event description: "Epic beach party at golden hour"

4. **Package Selection**
   - Select the "Classic Proposal" package
   - Price: ₹10,000
   - Package details:
     - Petal trail + candles + violinist
     - Up to 50 guests
     - 120 min setup time

5. **Login**
   - Click "Login to Book" button
   - Enter credentials:
     - Username: `azeem2204@gmail.com`
     - Password: `Allah786@`
   - Successfully login and proceed to booking page

6. **Package Verification**
   - Verify "Classic Proposal" package is selected in booking summary
   - Verify package price: ₹10,000

7. **Add-ons Selection**
   - Navigate to Add-ons step
   - Select "Bonfire Setup" extra
   - Price: ₹1,800
   - Description: Beach bonfire with seating arrangement for 20

8. **Event Details Form**
   - Navigate to Details step (Step 3 of 4)
   - Fill in the following information:

   | Field | Value |
   |-------|-------|
   | Event Date | 20th May 2026 (2026-05-20) |
   | Start Time | 7PM (07:00 PM) |
   | Duration | 4 hrs |
   | City | Chirala |
   | Venue/Location | Palm Garden Lawn |
   | Special Requests | "Please ensure beautiful sunset lighting and have extra champagne bottles ready for the celebration. Would love some decorative lanterns around the venue area." |

9. **Booking Confirmation**
   - Navigate to Confirm step (Step 4 of 4)
   - Verify complete booking summary:
     - Event: Sunset Beach Party
     - Package: Classic Proposal (₹10,000)
     - Add-ons: Bonfire Setup × 1 (₹1,800)
     - Date: 2026-05-20
     - Time: 07:00 PM
     - Duration: 4 hours
     - City: Chirala
     - Venue: Palm Garden Lawn
     - Special Request: As entered above
     - **Total: ₹11,800**

10. **Payment Ready**
    - Verify "Pay ₹11,800 Now" button is visible
    - Booking is ready for payment via Razorpay

## Key Assertions

✓ Event heading verification: "Sunset Beach Party"
✓ Package selection: Classic Proposal verified
✓ Login credentials: Successfully authenticated
✓ Add-ons: 1 selected (+₹1,800)
✓ All date/time/location details filled correctly
✓ Special requests: Text captured
✓ Final total: ₹11,800 (₹10,000 package + ₹1,800 add-on)

## Test Flow Diagram

```
Homepage
   ↓
Beach Parties Category
   ↓
Sunset Beach Party Event
   ↓
Verify Heading ✓
   ↓
Select Classic Proposal Package ✓
   ↓
Login with credentials ✓
   ↓
Verify Package Selected ✓
   ↓
Add Bonfire Setup Extra ✓
   ↓
Fill Event Details:
  - Date: 20/May/2026 ✓
  - Time: 7PM ✓
  - Duration: 4hrs ✓
  - City: Chirala ✓
  - Venue: Palm Garden Lawn ✓
  - Special Request ✓
   ↓
Confirm Booking ✓
   ↓
Verify Summary & Total (₹11,800) ✓
   ↓
Ready for Payment
```

## Running the Test

```bash
# Run the specific test
npm test -- tests/e2e/eventBookingFlow.spec.ts

# Run with headed browser
npm test -- tests/e2e/eventBookingFlow.spec.ts --headed

# Run with debug mode
npm test -- tests/e2e/eventBookingFlow.spec.ts --debug

# Run with UI mode
npm test -- tests/e2e/eventBookingFlow.spec.ts --ui
```

## Notes

- All form fields are correctly filled with the requested data
- The test uses both UI element clicks and form inputs
- Role-based locators are preferred (getByRole, getByPlaceholder)
- Text matching is used where appropriate for flexibility
- The test waits for network idle state after navigation
- All assertions verify the actual application state
- The test demonstrates the complete booking flow from event discovery to payment confirmation
