import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GiftCard } from '../../types';

interface CardsState {
  cards: GiftCard[];
}

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<GiftCard>) => {
      state.cards.push(action.payload);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    setCards: (state, action: PayloadAction<GiftCard[]>) => {
      state.cards = action.payload;
    },
    updateCard: (state, action: PayloadAction<GiftCard>) => {
      const index = state.cards.findIndex(
        card => card.id === action.payload.id,
      );
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
  },
});

export const { addCard, removeCard, setCards, updateCard } = cardsSlice.actions;
export default cardsSlice.reducer;
