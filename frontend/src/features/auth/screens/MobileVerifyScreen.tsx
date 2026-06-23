import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../../../components/Button/Button';

export const MobileVerifyScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [mobile, setMobile] = useState('');

  const handleSendOTP = () => {
    // Basic validation
    if (mobile.length === 10) {
      navigation.navigate('OTP', { mobile });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Verify Your</Text>
          <Text style={[styles.title, { color: theme.text }]}>Mobile Number</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Enter your registered mobile</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>number to continue</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={[styles.countryCodeBox, { backgroundColor: theme.card }]}>
            <Text style={{ color: '#000', fontWeight: 'bold' }}>+91 ⌄</Text>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: '#000' }]}
            placeholder="Enter Mobile Number"
            placeholderTextColor="#A0AEC0"
            keyboardType="phone-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
        </View>

        <Button 
          title="Send OTP" 
          onPress={handleSendOTP} 
          disabled={mobile.length < 10}
        />

        <View style={styles.footer}>
          <Text style={styles.shieldIcon}>🛡</Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Your data is 100% secure{'\n'}with SPN PAY
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  countryCodeBox: {
    paddingHorizontal: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: 2,
  },
  input: {
    flex: 1,
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  shieldIcon: {
    fontSize: 24,
    color: '#EDBF47', // Fallback color, will be styled via text
    marginBottom: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
  },
});
