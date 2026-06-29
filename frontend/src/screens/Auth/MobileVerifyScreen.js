import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';
import { PinPad } from '../../components/PinPad/PinPad';

export const MobileVerifyScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');

  const handlePressKey = (key) => {
    if (otp.length < 4) {
      setOtp(otp + key);
    }
  };

  const handleDelete = () => {
    if (otp.length > 0) {
      setOtp(otp.slice(0, -1));
    }
  };

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
          Verify Your{'\n'}Mobile Number
        </Text>
        <Text style={styles.subtitle}>
          We have sent a 6-digit OTP to{'\n'}+91 9876543210
        </Text>
      </View>

      {/* OTP Input Section */}
      <View style={styles.otpSection}>
        <View style={styles.otpBoxesContainer}>
          {[0, 1, 2, 3].map((index) => (
            <View key={index} style={styles.otpBox}>
              <Text style={styles.otpText}>
                {otp[index] || ''}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.resendText}>
          Resend OTP in 00:28
        </Text>
      </View>

      {/* Spacer to push PinPad to bottom */}
      <View style={{ flex: 1 }} />

      {/* Custom PinPad */}
      <View style={styles.pinPadContainer}>
        <PinPad 
          showDone={true}
          onPressKey={handlePressKey} 
          onDelete={handleDelete} 
          onDone={() => {
            if (otp.length === 4) {
              // Proceed to next step
              navigation.navigate('SetMPIN'); // or wherever
            }
          }}
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
    marginBottom: scaleV(25),
  },
  title: {
    color: '#FFFFFF',
    fontSize: scaleF(26),
    fontWeight: '600',
    marginBottom: scaleV(15),
    lineHeight: scaleV(32),
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '400',
    lineHeight: scaleV(20),
    marginBottom: scaleV(40),
  },
  otpSection: {
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
  },
  otpBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: scaleH(10),
    marginBottom: scaleV(20),
  },
  otpBox: {
    width: scaleH(65),
    height: scaleV(75),
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    fontSize: scaleF(24),
    fontWeight: 'bold',
    color: '#000000',
  },
  resendText: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
  },
  pinPadContainer: {
    width: '100%',
    paddingHorizontal: scaleH(10),
  },
});
