import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import { addCard } from '../redux/slices/cardsSlice';
import { GiftCard } from '../types';
import { Text, TextInput, Button } from './index';

interface AddCardFormProps {
  initialData?: GiftCard;
  onSubmit?: (card: GiftCard) => void;
  isEditing?: boolean;
}

const AddCardForm = ({
  initialData,
  onSubmit,
  isEditing = false,
}: AddCardFormProps) => {
  const [formData, setFormData] = useState<Omit<GiftCard, 'id'>>({
    brand: '',
    amount: '',
    expiryDate: new Date().toISOString(),
    lastFourDigits: '',
    notes: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (initialData) {
      setFormData({
        brand: initialData.brand,
        amount: initialData.amount.toString(),
        expiryDate: initialData.expiryDate,
        lastFourDigits: initialData.lastFourDigits || '',
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (isNaN(Number(formData.amount)))
      newErrors.amount = 'Amount must be a number';
    if (Number(formData.amount) <= 0)
      newErrors.amount = 'Amount must be positive';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    else if (new Date(formData.expiryDate) < new Date())
      newErrors.expiryDate = 'Expiry date must be in the future';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newCard: GiftCard = {
        ...formData,
        id: isEditing && initialData ? initialData.id : (uuid.v4() as string),
        amount: parseFloat(formData.amount as string),
      };

      if (onSubmit) {
        onSubmit(newCard); // Use custom handler if provided
      } else {
        dispatch(addCard(newCard)); // Default behavior
        navigation.goBack();
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        expiryDate: selectedDate.toISOString(),
      }));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Brand"
        style={[styles.input, { width: '100%' }]}
        placeholder="e.g. Amazon, Walmart"
        value={formData.brand}
        icon="store"
        onChangeText={text => handleChange('brand', text)}
        placeholderTextColor="#999"
        error={errors.brand}
        testId="brand-input"
      />

      <TextInput
        label="Amount"
        style={[styles.input, { width: '100%' }]}
        placeholder="e.g. 50.00"
        keyboardType="decimal-pad"
        value={formData.amount as string}
        onChangeText={text => handleChange('amount', text)}
        placeholderTextColor="#999"
        icon="decimal"
        error={errors.amount}
        testId="amount-input"
      />
      <Text variant="titleMedium" style={styles.label}>
        Choose date
      </Text>
      <Button
        icon="calendar"
        title={
          formData.expiryDate
            ? new Date(formData.expiryDate).toLocaleDateString()
            : 'Select a date'
        }
        onPress={() => setShowDatePicker(true)}
        style={[styles.dateInput, errors.expiryDate && styles.errorBorder]}
        textStyle={{
          color: formData.expiryDate ? '#333' : '#999',
          fontSize: 16,
          marginLeft: 8,
        }}
        iconStyle={{ color: '#6200ee' }}
      />
      {errors.expiryDate && (
        <Text style={styles.errorText}>{errors.expiryDate}</Text>
      )}

      <TextInput
        label="Last 4 Digits (Optional)"
        style={[styles.input, { width: '100%' }]}
        placeholder="1234"
        value={formData.lastFourDigits as string}
        onChangeText={text => handleChange('lastFourDigits', text)}
        keyboardType="number-pad"
        maxLength={4}
        placeholderTextColor="#999"
        icon="credit-card"
        testId="last-four-digits-input"
      />

      <TextInput
        label="Notes (Optional)"
        style={[styles.input, { height: 80, width: '100%' }]}
        placeholder="Any additional information"
        value={formData.notes as string}
        onChangeText={text => handleChange('notes', text)}
        multiline
        placeholderTextColor="#999"
        icon="evernote"
        testId="notes-input"
      />

      {Platform.OS === 'ios' ? (
        <Modal visible={showDatePicker} transparent animationType="slide">
          <View style={styles.dateModal}>
            <View style={{ backgroundColor: '#fff', padding: 20 }}>
              <DateTimePicker
                value={new Date(formData.expiryDate)}
                mode="date"
                display="spinner"
                onChange={onChangeDate}
                minimumDate={new Date()}
                accentColor="#6200ee"
              />
              <Button
                title="Done"
                style={styles.submitButton}
                onPress={() => setShowDatePicker(false)}
                textStyle={styles.submitButtonText}
              />
            </View>
          </View>
        </Modal>
      ) : (
        showDatePicker && (
          <DateTimePicker
            value={new Date(formData.expiryDate)}
            mode="date"
            display="default"
            onChange={onChangeDate}
            minimumDate={new Date()}
            accentColor="#6200ee"
          />
        )
      )}

      <Button
        icon="content-save"
        title="Save Gift Card"
        onPress={handleSubmit}
        style={styles.submitButton}
        textStyle={styles.submitButtonText}
        testId="submit-button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  dateModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  errorBorder: {
    borderColor: '#d32f2f',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 4,
  },
  dateInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    color: '#333',
    marginBottom: 16,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 4,
    marginTop: 20,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Roboto-Bold',
  },
});

export default AddCardForm;
