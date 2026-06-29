import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Polyline, Path, Defs, LinearGradient, Stop, Rect, Circle as SvgCircle } from 'react-native-svg';
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
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="circleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#FDE863" />
                  <Stop offset="100%" stopColor="#BB8E20" />
                </LinearGradient>
              </Defs>
              <SvgCircle cx="50%" cy="50%" r="50%" fill="url(#circleGrad)" />
            </Svg>
          </View>
          
          <Svg width={scaleH(80)} height={scaleH(80)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <Path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
            <Path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" />
            <Path d="M8.29 12c0-2.05 1.66-3.71 3.71-3.71s3.71 1.66 3.71 3.71" />
            <Path d="M12 12v.01" />
            <Path d="M22 16v-4" />
            <Path d="M2 16v-4" />
            <Path d="M12 22a9.96 9.96 0 0 1-7.07-2.93" />
            <Path d="M19.07 19.07A9.96 9.96 0 0 1 12 22" />
            <Path d="M12 15a3 3 0 0 1-3-3" />
            <Path d="M15 12a3 3 0 0 1-3 3" />
          </Svg>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.enableButton} 
          activeOpacity={0.8}
          onPress={() => {
            // Setup Biometrics
            navigation.navigate('Login'); // or next flow
          }}
        >
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#FDE863" />
                  <Stop offset="100%" stopColor="#BB8E20" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#btnGrad)" rx={scaleH(12)} />
            </Svg>
          </View>
          <Text style={styles.enableButtonText}>Enable Fingerprint</Text>
        </TouchableOpacity>

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
    color: '#FFFFFF',
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
