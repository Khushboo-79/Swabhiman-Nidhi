import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { PinPad } from '../../../components/PinPad/PinPad';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';

export const LoginScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleBiometricPress = () => {
    // Attempt biometric login
    dispatch(loginSuccess({ customerId: '1', sessionId: 'dummy_session' }));
  };

  if (pin.length === 6) {
    // Validate MPIN (in real app, compare hashed MPIN or send to backend)
    if (pin === '123456') { // Dummy check
      dispatch(loginSuccess({ customerId: '1', sessionId: 'dummy_session' }));
    } else {
      setError(true);
      setTimeout(() => {
        setPin('');
        setError(false);
      }, 500);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Welcome Back,</Text>
        <Text style={[styles.title, { color: theme.text }]}>Login to your Account</Text>
      </View>

      <View style={styles.content}>
        {/* The PinPad is positioned at the bottom, but we have a "Forget MPIN" link below it. */}
      </View>

      <View style={styles.padWrapper}>
        <PinPad 
          pin={pin} 
          setPin={setPin} 
          maxLength={6} 
          error={error} 
          onBiometricPress={handleBiometricPress}
        />
        <TouchableOpacity style={styles.forgetLink}>
          <Text style={[styles.forgetText, { color: theme.accent }]}>Forget MPIN ?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  content: {
    flex: 1,
  },
  padWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  forgetLink: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  forgetText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
