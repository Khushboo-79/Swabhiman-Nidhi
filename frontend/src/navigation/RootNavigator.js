import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import { View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const Stack = createNativeStackNavigator();

import { SplashScreen } from '../screens/SplashScreen/SplashScreen';
import { AuthStack } from './AuthStack';

const MainTabScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ color: theme.text }}>Main App Placeholder</Text>
    </View>
  );
};

export const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate initial loading (e.g., restoring token from keychain)
    const initApp = async () => {
      // Add logic here to check for existing tokens and auto-login
      setTimeout(() => {
        setIsReady(true);
      }, 5000);
    };
    initApp();
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="Main" component={MainTabScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
