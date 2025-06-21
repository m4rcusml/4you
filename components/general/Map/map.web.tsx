import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Este componente será renderizado na web
export default function Map() {
  return (
    <View style={styles.webPlaceholder}>
      <Text style={styles.webPlaceholderText}>
        O mapa não está disponível na web.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  webPlaceholderText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  webPlaceholderSubText: {
    fontSize: 14,
    color: '#999',
  },
});