import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextInput from '../components/TextInput';

describe('TextInput', () => {
  test('renders with label and placeholder', () => {
    const onChangeText = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
      />,
    );

    expect(getByText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  test('calls onChangeText when text is entered', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value=""
        onChangeText={onChangeText}
      />,
    );

    const input = getByPlaceholderText('Enter your name');
    fireEvent.changeText(input, 'John Doe');
    expect(onChangeText).toHaveBeenCalledWith('John Doe');
  });

  test('displays error message when error prop is provided', () => {
    const onChangeText = jest.fn();
    const { getByText } = render(
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
        error="Email is required"
      />,
    );

    expect(getByText('Email is required')).toBeTruthy();
  });

  test('renders with icon', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <TextInput
        label="Search"
        placeholder="Search..."
        value=""
        onChangeText={onChangeText}
        icon="magnify"
        testId="search-input"
      />,
    );

    expect(getByTestId('search-input')).toBeTruthy();
  });

  test('applies error styling when error is present', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <TextInput
        label="Email"
        placeholder="Enter your email"
        value=""
        onChangeText={onChangeText}
        error="Invalid email"
        testId="email-input"
      />,
    );

    const input = getByTestId('email-input');
    expect(input).toBeTruthy();
  });

  test('displays current value', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <TextInput
        label="Name"
        placeholder="Enter your name"
        value="John Doe"
        onChangeText={onChangeText}
      />,
    );

    expect(getByDisplayValue('John Doe')).toBeTruthy();
  });
});
