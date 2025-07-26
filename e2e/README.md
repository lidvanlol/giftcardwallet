# Detox E2E Tests

This directory contains end-to-end tests for the Gift Card Wallet app using Detox.

## Test Files

- `app.test.js` - Comprehensive test suite covering all major app flows
- `basic-flow.test.js` - Simple tests for basic functionality
- `test-utils.js` - Helper functions for common test operations

## Prerequisites

1. Make sure you have Detox installed: `npm install -g detox-cli`
2. For iOS: Xcode and iOS Simulator
3. For Android: Android Studio and Android Emulator

## Running Tests

### iOS Simulator

```bash
# Build the app for iOS simulator
npm run detox:build

# Run the tests
npm run detox:test

# Or run both in sequence
npm run test:e2e
```

### Android Emulator

```bash
# Build the app for Android emulator
detox build -c android.emu.debug

# Run the tests
detox test -c android.emu.debug
```

### All Tests

```bash
# Run unit tests and e2e tests
npm run test:all
```

## Test Configuration

The Detox configuration is in `.detoxrc.js` at the root of the project. It includes configurations for:

- iOS Simulator (debug and release)
- Android Emulator (debug and release)
- Android Attached Device (debug and release)

## Test Structure

### Basic Flow Tests (`basic-flow.test.js`)
- App launch and empty state
- Navigation to add card screen
- Adding a new gift card
- Form validation
- Navigation back

### Comprehensive Tests (`app.test.js`)
- All basic flows
- Card details and editing
- Card deletion
- Pull to refresh
- Network banner
- Complex user scenarios

## Test IDs

The following test IDs are used in the components:

- `add-card-button` - Floating action button to add new cards
- `brand-input` - Brand name input field
- `amount-input` - Amount input field
- `last-four-digits-input` - Last 4 digits input field
- `notes-input` - Notes input field
- `submit-button` - Form submit button
- `back-button` - Back navigation button
- `cards-list` - Cards list FlatList
- `card-item-{brand}` - Individual card items
- `edit-button` - Edit card button
- `delete-button` - Delete card button
- `network-banner` - Network status banner

## Troubleshooting

### Common Issues

1. **Simulator not found**: Make sure iOS Simulator is installed and running
2. **Build failures**: Clean the project and rebuild
   ```bash
   cd ios && xcodebuild clean && cd ..
   npm run detox:build
   ```
3. **Test timeouts**: Increase timeout in `.detoxrc.js` if needed
4. **Element not found**: Check that test IDs are properly set in components

### Debug Mode

To run tests in debug mode:

```bash
detox test -c ios.sim.debug --debug-synchronization 200
```

### Logs

Check Detox logs for detailed information:

```bash
detox test -c ios.sim.debug --loglevel trace
```

## Adding New Tests

1. Create a new test file in the `e2e/` directory
2. Use the existing test structure as a template
3. Add necessary test IDs to components
4. Update this README if adding new test IDs

## Best Practices

1. Use descriptive test names
2. Keep tests independent (use `beforeEach` to reset state)
3. Use test IDs instead of text for element selection
4. Add appropriate waits for async operations
5. Test both positive and negative scenarios 