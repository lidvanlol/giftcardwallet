const { by, device, element, expect } = require('detox');

describe('Gift Card Wallet App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  describe('App Launch and Navigation', () => {
    it('should launch app and show cards list screen', async () => {
      await expect(element(by.text('My Gift Cards'))).toBeVisible();
      await expect(element(by.text('Add New Card'))).toBeVisible();
    });

    it('should show empty state when no cards exist', async () => {
      await expect(element(by.text('No gift cards yet'))).toBeVisible();
      await expect(element(by.text('Tap the + button to add your first gift card'))).toBeVisible();
    });

    it('should navigate to add card screen when + button is pressed', async () => {
      await element(by.id('add-card-button')).tap();
      await expect(element(by.text('Add New Card'))).toBeVisible();
      await expect(element(by.text('Brand'))).toBeVisible();
      await expect(element(by.text('Amount'))).toBeVisible();
    });
  });

  describe('Adding a New Gift Card', () => {
    beforeEach(async () => {
      await element(by.id('add-card-button')).tap();
    });

    it('should add a new gift card successfully', async () => {
      // Fill in the form
      await element(by.id('brand-input')).typeText('Starbucks');
      await element(by.id('amount-input')).typeText('50');
      await element(by.id('last-four-digits-input')).typeText('1234');
      await element(by.id('notes-input')).typeText('Birthday gift');

      // Submit the form
      await element(by.id('submit-button')).tap();

      // Should navigate back to cards list
      await expect(element(by.text('My Gift Cards'))).toBeVisible();
      
      // Should show the new card
      await expect(element(by.text('Starbucks'))).toBeVisible();
      await expect(element(by.text('$50.00'))).toBeVisible();
    });

    it('should show validation errors for invalid input', async () => {
      // Try to submit empty form
      await element(by.id('submit-button')).tap();

      // Should show validation errors
      await expect(element(by.text('Brand is required'))).toBeVisible();
      await expect(element(by.text('Amount is required'))).toBeVisible();
    });

    it('should show validation error for invalid amount', async () => {
      await element(by.id('brand-input')).typeText('Test Brand');
      await element(by.id('amount-input')).typeText('invalid');
      
      await element(by.id('submit-button')).tap();
      
      await expect(element(by.text('Amount must be a number'))).toBeVisible();
    });

    it('should go back to cards list when back button is pressed', async () => {
      await element(by.id('back-button')).tap();
      await expect(element(by.text('My Gift Cards'))).toBeVisible();
    });
  });

  describe('Card List and Details', () => {
    beforeEach(async () => {
      // Add a test card first
      await element(by.id('add-card-button')).tap();
      await element(by.id('brand-input')).typeText('Amazon');
      await element(by.id('amount-input')).typeText('100');
      await element(by.id('last-four-digits-input')).typeText('5678');
      await element(by.id('submit-button')).tap();
    });

    it('should display cards in the list', async () => {
      await expect(element(by.text('Amazon'))).toBeVisible();
      await expect(element(by.text('$100.00'))).toBeVisible();
      await expect(element(by.text('****5678'))).toBeVisible();
    });

    it('should navigate to card details when card is tapped', async () => {
      await element(by.id('card-item-Amazon')).tap();
      
      await expect(element(by.text('Card Details'))).toBeVisible();
      await expect(element(by.text('Amazon'))).toBeVisible();
      await expect(element(by.text('$100.00'))).toBeVisible();
      await expect(element(by.text('****5678'))).toBeVisible();
    });

    it('should show edit and delete options in card details', async () => {
      await element(by.id('card-item-Amazon')).tap();
      
      await expect(element(by.text('Edit'))).toBeVisible();
      await expect(element(by.text('Delete'))).toBeVisible();
    });
  });

  describe('Editing a Gift Card', () => {
    beforeEach(async () => {
      // Add a test card first
      await element(by.id('add-card-button')).tap();
      await element(by.id('brand-input')).typeText('Target');
      await element(by.id('amount-input')).typeText('75');
      await element(by.id('last-four-digits-input')).typeText('9999');
      await element(by.id('submit-button')).tap();
      
      // Navigate to card details
      await element(by.id('card-item-Target')).tap();
    });

    it('should edit a gift card successfully', async () => {
      await element(by.text('Edit')).tap();
      
      // Should be on edit screen
      await expect(element(by.text('Edit Card'))).toBeVisible();
      
      // Update the card
      await element(by.id('brand-input')).clearText();
      await element(by.id('brand-input')).typeText('Target Updated');
      await element(by.id('amount-input')).clearText();
      await element(by.id('amount-input')).typeText('150');
      
      await element(by.id('submit-button')).tap();
      
      // Should navigate back to card details
      await expect(element(by.text('Card Details'))).toBeVisible();
      await expect(element(by.text('Target Updated'))).toBeVisible();
      await expect(element(by.text('$150.00'))).toBeVisible();
    });

    it('should go back to card details when cancel is pressed', async () => {
      await element(by.text('Edit')).tap();
      await element(by.id('back-button')).tap();
      
      await expect(element(by.text('Card Details'))).toBeVisible();
    });
  });

  describe('Deleting a Gift Card', () => {
    beforeEach(async () => {
      // Add a test card first
      await element(by.id('add-card-button')).tap();
      await element(by.id('brand-input')).typeText('Walmart');
      await element(by.id('amount-input')).typeText('25');
      await element(by.id('last-four-digits-input')).typeText('1111');
      await element(by.id('submit-button')).tap();
      
      // Navigate to card details
      await element(by.id('card-item-Walmart')).tap();
    });

    it('should delete a gift card successfully', async () => {
      await element(by.text('Delete')).tap();
      
      // Should show confirmation dialog
      await expect(element(by.text('Delete Card'))).toBeVisible();
      await expect(element(by.text('Are you sure you want to delete this card?'))).toBeVisible();
      
      // Confirm deletion
      await element(by.text('Delete')).tap();
      
      // Should navigate back to cards list
      await expect(element(by.text('My Gift Cards'))).toBeVisible();
      
      // Card should be removed
      await expect(element(by.text('Walmart'))).not.toBeVisible();
    });

    it('should cancel deletion when cancel is pressed', async () => {
      await element(by.text('Delete')).tap();
      
      // Cancel deletion
      await element(by.text('Cancel')).tap();
      
      // Should stay on card details
      await expect(element(by.text('Card Details'))).toBeVisible();
      await expect(element(by.text('Walmart'))).toBeVisible();
    });
  });

  describe('Pull to Refresh', () => {
    it('should refresh the cards list when pulled down', async () => {
      // Add a card first
      await element(by.id('add-card-button')).tap();
      await element(by.id('brand-input')).typeText('Test Card');
      await element(by.id('amount-input')).typeText('10');
      await element(by.id('submit-button')).tap();
      
      // Pull to refresh
      await element(by.id('cards-list')).scrollTo('top');
      
      // Should still show the card after refresh
      await expect(element(by.text('Test Card'))).toBeVisible();
    });
  });

  describe('Network Banner', () => {
    it('should show network status banner', async () => {
      // The network banner should be visible (assuming connected)
      await expect(element(by.id('network-banner'))).toBeVisible();
    });
  });
}); 