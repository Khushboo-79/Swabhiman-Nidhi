import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export const SplashScreen = ({ navigation }: any) => {
  const theme = useTheme();

  useEffect(() => {
    // Simulate loading time (e.g., verifying tokens)
    const timer = setTimeout(() => {
      navigation.replace('MobileVerify'); // Route to next screen based on logic later
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.logoContainer}>
        {/* Placeholder for the large golden 'S' logo */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>S</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.tagline, { color: theme.text }]}>
          Trust. <Text style={{ color: theme.accent }}>Growth.</Text> Prosperity.
        </Text>
        <ActivityIndicator size="small" color={theme.accent} style={{ marginTop: 20 }} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EDBF47',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#EDBF47',
    fontStyle: 'italic',
  },
  footer: {
    paddingBottom: 50,
    alignItems: 'center',
  },
  tagline: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 12,
  },
});
