import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { PinPad } from '../../../components/PinPad/PinPad';

export const SetMPINScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  // In a real app, you might have a "Confirm MPIN" step.
  // We'll keep it simple: once they enter 6 digits, we save it and move on.
  if (pin.length === 6) {
    // Navigate to Biometric prompt after short delay
    setTimeout(() => {
      navigation.replace('Biometric');
    }, 300);
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Text style={{ color: theme.text, fontSize: 24 }}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Set MPIN</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Create a 6-digit MPIN for faster{'\n'}and secure login.
        </Text>
      </View>

      {/* The PinPad is positioned at the bottom */}
      <View style={styles.padWrapper}>
        <PinPad 
          pin={pin} 
          setPin={setPin} 
          maxLength={6} 
          error={error} 
        />
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
    paddingTop: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  content: {
    paddingHorizontal: 24,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 40,
  },
  padWrapper: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});
