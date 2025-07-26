import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';
import { Theme } from '../theme/theme';
interface HeaderProps {
  title: string;
  onBackPress: () => void;
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, rightAction }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBackPress}
        style={styles.iconContainer}
        testID="back-button"
      >
        <Icon name="keyboard-backspace" size={24} color="#fff" />
      </TouchableOpacity>

      <Text variant="titleLarge" style={styles.title}>
        {title}
      </Text>

      {rightAction ? (
        <TouchableOpacity
          onPress={rightAction.onPress}
          style={styles.iconContainer}
          testID="edit-button"
        >
          <Icon name={rightAction.icon} size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconContainer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.primary,
    padding: Theme.spacing.medium,
    paddingTop: Platform.OS === 'android' ? 25 : 70, // Adds extra padding for status bar
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: Theme.colors.surface,
  },
});

export default Header;
