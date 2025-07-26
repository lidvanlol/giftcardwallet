import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftCard } from '../types';

export const CARDS_KEY = 'giftCards';

export const saveCards = async (cards: GiftCard[]) => {
  try {
    await AsyncStorage.setItem(CARDS_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error('Failed to save cards', error);
    throw error;
  }
};

export const loadCards = async (): Promise<GiftCard[] | null> => {
  try {
    const cardsJson = await AsyncStorage.getItem(CARDS_KEY);
    return cardsJson ? JSON.parse(cardsJson) : null;
  } catch (error) {
    console.error('Failed to load cards', error);
    return null;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem(CARDS_KEY);
  } catch (error) {
    console.error('Failed to clear storage', error);
    throw error;
  }
};
