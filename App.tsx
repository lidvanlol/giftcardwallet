import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import LoadingIndicator from './components/LoadingIndicator';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { navigationTheme } from './navigation/theme';
import { NetworkBanner } from './components';
import { Theme } from './theme/theme';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar
            backgroundColor={Theme.colors.primary}
            barStyle="light-content"
          />
          <NetworkBanner />
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
