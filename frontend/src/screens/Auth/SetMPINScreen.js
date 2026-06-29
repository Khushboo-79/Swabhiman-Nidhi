import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Polyline, Path, Circle } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';
import { PinPad } from '../../components/PinPad/PinPad';

export const SetMPINScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const handlePressKey = (key) => {
    if (pin.length < 4) {
      setPin(pin + key);
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const bottomContinueBtn = (
    <TouchableOpacity 
      style={styles.continueButton} 
      activeOpacity={0.8}
      onPress={() => {
        if (pin.length === 4) {
           navigation.navigate('Biometric');
        }
      }}
    >
      <Text style={styles.continueButtonText}>Continue</Text>
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
          Set MPIN
        </Text>
        <Text style={styles.subtitle}>
          Create a 6-digit MPIN to login{'\n'}securely
        </Text>
      </View>

      {/* PIN Dots Section */}
      <View style={styles.pinSection}>
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
              >
                {/* If showPin is true and filled, we could show text. 
                    But image just shows solid white circles. We will render text if shown, 
                    else solid circle. */}
                {isFilled && showPin && (
                  <Text style={styles.pinDotText}>{pin[index]}</Text>
                )}
              </View>
            );
          })}

          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPin(!showPin)}
            activeOpacity={0.7}
          >
            {showPin ? (
              <Svg width={scaleH(24)} height={scaleV(24)} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <Polyline points="1 1 23 23" />
              </Svg>
            ) : (
              <Svg width={scaleH(24)} height={scaleV(24)} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <Circle cx="12" cy="12" r="3" />
              </Svg>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Spacer to push PinPad to bottom */}
      <View style={{ flex: 1 }} />

      {/* Custom PinPad with Continue Button */}
      <View style={styles.pinPadContainer}>
        <PinPad 
          showDone={false}
          onPressKey={handlePressKey} 
          onDelete={handleDelete} 
          bottomContent={bottomContinueBtn}
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
    marginBottom: scaleV(15),
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '400',
    lineHeight: scaleV(20),
    marginBottom: scaleV(50),
  },
  pinSection: {
    paddingHorizontal: scaleH(20),
  },
  pinDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
  },
  pinDot: {
    width: scaleH(16),
    height: scaleH(16),
    borderRadius: scaleH(8),
    marginRight: scaleH(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDotEmpty: {
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
  pinDotFilled: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
  },
  pinDotText: {
    color: '#041537',
    fontSize: scaleF(12),
    fontWeight: 'bold',
  },
  eyeIcon: {
    marginLeft: 'auto',
  },
  pinPadContainer: {
    width: '100%',
    paddingHorizontal: scaleH(10),
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#041537', // matching the background color for the button inside yellow 
    borderRadius: scaleH(12),
    height: scaleV(48),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleV(5),
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
});
