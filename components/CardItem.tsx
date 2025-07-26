import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GiftCard } from '../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatCurrency, formatDate } from '../utils/helpers';
import Text from './Text';

interface CardItemProps {
  card: GiftCard;
}

const CardItem = memo(({ card }: CardItemProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('CardDetail', { cardId: card.id })}
      testID={`card-item-${card.brand}`}
    >
      <View style={styles.brandContainer}>
        <Icon name="wallet-giftcard" size={24} color="#6200ee" />
        <Text variant="bodyMedium" style={styles.brand}>
          {card.brand}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text variant="titleMedium" style={styles.amount}>
          {formatCurrency(Number(card.amount))}
        </Text>
        <Text variant="bodySmall" style={styles.expiry}>
          Exp: {formatDate(card.expiryDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

// Custom comparison function for memo
const areEqual = (prevProps: CardItemProps, nextProps: CardItemProps) => {
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.card.brand === nextProps.card.brand &&
    prevProps.card.amount === nextProps.card.amount &&
    prevProps.card.expiryDate === nextProps.card.expiryDate
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    fontSize: 20,
    color: '#111',
    marginLeft: 10,
  },
  detailsContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    color: '#6200ee',
  },
  expiry: {
    fontSize: 16,
    color: '#666',
  },
});

export default memo(CardItem, areEqual);
