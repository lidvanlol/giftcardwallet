import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';
interface ButtonProps {
  title?: string;
  onPress: () => void;
  icon?: string;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: StyleProp<ViewStyle>;
  iconStyle?: TextStyle;
  testId?: string;
}

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  icon,
  iconStyle,
  disabled = false,
  testId,
}: ButtonProps) => {
  const isIconOnly = !!icon && !title;
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      testID={testId}
    >
      <View
        style={[styles.buttonContent, isIconOnly && styles.iconOnlyContent]}
      >
        {icon && (
          <Icon
            name={icon}
            size={20}
            color="#fff"
            style={[styles.icon, isIconOnly && styles.iconOnly, iconStyle]}
          />
        )}
        {title ? (
          <Text variant="bodySmall" style={textStyle}>
            {title}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 4,
    elevation: 2,
  },
  disabled: {
    backgroundColor: '#999',
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconOnlyContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  iconOnly: {
    marginRight: 0,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default Button;
