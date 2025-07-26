import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Header from '../components/Header';

describe('Header', () => {
  const mockOnBackPress = jest.fn();
  const mockRightAction = {
    icon: 'edit',
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders title correctly', () => {
    const { getByText } = render(
      <Header title="Test Header" onBackPress={mockOnBackPress} />
    );
    
    expect(getByText('Test Header')).toBeTruthy();
  });

  test('calls onBackPress when back button is pressed', () => {
    const { getByTestId } = render(
      <Header title="Test Header" onBackPress={mockOnBackPress} />
    );
    
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    
    expect(mockOnBackPress).toHaveBeenCalled();
  });

  test('renders right action button when provided', () => {
    const { getByTestId } = render(
      <Header
        title="Test Header"
        onBackPress={mockOnBackPress}
        rightAction={mockRightAction}
      />
    );
    
    const editButton = getByTestId('edit-button');
    expect(editButton).toBeTruthy();
  });

  test('calls right action onPress when pressed', () => {
    const { getByTestId } = render(
      <Header
        title="Test Header"
        onBackPress={mockOnBackPress}
        rightAction={mockRightAction}
      />
    );
    
    const editButton = getByTestId('edit-button');
    fireEvent.press(editButton);
    
    expect(mockRightAction.onPress).toHaveBeenCalled();
  });

  test('renders without right action', () => {
    const { getByText, queryByTestId } = render(
      <Header title="Test Header" onBackPress={mockOnBackPress} />
    );
    
    expect(getByText('Test Header')).toBeTruthy();
    expect(queryByTestId('edit-button')).toBeNull();
  });

  test('renders with different title', () => {
    const { getByText } = render(
      <Header title="Different Title" onBackPress={mockOnBackPress} />
    );
    
    expect(getByText('Different Title')).toBeTruthy();
  });
}); 