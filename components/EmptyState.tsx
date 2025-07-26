import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Button from './Button';

interface EmptyStateProps {
  iconName?: string;
  title?: string;
  subtitle?: string;

  onPress?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  iconName = 'card-giftcard',
  title = 'No gift cards yet',
  subtitle = 'Tap the + button to add your first gift card',

  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    onPress ? onPress() : navigation.navigate('AddCard');
  };

  return (
    <View style={styles.container}>
      <Icon name={iconName} size={60} color="#ccc" style={styles.icon} />
      <Text variant="bodyMedium" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        {subtitle}
      </Text>
      <Button
        title="Add Gift Card"
        icon="plus"
        onPress={handlePress}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',

    marginLeft: 8,
  },
});

export default EmptyState;
