import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming, withRepeat } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

interface PinPadProps {
  pin: string;
  setPin: (val: string) => void;
  maxLength?: number;
  onBiometricPress?: () => void;
  error?: boolean;
}

export const PinPad: React.FC<PinPadProps> = ({ pin, setPin, maxLength = 6, onBiometricPress, error }) => {
  const theme = useTheme();
  const shakeTranslation = useSharedValue(0);

  useEffect(() => {
    if (error) {
      shakeTranslation.value = withSequence(
        withTiming(10, { duration: 50 }),
        withRepeat(withTiming(-10, { duration: 50 }), 3, true),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeTranslation.value }],
    };
  });

  const handlePress = (num: string) => {
    if (pin.length < maxLength) {
      setPin(pin + num);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < maxLength; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            { 
              backgroundColor: i < pin.length ? theme.primary : 'transparent',
              borderColor: theme.primary 
            }
          ]}
        />
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dotsContainer, animatedStyle]}>
        {renderDots()}
        <TouchableOpacity style={styles.eyeIcon}><Text style={{color: theme.primary}}>👁</Text></TouchableOpacity>
      </Animated.View>

      <View style={[styles.padContainer, { backgroundColor: theme.accent }]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <TouchableOpacity key={num} style={styles.key} onPress={() => handlePress(num.toString())}>
            <View style={styles.keyInner}>
              <Text style={styles.keyText}>{num}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.key}>
           {onBiometricPress && (
              <TouchableOpacity onPress={onBiometricPress} style={styles.keyInner}>
                <Text style={styles.keyText}>👆</Text>
              </TouchableOpacity>
           )}
        </View>
        <TouchableOpacity style={styles.key} onPress={() => handlePress('0')}>
           <View style={styles.keyInner}>
            <Text style={styles.keyText}>0</Text>
           </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={handleBackspace}>
          <View style={styles.keyInner}>
            <Text style={styles.keyText}>⌫</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    marginHorizontal: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  padContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  key: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  keyInner: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});
