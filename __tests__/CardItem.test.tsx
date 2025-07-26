import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import CardItem from '../components/CardItem';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('CardItem', () => {
  const mockNavigate = jest.fn();
  const mockCard = {
    id: '1',
    brand: 'Amazon',
    amount: 50,
    expiryDate: '2024-12-31T00:00:00.000Z',
    lastFourDigits: '1234',
    notes: 'Test card',
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  test('renders card information correctly', () => {
    const { getByText } = render(<CardItem card={mockCard} />);

    expect(getByText('Amazon')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
    expect(getByText('Exp: Dec 31, 2024')).toBeTruthy();
  });

  test('navigates to card detail when pressed', () => {
    const { getByTestId } = render(<CardItem card={mockCard} />);

    const cardItem = getByTestId('card-item-Amazon');
    fireEvent.press(cardItem);

    expect(mockNavigate).toHaveBeenCalledWith('CardDetail', { cardId: '1' });
  });

  test('renders with different card data', () => {
    const differentCard = {
      id: '2',
      brand: 'Starbucks',
      amount: 25.5,
      expiryDate: '2024-06-15T00:00:00.000Z',
      lastFourDigits: '5678',
      notes: '',
    };

    const { getByText } = render(<CardItem card={differentCard} />);

    expect(getByText('Starbucks')).toBeTruthy();
    expect(getByText('$25.50')).toBeTruthy();
    expect(getByText('Exp: Jun 15, 2024')).toBeTruthy();
  });

  test('handles card without lastFourDigits', () => {
    const cardWithoutDigits = {
      ...mockCard,
      lastFourDigits: '',
    };

    const { getByText } = render(<CardItem card={cardWithoutDigits} />);

    expect(getByText('Amazon')).toBeTruthy();
    expect(getByText('$50.00')).toBeTruthy();
  });
});
