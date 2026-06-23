import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { OTPInput } from '../../../components/OTPInput/OTPInput';
import { Button } from '../../../components/Button/Button';

export const OTPScreen = ({ route, navigation }: any) => {
  const theme = useTheme();
  const { mobile } = route.params || { mobile: '+91 9876543210' };
  const [isLoading, setIsLoading] = useState(false);

  const handleOTPComplete = (otp: string) => {
    // Automatically trigger verify when 4 digits are entered
    verifyOTP(otp);
  };

  const verifyOTP = (otp: string) => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('SetMPIN');
    }, 1500);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Text style={{ color: theme.text, fontSize: 24 }}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Enter OTP</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          A 4-digit OTP has been sent to{'\n'}
          <Text style={{ color: theme.accent, fontWeight: 'bold' }}>{mobile}</Text>
        </Text>

        <View style={styles.otpWrapper}>
          <OTPInput length={4} onComplete={handleOTPComplete} resendDelay={28} />
        </View>

        {isLoading && <ActivityIndicator size="large" color={theme.accent} style={{ marginTop: 20 }} />}
      </View>

      {/* Numeric Keypad will be handled by the OS for TextInput unless we use a custom one. 
          The mockup shows a custom yellow keypad. In this screen we are using standard TextInput for OTP,
          but we could swap to a custom keypad if desired. For now standard OS number-pad is used via TextInput in OTPInput.
      */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  otpWrapper: {
    alignItems: 'center',
  },
});
