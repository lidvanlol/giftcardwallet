import React from 'react';
import { render } from '@testing-library/react-native';
import Text from '../components/Text';

describe('Text', () => {
  test('renders with default variant', () => {
    const { getByText } = render(<Text>Hello World</Text>);

    expect(getByText('Hello World')).toBeTruthy();
  });

  test('renders with different variants', () => {
    const { getByText } = render(
      <Text variant="headlineLarge">Large Headline</Text>,
    );

    expect(getByText('Large Headline')).toBeTruthy();
  });

  test('renders with custom style', () => {
    const customStyle = { color: 'red' };
    const { getByText } = render(<Text style={customStyle}>Styled Text</Text>);

    expect(getByText('Styled Text')).toBeTruthy();
  });

  test('renders with different text content', () => {
    const { getByText } = render(<Text>Different content</Text>);

    expect(getByText('Different content')).toBeTruthy();
  });

  test('renders with bodyMedium variant', () => {
    const { getByText } = render(
      <Text variant="bodyMedium">Medium body text</Text>,
    );

    expect(getByText('Medium body text')).toBeTruthy();
  });

  test('renders with bodySmall variant', () => {
    const { getByText } = render(
      <Text variant="bodySmall">Small body text</Text>,
    );

    expect(getByText('Small body text')).toBeTruthy();
  });
});
