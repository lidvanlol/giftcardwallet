import '@testing-library/jest-native/extend-expect';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
   
  }));

  jest.mock('@react-native-community/netinfo', () => ({
    addEventListener: jest.fn(),
    fetch: jest.fn(() => Promise.resolve({
      isConnected: true,
      isInternetReachable: true,
    })),
  }));

  jest.mock('redux-persist', () => {
    const real = jest.requireActual('redux-persist');
    return {
      ...real,
      persistStore: jest.fn().mockImplementation(() => ({
        persist: {
           
        },
        purge: jest.fn(),
        flush: jest.fn(),
      })),
      persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
    };
  });

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
}));