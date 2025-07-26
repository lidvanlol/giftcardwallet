import React, { useState, useCallback } from 'react';
import { FlatList, View, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import CardItem from '../components/CardItem';
import EmptyState from '../components/EmptyState';

import { setCards } from '../redux/slices/cardsSlice';
import { loadCards } from '../utils/storage';
import { GiftCard } from '../types';
import { Button } from '../components';

const CardsListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards);
  const [refreshing, setRefreshing] = useState(false);

  // Memoized card data extractor for FlatList
  const keyExtractor = useCallback((item: { id: string }) => item.id, []);

  // Memoized render item for FlatList
  const renderItem = useCallback(
    ({ item }: { item: GiftCard }) => <CardItem card={item} />,
    [],
  );

  // Load cards function with refresh capability
  const loadCardData = useCallback(
    async (isRefreshing = false) => {
      if (isRefreshing) {
        setRefreshing(true);
      }
      try {
        const storedCards = await loadCards();
        if (storedCards) {
          dispatch(setCards(storedCards));
        }
      } catch (error) {
        console.error('Failed to load cards', error);
      } finally {
        if (isRefreshing) {
          setRefreshing(false);
        }
      }
    },
    [dispatch],
  );

  // Load data on initial mount and screen focus
  useFocusEffect(
    useCallback(() => {
      loadCardData();
    }, [loadCardData]),
  );

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    loadCardData(true);
  }, [loadCardData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={cards.length === 0 && styles.emptyList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#6200ee']}
            tintColor="#6200ee"
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        removeClippedSubviews={true}
        testID="cards-list"
      />

      <Button
        icon="plus"
        onPress={() => navigation.navigate('AddCard')}
        style={styles.buttonStyle}
        iconStyle={styles.iconStyle}
        testId="add-card-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    right: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: 0,
  },
  iconStyle: {
    marginRight: 0,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default React.memo(CardsListScreen);
