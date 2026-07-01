import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';
import { PinPad } from '../../components/PinPad/PinPad';

export const WelcomeBackScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const handlePressKey = (key) => {
    if (pin.length < 4) {
      const newPin = pin + key;
      setPin(newPin);
      if (newPin.length === 4) {
        // Automatically navigate to Dashboard
        navigation.navigate('Dashboard');
        // Optional: clear pin after navigation if desired
        setTimeout(() => setPin(''), 500); 
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const bottomFingerprintBtn = (
    <TouchableOpacity 
      style={styles.fingerprintButton} 
      activeOpacity={0.8}
      onPress={() => {
        // Handle Biometric Login
      }}
    >
      <Image 
        source={require('../../Images/bgImages/fingerprint.webp')} 
        style={{ width: scaleH(32), height: scaleH(32), resizeMode: 'contain' }}
      />
    </TouchableOpacity>
  );

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
          Welcome Back
        </Text>
        <Text style={styles.subtitle}>
          Login to your Account
        </Text>
      </View>

      {/* Middle Content */}
      <View style={styles.middleSection}>
        {/* PIN Dots */}
        <View style={styles.pinDotsContainer}>
          {[0, 1, 2, 3].map((index) => {
            const isFilled = index < pin.length;
            return (
              <View 
                key={index} 
                style={[
                  styles.pinDot,
                  isFilled ? styles.pinDotFilled : styles.pinDotEmpty
                ]}
              />
            );
          })}
        </View>

        {/* Forgot MPIN */}
        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forget MPIN ?</Text>
        </TouchableOpacity>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Custom PinPad with Fingerprint Bottom Content */}
      <View style={styles.pinPadContainer}>
        <PinPad 
          showDone={false}
          onPressKey={handlePressKey} 
          onDelete={handleDelete} 
          bottomContent={bottomFingerprintBtn}
        />
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
    marginBottom: scaleV(10),
  },
  subtitle: {
    color: '#EBEBEB',
    fontSize: scaleF(14),
    fontWeight: '400',
  },
  middleSection: {
    marginTop: scaleV(60),
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
  },
  pinDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleV(30),
  },
  pinDot: {
    width: scaleH(16),
    height: scaleH(16),
    borderRadius: scaleH(8),
    marginHorizontal: scaleH(12),
  },
  pinDotEmpty: {
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  pinDotFilled: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
  },
  forgotButton: {
    paddingVertical: scaleV(10),
  },
  forgotText: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: 'bold',
  },
  pinPadContainer: {
    width: '100%',
    paddingHorizontal: scaleH(10),
  },
  fingerprintButton: {
    width: '100%',
    height: scaleV(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleV(10),
    paddingBottom: scaleV(10),
  },
});
