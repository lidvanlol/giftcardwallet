import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { Theme } from '../theme/theme';

type TypographyVariant = keyof typeof Theme.typography;

interface TextProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: TypographyVariant;
  color?: keyof typeof Theme.colors | string;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Text: React.FC<TextProps> = ({
  children,
  style,
  variant = 'bodyMedium',
  color,
  numberOfLines,
  ellipsizeMode,
}) => {
  // Get the base style from theme
  const baseStyle = Theme.typography[variant];

  // Handle color - either from theme or custom string
  const colorStyle = color
    ? {
        color: Theme.colors[color as keyof typeof Theme.colors] || color,
      }
    : {};

  return (
    <RNText
      style={[baseStyle, colorStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </RNText>
  );
};

export default Text;
