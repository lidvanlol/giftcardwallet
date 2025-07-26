import React from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';
import { Theme } from '../theme/theme';
interface TextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  icon?: string;
  [key: string]: any;
  testId?:string;
}

const TextInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  icon,
  testId,
  ...props
}: TextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label} variant="titleMedium">
        {label}
      </Text>
      <View style={[styles.inputContainer, error ? styles.errorBorder : null]}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={Theme.colors.primary}
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={Theme.colors.onSurface}
          {...props}
          testID={testId}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.medium,
  },
  label: {
    fontSize: 14,
    color: Theme.colors.onSecondary,
    marginBottom: Theme.spacing.small,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: Theme.colors.onPrimary,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 8,
  },
  errorBorder: {
    borderColor: Theme.colors.error,
  },
  errorText: {
    color: Theme.colors.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default TextInput;
