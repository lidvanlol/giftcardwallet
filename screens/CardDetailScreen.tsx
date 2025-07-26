import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { removeCard } from '../redux/slices/cardsSlice';
import { GiftCard } from '../types';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Text, Button, Header } from '../components';
const CardDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { cardId } = route.params as { cardId: string };

  // Find the card in the Redux store
  const card = useAppSelector(state =>
    state.cards.cards.find(c => c.id === cardId),
  ) as GiftCard;

  const handleDelete = () => {
    Alert.alert(
      'Delete Card',
      `Are you sure you want to delete ${card.brand} gift card?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(removeCard(card.id));
            navigation.goBack();
          },
        },
      ],
    );
  };

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Card not found</Text>
      </View>
    );
  }

  const handleEdit = () => {
    navigation.navigate('EditCard', { card });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Card Details"
        onBackPress={() => navigation.goBack()}
        rightAction={{
          icon: 'square-edit-outline',
          onPress: handleEdit, // This matches the expected type
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Icon name="wallet-giftcard" size={40} color="#6200ee" />
            <Text style={styles.brand} variant="titleLarge">
              {card.brand}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel} variant="titleMedium">
              Amount:
            </Text>
            <Text style={styles.detailValue} variant="bodySmall">
              {formatCurrency(Number(card.amount))}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel} variant="titleMedium">
              Expires:
            </Text>
            <Text style={styles.detailValue} variant="bodySmall">
              {formatDate(card.expiryDate)}
            </Text>
          </View>

          {card.lastFourDigits && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel} variant="titleMedium">
                Card Number:
              </Text>
              <Text style={styles.detailValue} variant="bodySmall">
                •••• {card.lastFourDigits}
              </Text>
            </View>
          )}

          {card.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.detailLabel} variant="titleMedium">
                Notes:
              </Text>
              <Text style={styles.notesText} variant="bodySmall">
                {card.notes}
              </Text>
            </View>
          )}
        </View>

        <Button
          title="Delete Card"
          icon="delete"
          onPress={handleDelete}
          style={styles.deleteButton}
          textStyle={styles.deleteButtonText}
          testId="delete-button"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  brand: {
    fontSize: 22,
    paddingTop: 5,
    marginLeft: 15,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notesContainer: {
    marginTop: 10,
  },
  notesText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  deleteButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CardDetailScreen;
