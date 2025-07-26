const { by, device, element, expect } = require('detox');

describe('Simple App Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show the main screen', async () => {
    // Wait for the app to load
    await device.waitForActive();

    // Check if the main screen is visible
    await expect(element(by.text('My Gift Cards'))).toBeVisible();
  });

  it('should show empty state', async () => {
    await device.waitForActive();

    // Check for empty state text
    await expect(element(by.text('No gift cards yet'))).toBeVisible();
  });

  it('should have add button', async () => {
    await device.waitForActive();

    // Check if add button is present
    await expect(element(by.id('add-card-button'))).toBeVisible();
  });

  it('should navigate to add screen', async () => {
    await device.waitForActive();

    // Tap the add button
    await element(by.id('add-card-button')).tap();

    // Check if we're on the add screen
    await expect(element(by.text('Add New Card'))).toBeVisible();
  });
});
