import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../Images/Logo/logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.textWhite}>Trust. </Text>
          <Text style={styles.textGold}>Growth. </Text>
          <Text style={styles.textWhite}>Prosperity.</Text>
        </View>

        <View style={styles.divider} />

        <ActivityIndicator
          size="large"
          color={AppTheme.colors.accent}
          style={styles.loader}
        />

        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: scaleV(50),
  },
  logo: {
    width: scaleH(220),
    height: scaleH(220),
    marginBottom: scaleV(80),
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: scaleV(10),
  },
  textWhite: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  textGold: {
    color: '#FFB800', // Gold color matching "Growth"
    fontSize: scaleF(14),
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  divider: {
    width: scaleH(100),
    height: 1,
    backgroundColor: '#FFB800',
    opacity: 0.6,
    marginBottom: scaleV(40),
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  loader: {
    marginBottom: scaleV(10),
  },
  loadingText: {
    color: '#A0A5B5', // Subtle white/grey for loading text
    fontSize: scaleF(12),
    fontWeight: '400',
  }
});
