import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect, Path, Circle, Line } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const CreateAccountScreen = ({ navigation }) => {
  const [agree, setAgree] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Svg width={scaleH(24)} height={scaleV(24)} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <Polyline points="15 18 9 12 15 6" />
            </Svg>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Account</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.headerSubtitle}>Let's get started with a few details</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stepper */}
          <View style={styles.stepperContainer}>
            <View style={styles.stepperLine} />

            <View style={styles.stepWrapper}>
              <View style={[styles.stepCircle, styles.stepActive]}>
                <Text style={styles.stepTextActive}>1</Text>
              </View>
              <Text style={styles.stepLabel}>Basic Details</Text>
            </View>

            <View style={styles.stepWrapper}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepText}>2</Text>
              </View>
              <Text style={styles.stepLabel}>Verify Mobile</Text>
            </View>

            <View style={styles.stepWrapper}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepText}>3</Text>
              </View>
              <Text style={styles.stepLabel}>Set MPIN</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Enter Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#A0A5B5"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Enter Mobile Number</Text>
            <View style={[styles.inputContainer, { paddingHorizontal: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }]}>
              <View style={styles.prefixContainer}>
                <Text style={styles.prefixText}>+91</Text>
                <Svg width={scaleH(12)} height={scaleV(12)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: scaleH(4) }}>
                  <Polyline points="6 9 12 15 18 9" />
                </Svg>
              </View>
              <TextInput
                style={[styles.input, { flex: 1, paddingHorizontal: scaleH(10) }]}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#A0A5B5"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email ID (Optional)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor="#A0A5B5"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="DD / MM / YYYY"
                placeholderTextColor="#A0A5B5"
              />
              <Svg width={scaleH(20)} height={scaleV(20)} viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <Line x1="16" y1="2" x2="16" y2="6" />
                <Line x1="8" y1="2" x2="8" y2="6" />
                <Line x1="3" y1="10" x2="21" y2="10" />
              </Svg>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>PAN Number (Optional)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter PAN Number"
                placeholderTextColor="#A0A5B5"
                autoCapitalize="characters"
              />
            </View>
          </View>

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, agree && styles.checkboxActive]}
              onPress={() => setAgree(!agree)}
              activeOpacity={0.8}
            >
              {agree && (
                <Svg width={scaleH(12)} height={scaleV(12)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <Polyline points="20 6 9 17 4 12" />
                </Svg>
              )}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              I agree to the <Text style={styles.yellowText}>Terms & Conditions</Text> and <Text style={styles.yellowText}>Privacy policy</Text>
            </Text>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MobileVerify')}
          >
            <View style={StyleSheet.absoluteFill}>
              <Svg height="100%" width="100%">
                <Defs>
                  <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <Stop offset="0%" stopColor="#FDE863" />
                    <Stop offset="100%" stopColor="#BB8E20" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#btnGrad)" rx={scaleH(12)} />
              </Svg>
            </View>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or</Text>

          {/* Biometric Button */}
          <TouchableOpacity style={styles.bioButton} activeOpacity={0.8}>
            <View style={styles.bioIconContainer}>
              <Svg width={scaleH(24)} height={scaleV(24)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <Path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10" />
                <Path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7" />
                <Path d="M8.29 12c0-2.05 1.66-3.71 3.71-3.71s3.71 1.66 3.71 3.71" />
                <Path d="M12 12v.01" />
                <Path d="M22 16v-4" />
                <Path d="M2 16v-4" />
                <Path d="M12 22a9.96 9.96 0 0 1-7.07-2.93" />
                <Path d="M19.07 19.07A9.96 9.96 0 0 1 12 22" />
                <Path d="M12 15a3 3 0 0 1-3-3" />
                <Path d="M15 12a3 3 0 0 1-3 3" />
              </Svg>
            </View>
            <Text style={styles.bioButtonText}>Sign Up with Biometric</Text>
          </TouchableOpacity>

          {/* Already have account */}
          <TouchableOpacity style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.yellowText}>Login</Text>
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
    paddingHorizontal: scaleH(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scaleV(20),
    marginBottom: scaleV(5),
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    zIndex: 10,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: scaleF(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: scaleV(20),
  },
  headerSubtitle: {
    color: '#FFFFFF',
    fontSize: scaleF(13),
    textAlign: 'center',
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: scaleV(40),
  },
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scaleV(30),
    paddingHorizontal: scaleH(10),
    position: 'relative',
  },
  stepperLine: {
    position: 'absolute',
    top: scaleV(14),
    left: scaleH(40),
    right: scaleH(40),
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    zIndex: 0,
  },
  stepWrapper: {
    alignItems: 'center',
    zIndex: 1,
  },
  stepCircle: {
    width: scaleH(28),
    height: scaleH(28),
    borderRadius: scaleH(14),
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleV(6),
  },
  stepActive: {
    backgroundColor: '#FFB800',
  },
  stepText: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: 'bold',
  },
  stepLabel: {
    color: '#A0A5B5',
    fontSize: scaleF(10),
  },
  formGroup: {
    marginBottom: scaleV(15),
  },
  label: {
    color: '#EBEBEB',
    fontSize: scaleF(13),
    marginBottom: scaleV(6),
  },
  inputContainer: {
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(8),
    height: scaleV(45),
    paddingHorizontal: scaleH(15),
    justifyContent: 'center',
  },
  input: {
    color: '#000000',
    fontSize: scaleF(14),
    height: '100%',
    padding: 0, // for Android
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleH(12),
    height: '100%',
  },
  prefixText: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleV(5),
    marginBottom: scaleV(20),
  },
  checkbox: {
    width: scaleH(18),
    height: scaleH(18),
    borderRadius: scaleH(4),
    borderWidth: 1.5,
    borderColor: '#FFB800',
    marginRight: scaleH(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  checkboxActive: {
    backgroundColor: '#FFB800',
  },
  checkboxText: {
    color: '#FFFFFF',
    fontSize: scaleF(11),
    flex: 1,
  },
  yellowText: {
    color: '#FFB800',
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: scaleV(48),
    borderRadius: scaleH(12),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: 'bold',
  },
  orText: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: scaleV(15),
    fontSize: scaleF(14),
  },
  bioButton: {
    width: '100%',
    height: scaleV(48),
    borderRadius: scaleH(12),
    backgroundColor: '#EBEBEB',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleV(25),
  },
  bioIconContainer: {
    marginRight: scaleH(10),
  },
  bioButtonText: {
    color: '#000000',
    fontSize: scaleF(15),
    fontWeight: '500',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
  },
});
