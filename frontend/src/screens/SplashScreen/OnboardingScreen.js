import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header section */}
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <View style={styles.brandContainer}>
          <Text style={styles.brandWhite}>SPN </Text>
          <Text style={styles.brandGold}>PAY</Text>
        </View>
        <Text style={styles.subText}>Your Trusted Banking Partner</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../Images/Logo/logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Features Cards */}
      <View style={styles.featuresContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Secure Banking</Text>
          <Text style={styles.cardSub}>Bank-grade security to keep you safe</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>All in One</Text>
          <Text style={styles.cardSub}>Manage accounts, payments, loans & more</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Anytime, Anywhere</Text>
          <Text style={styles.cardSub}>Bank on the go, 24x7</Text>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SelectLanguage')}
          activeOpacity={0.8}
        >
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#FDE863" />
                  <Stop offset="100%" stopColor="#BB8E20" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#btnGrad)" rx={scaleH(12)} />
            </Svg>
          </View>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => navigation.navigate('MobileVerify')}
        >
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: scaleV(40),
    marginBottom: scaleV(30),
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: '600',
    marginBottom: scaleV(5),
  },
  brandContainer: {
    flexDirection: 'row',
    marginBottom: scaleV(10),
  },
  brandWhite: {
    color: '#FFFFFF',
    fontSize: scaleF(24),
    fontWeight: 'bold',
  },
  brandGold: {
    color: '#FFB800',
    fontSize: scaleF(24),
    fontWeight: 'bold',
  },
  subText: {
    color: '#A0A5B5',
    fontSize: scaleF(13),
    fontWeight: '400',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: scaleV(40),
  },
  logo: {
    width: scaleH(160),
    height: scaleH(160),
  },
  featuresContainer: {
    width: '100%',
    marginBottom: scaleV(40),
  },
  card: {
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(10),
    paddingVertical: scaleV(12),
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(10),
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    color: '#000000',
    fontSize: scaleF(15),
    fontWeight: '600',
    marginBottom: scaleV(4),
  },
  cardSub: {
    color: '#666666',
    fontSize: scaleF(11),
    fontWeight: '400',
  },
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: scaleV(30),
    alignItems: 'center',
  },
  button: {
    width: '90%',
    height: scaleV(50),
    borderRadius: scaleH(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleV(20),
    overflow: 'hidden', // Ensure the background radius is respected
  },
  buttonText: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
  },
  loginLink: {
    color: '#FFB800',
    fontWeight: '600',
  }
});
