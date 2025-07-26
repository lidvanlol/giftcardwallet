const { by, device, element, expect } = require('detox');

describe('iPhone 16 Pro Tests', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should launch app successfully', async () => {
    // Check if the main screen loads
    await expect(element(by.text('My Gift Cards'))).toBeVisible();
  });

  it('should show empty state', async () => {
    // Check for empty state text
    await expect(element(by.text('No gift cards yet'))).toBeVisible();
  });

  it('should have add button visible', async () => {
    // Check if add button is present
    await expect(element(by.id('add-card-button'))).toBeVisible();
  });

  it('should navigate to add card screen', async () => {
    // Tap the add button
    await element(by.id('add-card-button')).tap();

    // Check if we're on the add card screen
    await expect(element(by.text('Add New Card'))).toBeVisible();
  });

  it('should go back to main screen', async () => {
    // Tap back button
    await element(by.id('back-button')).tap();

    // Check if we're back on main screen
    await expect(element(by.text('My Gift Cards'))).toBeVisible();
  });
});
