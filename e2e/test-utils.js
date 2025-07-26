const { by, element, expect } = require('detox');

// Helper function to wait for element to be visible
const waitForElement = async (testId, timeout = 5000) => {
  await expect(element(by.id(testId))).toBeVisible(timeout);
};

// Helper function to tap element by test ID
const tapElement = async testId => {
  await element(by.id(testId)).tap();
};

// Helper function to type text into input
const typeText = async (testId, text) => {
  await element(by.id(testId)).typeText(text);
};

// Helper function to clear and type text
const clearAndTypeText = async (testId, text) => {
  await element(by.id(testId)).clearText();
  await element(by.id(testId)).typeText(text);
};

// Helper function to scroll to element
const scrollToElement = async (testId, direction = 'down') => {
  await element(by.id(testId)).scrollTo(direction);
};

// Helper function to check if element exists
const elementExists = async testId => {
  try {
    await expect(element(by.id(testId))).toBeVisible();
    return true;
  } catch {
    return false;
  }
};

// Helper function to add a test card
const addTestCard = async (
  brand,
  amount,
  lastFourDigits = '1234',
  notes = '',
) => {
  await tapElement('add-card-button');
  await typeText('brand-input', brand);
  await typeText('amount-input', amount);
  await typeText('last-four-digits-input', lastFourDigits);
  if (notes) {
    await typeText('notes-input', notes);
  }
  await tapElement('submit-button');
};

// Helper function to delete all cards (by going to each card and deleting)
const deleteAllCards = async () => {
  // This is a simplified version - in a real app you might want to clear storage
  // For now, we'll just navigate back to the main screen
  await element(by.text('My Gift Cards')).tap();
};

module.exports = {
  waitForElement,
  tapElement,
  typeText,
  clearAndTypeText,
  scrollToElement,
  elementExists,
  addTestCard,
  deleteAllCards,
};
