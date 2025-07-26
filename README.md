# Gift Card Wallet 📱

A React Native mobile application for managing gift cards. Keep track of your gift card balances, expiration dates, and never lose another gift card again.

## 🎯 Why This Project?

### Problem
- **Lost Gift Cards**: Physical gift cards get lost, damaged, or forgotten
- **Expired Balances**: No easy way to track expiration dates
- **Scattered Information**: Gift card details are stored in various places
- **No Central Management**: No single app to manage all gift cards

### Solution
- **Digital Storage**: Store all gift card information securely on your device
- **Balance Tracking**: Keep track of remaining balances
- **Expiration Alerts**: Never miss an expiration date
- **Easy Access**: All your gift cards in one place
- **Offline First**: Works without internet connection

## 🏗️ Architecture

### Tech Stack
- **React Native 0.80.1** - Cross-platform mobile development
- **TypeScript** - Type safety and better developer experience
- **Redux Toolkit** - State management
- **React Navigation** - Screen navigation
- **AsyncStorage** - Local data persistence

### Project Structure
```
giftcardwallet/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── redux/             # State management
├── utils/             # Utility functions
├── theme/             # Design system
├── types/             # TypeScript type definitions
├── __tests__/         # Jest unit tests
├── e2e/              # Detox end-to-end tests
└── assets/           # Images, fonts, etc.
```

## 📚 Major Libraries Used

### Core Framework
- **React Native 0.80.1** - Mobile app framework
- **TypeScript 5.0+** - Type-safe JavaScript

### State Management
- **@reduxjs/toolkit** - Redux state management
- **react-redux** - React bindings for Redux

### Navigation
- **@react-navigation/native** - Navigation library
- **@react-navigation/stack** - Stack navigator
- **react-native-screens** - Native navigation primitives
- **react-native-safe-area-context** - Safe area handling

### UI & Styling
- **react-native-vector-icons** - Icon library (MaterialCommunityIcons)
- **react-native-gesture-handler** - Touch handling
- **react-native-reanimated** - Animation library

### Data Persistence
- **@react-native-async-storage/async-storage** - Local storage

### Development Tools
- **Metro** - JavaScript bundler
- **Babel** - JavaScript compiler
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Testing
- **Jest** - Unit testing framework
- **@testing-library/react-native** - React Native testing utilities
- **Detox** - End-to-end testing

### Build & Development
- **React Native CLI** - Development tools
- **CocoaPods** - iOS dependency management
- **Gradle** - Android build system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd giftcardwallet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on iOS**
   ```bash
   npm run ios
   ```

6. **Run on Android**
   ```bash
   npm run android
   ```

   7. **Before pushing to github do validation this will check for lint,format,tsc errors**
   ```bash
   npm run validate
   ```


## 🧪 Testing

### Unit Tests
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests (Detox)
```bash
# Build for testing
npm run detox:build

# Run E2E tests
npm run detox:test

# Run simple E2E tests
npm run test:e2e:simple
```

## 📱 Features

### Core Features
- ✅ **Add Gift Cards** - Store card details, amounts, and expiration dates
- ✅ **View Card List** - See all your gift cards in one place
- ✅ **Card Details** - View detailed information for each card
- ✅ **Edit Cards** - Update card information
- ✅ **Delete Cards** - Remove cards you no longer have
- ✅ **Offline Support** - Works without internet connection

### UI Features
- ✅ **Modern Design** - Clean, intuitive interface
- ✅ **Dark/Light Theme** - Adaptive theming
- ✅ **Responsive Layout** - Works on different screen sizes
- ✅ **Loading States** - Smooth user experience
- ✅ **Error Handling** - Graceful error management

### Data Management
- ✅ **Local Storage** - Data stored securely on device
- ✅ **Data Validation** - Input validation and error messages
- ✅ **Data Persistence** - Data survives app restarts

## 🎨 Design System

### Colors
- **Primary**: `#6200ee` (Purple)
- **Background**: `#f5f5f5` (Light Gray)
- **Surface**: `#ffffff` (White)
- **Error**: `#b00020` (Red)

### Typography
- **Headline Large**: 32px, Bold
- **Headline Medium**: 24px, SemiBold
- **Body Large**: 16px, Regular
- **Body Medium**: 14px, Regular
- **Body Small**: 12px, Regular

### Components
- **Button** - Primary, secondary, and icon buttons
- **TextInput** - Form inputs with validation
- **Card** - Gift card display component
- **Header** - Navigation header with back button
- **EmptyState** - Empty state messaging

## 🔧 Development

### Code Style
- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for code formatting
- **Component-based architecture**

### State Management
- **Redux Toolkit** for global state
- **Local component state** for UI state
- **AsyncStorage** for persistence

### Navigation
- **Stack Navigator** for screen navigation
- **Type-safe navigation** with TypeScript
- **Header customization** per screen

## 📦 Build & Deploy

### iOS
```bash
# Build for iOS
cd ios
xcodebuild -workspace giftcardwallet.xcworkspace -scheme giftcardwallet -configuration Release
```

### Android
```bash
# Build for Android
cd android
./gradlew assembleRelease
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native** community for the amazing framework
- **Material Design** for design inspiration
- **React Navigation** for excellent navigation library
- **Redux Toolkit** for simplified state management

---

**Built with ❤️ using React Native**
