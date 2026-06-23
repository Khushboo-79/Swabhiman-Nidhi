import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks/useTheme';
import { Button } from '../../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../authSlice';

export const BiometricScreen = ({ navigation }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleEnable = () => {
    // Logic to enable biometric using react-native-biometrics would go here.
    // For now, we simulate success and complete onboarding/auth.
    completeAuth();
  };

  const handleSkip = () => {
    completeAuth();
  };

  const completeAuth = () => {
    // This logs the user in, which should switch the RootNavigator to the Main App Stack
    dispatch(loginSuccess({ customerId: '1', sessionId: 'dummy_session' }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        
        {/* Placeholder for the large fingerprint graphic */}
        <View style={styles.graphicContainer}>
          <View style={[styles.circle, { borderColor: theme.accent }]}>
             <Text style={{ fontSize: 60 }}>👆</Text>
          </View>
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Enable Biometric login?</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Login quickly and securely{'\n'}using your fingerprint.
        </Text>

      </View>

      <View style={styles.footer}>
        <Button title="Enable Fingerprint" onPress={handleEnable} />
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: theme.textSecondary }]}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphicContainer: {
    marginBottom: 40,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  skipButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
