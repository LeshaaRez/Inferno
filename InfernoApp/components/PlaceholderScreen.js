import React from 'react';
import { View, StyleSheet } from 'react-native';

const PlaceholderScreen = () => (
  <View style={styles.container} />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaceholderScreen;
