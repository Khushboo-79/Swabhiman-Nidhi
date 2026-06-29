import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoginScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppTheme.colors.background,
  },
  text: {
    color: AppTheme.colors.primary,
    fontSize: AppTheme.typography.h2,
    fontWeight: 'bold',
  },
});
