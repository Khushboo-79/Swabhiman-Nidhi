import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView, Modal, Image } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect, Path, Circle, Line } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';
import { PinPad } from '../../components/PinPad/PinPad';

export const LoginScreen = ({ navigation }) => {
  const [mobile, setMobile] = useState('');
  const [mpin, setMpin] = useState('');
  const [showMpin, setShowMpin] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // 'mobile' | 'mpin' | null

  const handlePinPress = (key) => {
    if (activeInput === 'mobile') {
      if (mobile.length < 10) setMobile(mobile + key);
    } else if (activeInput === 'mpin') {
      if (mpin.length < 4) setMpin(mpin + key);
    }
  };

  const handlePinDelete = () => {
    if (activeInput === 'mobile') {
      if (mobile.length > 0) setMobile(mobile.slice(0, -1));
    } else if (activeInput === 'mpin') {
      if (mpin.length > 0) setMpin(mpin.slice(0, -1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
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
          <Text style={styles.headerTitle}>Let's Get Started</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.headerSubtitle}>Login or create your account</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Login</Text>
            <View style={styles.tabIndicatorActive} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tabInactive}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={styles.tabTextInactive}>Sign Up</Text>
            <View style={styles.tabIndicatorInactive} />
          </TouchableOpacity>
        </View>

        {/* Form */}
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
              value={mobile}
              showSoftInputOnFocus={false}
              onFocus={() => setActiveInput('mobile')}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Enter MPIN</Text>
          <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center' }]}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              placeholder="Enter 4 digit MPIN"
              placeholderTextColor="#A0A5B5"
              secureTextEntry={!showMpin}
              value={mpin}
              showSoftInputOnFocus={false} // Disable default keyboard
              onFocus={() => setActiveInput('mpin')}
            />
            <TouchableOpacity 
              onPress={() => setShowMpin(!showMpin)}
              style={{ padding: scaleH(5) }}
            >
              {showMpin ? (
                <Svg width={scaleH(20)} height={scaleV(20)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <Circle cx="12" cy="12" r="3" />
                </Svg>
              ) : (
                <Svg width={scaleH(20)} height={scaleV(20)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <Line x1="1" y1="1" x2="23" y2="23" />
                </Svg>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot MPIN ?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('WelcomeBack');
          }}
        >
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                  <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#btnGrad)" rx={scaleH(12)} />
            </Svg>
          </View>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        {/* Biometric Button */}
        <TouchableOpacity 
          style={styles.bioButton} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Biometric')}
        >
          <View style={styles.bioIconContainer}>
            <Image 
              source={require('../../Images/bgImages/fingerprint.webp')} 
              style={{ width: scaleH(24), height: scaleV(24), resizeMode: 'contain' }}
            />
          </View>
          <Text style={styles.bioButtonText}>Login with Biometric</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom PinPad Modal */}
      <Modal
        visible={activeInput !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveInput(null)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setActiveInput(null)}
        >
          <View style={styles.pinPadWrapper} onStartShouldSetResponder={() => true}>
            <PinPad 
              showDone={true}
              onPressKey={handlePinPress} 
              onDelete={handlePinDelete}
              onDone={() => setActiveInput(null)}
            />
          </View>
        </TouchableOpacity>
      </Modal>

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
    marginBottom: scaleV(25),
  },
  headerSubtitle: {
    color: '#EBEBEB',
    fontSize: scaleF(13),
    textAlign: 'center',
    fontWeight: '500',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: scaleV(30),
    paddingHorizontal: scaleH(10),
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: 'bold',
    marginBottom: scaleV(8),
  },
  tabTextInactive: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: 'bold',
    marginBottom: scaleV(8),
  },
  tabIndicatorActive: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFB800',
  },
  tabIndicatorInactive: {
    width: '100%',
    height: 1,
    backgroundColor: '#334260',
  },
  scrollContent: {
    paddingBottom: scaleV(40),
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
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: scaleV(30),
    marginTop: scaleV(5),
  },
  forgotText: {
    color: '#FFB800',
    fontSize: scaleF(13),
    fontWeight: '500',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  pinPadWrapper: {
    backgroundColor: AppTheme.colors.background,
    borderTopLeftRadius: scaleH(12),
    borderTopRightRadius: scaleH(12),
    paddingBottom: scaleV(20), // adding slight padding for safe area logic visually
  },
});
