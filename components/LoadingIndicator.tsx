import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Theme } from '../theme/theme';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={Theme.colors.primary}
        testID="loading-indicator"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
  },
});

export default LoadingIndicator;
