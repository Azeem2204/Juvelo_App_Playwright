Feature: Sunset Beach Party Event Booking Flow
  As a user
  I want to book a Sunset Beach Party event
  So that I can celebrate my special occasion on the beach

  Scenario: Complete booking flow from event selection to My Bookings verification
    # Navigation and Event Discovery
    Given I navigate to the Juveloo homepage
    And I verify the homepage hero heading is visible
    
    # Beach Parties Category
    When I click on the Beach Parties category
    Then I should see the Beach Parties page
    
    # Event Selection
    When I click on the "Sunset Beach Party" event
    Then I should see the main heading "Sunset Beach Party"
    And I should see the event description "Epic beach party at golden hour"
    
    # Package Selection
    When I select the "Classic Proposal" package
    Then the package price should be "₹10,000"
    And the "Login to Book" button should be enabled
    
    # Login
    When I click the "Login to Book" button
    Then I should be on the login page
    
    When I enter username "azeem2204@gmail.com"
    And I enter password "Allah786@"
    And I click the "Sign In" button
    Then I should be logged in successfully
    And I should see the booking page
    
    # Verify Package and Add-ons
    When I verify that "Classic Proposal" package is selected
    Then I should see the package details in the booking summary
    
    When I click the "Next: Add-ons" button
    Then I should be on the Add-ons step
    
    When I select the "Bonfire Setup" add-on
    Then the add-on price should be "₹1,800"
    And I should see "1 selected" in the add-ons section
    
    # Fill Event Details
    When I click the "Next: Details" button
    Then I should be on the Event Details step
    
    When I fill the event date with "20th May 2026"
    And I set the start time to "7PM"
    And I set the duration to "4 hrs"
    And I select city as "Chirala"
    And I select venue as "Palm Garden Lawn"
    And I add special request: "Please ensure beautiful sunset lighting and have extra champagne bottles ready for the celebration. Would love some decorative lanterns around the venue area."
    Then all event details should be filled correctly
    
    # Confirm Booking
    When I click the "Next: Confirm" button
    Then I should see the booking confirmation page
    And I should see the event summary with all details
    And the total amount should be "₹11,800"
    
    # Payment and Confirmation
    When I click the "Pay ₹11,800 Now" button
    Then the payment popup should be displayed
    
    When I close the payment popup
    Then I should see the booking confirmation message
    And I should see the booking number displayed
    
    # My Bookings Verification
    When I navigate to the My Bookings section
    Then I should see the "Sunset Beach Party" booking in the list
    And the booking should show the date "2026-05-20"
    And the booking should show the amount "₹11,800"
    And the booking status should be "confirmed"
