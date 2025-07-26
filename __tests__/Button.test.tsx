import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../components/Button';

test('calls onPress when pressed', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button title="Click me" onPress={onPress} />);
  fireEvent.press(getByText('Click me'));
  expect(onPress).toHaveBeenCalled();
});
