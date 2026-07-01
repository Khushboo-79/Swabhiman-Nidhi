import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const BiometricScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Top Header Section */}
      <View style={styles.topSection}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Svg width={scaleH(24)} height={scaleV(24)} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <Polyline points="15 18 9 12 15 6" />
          </Svg>
        </TouchableOpacity>

        {/* Titles */}
        <Text style={styles.title}>
          Enable Biometric{'\n'}login?
        </Text>
        <Text style={styles.subtitle}>
          Login quickly and securely using{'\n'}your fingerprint
        </Text>
      </View>

      {/* Center Image/Icon */}
      <View style={styles.centerSection}>
        <View style={styles.iconCircleContainer}>
          {/* Golden Gradient Background */}
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="circleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#FDE863" />
                  <Stop offset="100%" stopColor="#BB8E20" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#circleGrad)" rx={scaleH(80)} />
            </Svg>
          </View>

          {/* Fingerprint Image */}
          <Image
            source={require('../../Images/bgImages/fingerprint.webp')}
            style={{ width: scaleH(80), height: scaleH(80), resizeMode: 'contain' }}
          />
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomSection}>
        <View style={[styles.enableButton, { overflow: 'hidden', backgroundColor: 'transparent', paddingVertical: 0 }]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                  <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#btnGrad)" rx={scaleH(12)} />
            </Svg>
          </View>
          <TouchableOpacity
            style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.8}
            onPress={() => {
              // Setup Biometrics
              navigation.navigate('Login'); // or next flow
            }}
          >
            <Text style={[styles.enableButtonText, { color: '#000000' }]}>Enable Fingerprint</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.notNowButton}
          activeOpacity={0.7}
          onPress={() => {
            // Skip Biometrics
            navigation.navigate('Login'); // or next flow
          }}
        >
          <Text style={styles.notNowButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background, // Deep Navy (#041537)
  },
  topSection: {
    paddingHorizontal: scaleH(20),
    paddingTop: scaleV(20),
  },
  backButton: {
    marginBottom: scaleV(35),
  },
  title: {
    color: '#FFFFFF',
    fontSize: scaleF(26),
    fontWeight: '600',
    marginBottom: scaleV(15),
    lineHeight: scaleV(34),
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '400',
    lineHeight: scaleV(20),
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleContainer: {
    width: scaleH(160),
    height: scaleH(160),
    borderRadius: scaleH(80),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bottomSection: {
    paddingHorizontal: scaleH(20),
    paddingBottom: scaleV(30),
    alignItems: 'center',
  },
  enableButton: {
    width: '100%',
    height: scaleV(50),
    borderRadius: scaleH(12),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: scaleV(20),
  },
  enableButtonText: {
    color: '#000000ff',
    fontSize: scaleF(18),
    fontWeight: '500',
  },
  notNowButton: {
    paddingVertical: scaleV(10),
  },
  notNowButtonText: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: '500',
  },
});
