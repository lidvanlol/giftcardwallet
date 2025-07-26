import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRoute, RouteProp } from '@react-navigation/native';
import AddCardForm from '../components/AddCardForm';
import { RootStackParamList } from '../types';
import { useDispatch } from 'react-redux';
import { updateCard } from '../redux/slices/cardsSlice';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components';
import { GiftCard } from '../types';

const EditCardScreen = () => {
  const headerHeight = useHeaderHeight();
  const route = useRoute<RouteProp<RootStackParamList, 'EditCard'>>();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSubmit = (updatedCard: GiftCard) => {
    dispatch(updateCard(updatedCard));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Edit Card" onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <AddCardForm
            initialData={route.params.card}
            onSubmit={handleSubmit}
            isEditing={true}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 16,
  },
});

export default EditCardScreen;
