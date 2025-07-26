import { expect as detoxExpect } from 'detox';

detoxExpect.extend({
  toBeVisibleWithText(element, expectedText) {
    return {
      pass:
        element.isVisible() &&
        element.getText().then(text => text.includes(expectedText)),
      message: () =>
        `Expected element to be visible with text "${expectedText}"`,
    };
  },
});
