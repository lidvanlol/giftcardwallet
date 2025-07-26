import React from 'react';
import { render } from '@testing-library/react-native';
import NetworkBanner from '../components/NetworkBanner';

// Mock the useNetworkStatus hook
jest.mock('../hooks/useNetworkStatus', () => ({
  useNetworkStatus: jest.fn(),
}));

describe('NetworkBanner', () => {
  const mockUseNetworkStatus =
    require('../hooks/useNetworkStatus').useNetworkStatus;

  test('renders nothing when online', () => {
    mockUseNetworkStatus.mockReturnValue(true);

    const { queryByTestId } = render(<NetworkBanner />);

    expect(queryByTestId('network-banner')).toBeNull();
  });

  test('renders banner when offline', () => {
    mockUseNetworkStatus.mockReturnValue(false);

    const { getByTestId, getByText } = render(<NetworkBanner />);

    expect(getByTestId('network-banner')).toBeTruthy();
    expect(getByText('No internet connection')).toBeTruthy();
  });

  test('displays correct offline message', () => {
    mockUseNetworkStatus.mockReturnValue(false);

    const { getByText } = render(<NetworkBanner />);

    expect(getByText('No internet connection')).toBeTruthy();
  });
});
