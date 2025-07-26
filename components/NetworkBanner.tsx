import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Theme } from '../theme/theme';

const NetworkBanner = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <View
      style={[styles.banner, { backgroundColor: Theme.colors.error }]}
      testID="network-banner"
    >
      <Text style={styles.text}>No internet connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Theme.colors.onError,
    fontSize: 12,
    fontFamily: Theme.typography.labelMedium.fontFamily,
  },
});

export default NetworkBanner;
