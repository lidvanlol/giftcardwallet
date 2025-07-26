export interface GiftCard {
  id: string;
  brand: string;
  amount: number | string;
  expiryDate: string;
  lastFourDigits?: string;
  notes?: string;
}

// Extend the default navigation props
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  CardsList: undefined;
  AddCard: undefined;
  CardDetail: { cardId: string };
  EditCard: { card: GiftCard };
};
