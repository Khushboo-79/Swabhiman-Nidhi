import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface OTPInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  resendDelay?: number; // seconds
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 4, onComplete, resendDelay = 30 }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);
  const theme = useTheme();
  
  const [timer, setTimer] = useState(resendDelay);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const focusNext = (index: number) => {
    if (index < length - 1 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrev = (index: number) => {
    if (index > 0 && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '') {
      focusNext(index);
    }
    
    // Check if completed
    if (newOtp.every(char => char !== '')) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      focusPrev(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={[styles.input, { backgroundColor: theme.card, color: '#000' }]} // using dark text for contrast on white boxes
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            selectTextOnFocus
          />
        ))}
      </View>
      {timer > 0 ? (
        <Text style={[styles.timerText, { color: theme.textSecondary }]}>Resend OTP in 00:{timer.toString().padStart(2, '0')}</Text>
      ) : (
        <TouchableOpacity onPress={() => setTimer(resendDelay)}>
          <Text style={[styles.timerText, { color: theme.accent, fontWeight: 'bold' }]}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: 60,
    height: 60,
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerText: {
    fontSize: 14,
    marginTop: 10,
  },
});
