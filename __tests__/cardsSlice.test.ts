import cardsReducer, {
  addCard,
  updateCard,
  removeCard,
  setCards,
} from '../redux/slices/cardsSlice';
import { GiftCard } from '../types';

describe('Cards Slice', () => {
  const initialState = {
    cards: [],
  };

  const mockCard: GiftCard = {
    id: '1',
    brand: 'Amazon',
    amount: 50,
    expiryDate: '2024-12-31T00:00:00.000Z',
    lastFourDigits: '1234',
    notes: 'Test card',
  };

  const mockCard2: GiftCard = {
    id: '2',
    brand: 'Starbucks',
    amount: 25,
    expiryDate: '2024-06-15T00:00:00.000Z',
    lastFourDigits: '5678',
    notes: '',
  };

  describe('addCard', () => {
    test('adds a new card to empty state', () => {
      const action = addCard(mockCard);
      const newState = cardsReducer(initialState, action);

      expect(newState.cards).toHaveLength(1);
      expect(newState.cards[0]).toEqual(mockCard);
    });

    test('adds a new card to existing cards', () => {
      const stateWithCard = {
        cards: [mockCard],
      };

      const action = addCard(mockCard2);
      const newState = cardsReducer(stateWithCard, action);

      expect(newState.cards).toHaveLength(2);
      expect(newState.cards).toContainEqual(mockCard);
      expect(newState.cards).toContainEqual(mockCard2);
    });
  });

  describe('updateCard', () => {
    test('updates an existing card', () => {
      const stateWithCard = {
        cards: [mockCard],
      };

      const updatedCard = {
        ...mockCard,
        brand: 'Amazon Updated',
        amount: 75,
      };

      const action = updateCard(updatedCard);
      const newState = cardsReducer(stateWithCard, action);

      expect(newState.cards).toHaveLength(1);
      expect(newState.cards[0]).toEqual(updatedCard);
    });

    test('does not update non-existent card', () => {
      const stateWithCard = {
        cards: [mockCard],
      };

      const nonExistentCard = {
        ...mockCard2,
        id: 'non-existent',
      };

      const action = updateCard(nonExistentCard);
      const newState = cardsReducer(stateWithCard, action);

      expect(newState.cards).toHaveLength(1);
      expect(newState.cards[0]).toEqual(mockCard);
    });
  });

  describe('removeCard', () => {
    test('removes an existing card', () => {
      const stateWithCards = {
        cards: [mockCard, mockCard2],
      };

      const action = removeCard('1');
      const newState = cardsReducer(stateWithCards, action);

      expect(newState.cards).toHaveLength(1);
      expect(newState.cards[0]).toEqual(mockCard2);
    });

    test('does not remove non-existent card', () => {
      const stateWithCard = {
        cards: [mockCard],
      };

      const action = removeCard('non-existent');
      const newState = cardsReducer(stateWithCard, action);

      expect(newState.cards).toHaveLength(1);
      expect(newState.cards[0]).toEqual(mockCard);
    });
  });

  describe('setCards', () => {
    test('sets cards array', () => {
      const cards = [mockCard, mockCard2];
      const action = setCards(cards);
      const newState = cardsReducer(initialState, action);

      expect(newState.cards).toEqual(cards);
    });

    test('replaces existing cards', () => {
      const stateWithCard = {
        cards: [mockCard],
      };

      const newCards = [mockCard2];
      const action = setCards(newCards);
      const newState = cardsReducer(stateWithCard, action);

      expect(newState.cards).toEqual(newCards);
    });
  });

  describe('initial state', () => {
    test('returns initial state for unknown action', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      const newState = cardsReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });
});
