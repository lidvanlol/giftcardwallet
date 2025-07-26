import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import AddCardForm from '../components/AddCardForm';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const AddCardScreen = () => {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Add New Card" onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <AddCardForm />
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
    padding: 16,
  },
});

export default AddCardScreen;
