import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { OnboardingScreen } from '../screens/SplashScreen/OnboardingScreen';
import { SelectLanguageScreen } from '../screens/PermissionScreen/SelectLanguageScreen';
import { PermissionScreen } from '../screens/PermissionScreen/PermissionScreen';
import { RegisterDeviceScreen } from '../screens/PermissionScreen/RegisterDeviceScreen';
import { CreateAccountScreen } from '../screens/Auth/CreateAccountScreen';
import { MobileVerifyScreen } from '../screens/Auth/MobileVerifyScreen';
import { OTPScreen } from '../screens/Auth/OTPScreen';
import { SetMPINScreen } from '../screens/Auth/SetMPINScreen';
import { BiometricScreen } from '../screens/Auth/BiometricScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguageScreen} />
      <Stack.Screen name="Permission" component={PermissionScreen} />
      <Stack.Screen name="RegisterDevice" component={RegisterDeviceScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="MobileVerify" component={MobileVerifyScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="SetMPIN" component={SetMPINScreen} />
      <Stack.Screen name="Biometric" component={BiometricScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
