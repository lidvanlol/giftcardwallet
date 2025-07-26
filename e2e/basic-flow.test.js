const { by, device, element, expect } = require('detox');

describe('Basic App Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should show empty state on app launch', async () => {
    await expect(element(by.text('My Gift Cards'))).toBeVisible();
    await expect(element(by.text('No gift cards yet'))).toBeVisible();
    await expect(
      element(by.text('Tap the + button to add your first gift card')),
    ).toBeVisible();
  });

  it('should navigate to add card screen', async () => {
    await element(by.id('add-card-button')).tap();
    await expect(element(by.text('Add New Card'))).toBeVisible();
  });

  it('should add a new gift card', async () => {
    // Navigate to add card screen
    await element(by.id('add-card-button')).tap();

    // Fill in the form
    await element(by.id('brand-input')).typeText('Test Brand');
    await element(by.id('amount-input')).typeText('25');
    await element(by.id('last-four-digits-input')).typeText('1234');

    // Submit the form
    await element(by.id('submit-button')).tap();

    // Should be back on cards list
    await expect(element(by.text('My Gift Cards'))).toBeVisible();

    // Should show the new card
    await expect(element(by.text('Test Brand'))).toBeVisible();
    await expect(element(by.text('$25.00'))).toBeVisible();
  });

  it('should show validation errors for empty form', async () => {
    await element(by.id('add-card-button')).tap();
    await element(by.id('submit-button')).tap();

    await expect(element(by.text('Brand is required'))).toBeVisible();
    await expect(element(by.text('Amount is required'))).toBeVisible();
  });

  it('should navigate back from add card screen', async () => {
    await element(by.id('add-card-button')).tap();
    await element(by.id('back-button')).tap();

    await expect(element(by.text('My Gift Cards'))).toBeVisible();
  });
});
