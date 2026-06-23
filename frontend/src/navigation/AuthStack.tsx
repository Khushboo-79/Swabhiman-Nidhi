import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/SplashScreen';
import { MobileVerifyScreen } from '../features/auth/screens/MobileVerifyScreen';
import { OTPScreen } from '../features/auth/screens/OTPScreen';
import { SetMPINScreen } from '../features/auth/screens/SetMPINScreen';
import { BiometricScreen } from '../features/auth/screens/BiometricScreen';
import { LoginScreen } from '../features/auth/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="MobileVerify" component={MobileVerifyScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SetMPIN" component={SetMPINScreen} />
      <Stack.Screen name="Biometric" component={BiometricScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
