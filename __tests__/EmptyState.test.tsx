import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import EmptyState from '../components/EmptyState';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('EmptyState', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  test('renders with default props', () => {
    const { getByText } = render(<EmptyState />);

    expect(getByText('No gift cards yet')).toBeTruthy();
    expect(
      getByText('Tap the + button to add your first gift card'),
    ).toBeTruthy();
    expect(getByText('Add Gift Card')).toBeTruthy();
  });

  test('renders with custom props', () => {
    const customProps = {
      title: 'No items found',
      subtitle: 'Try adding some items',
      iconName: 'package-variant',
    };

    const { getByText } = render(<EmptyState {...customProps} />);

    expect(getByText('No items found')).toBeTruthy();
    expect(getByText('Try adding some items')).toBeTruthy();
  });

  test('navigates to AddCard when button is pressed', () => {
    const { getByText } = render(<EmptyState />);

    const addButton = getByText('Add Gift Card');
    fireEvent.press(addButton);

    expect(mockNavigate).toHaveBeenCalledWith('AddCard');
  });

  test('calls custom onPress when provided', () => {
    const customOnPress = jest.fn();
    // Reset the mock before rendering to clear any initialization calls
    mockNavigate.mockClear();

    const { getByText } = render(<EmptyState onPress={customOnPress} />);

    const addButton = getByText('Add Gift Card');
    fireEvent.press(addButton);

    expect(customOnPress).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('renders with custom icon', () => {
    const { getByText } = render(<EmptyState iconName="wallet" />);

    expect(getByText('No gift cards yet')).toBeTruthy();
  });
});
