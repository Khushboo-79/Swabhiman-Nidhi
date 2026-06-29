import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect, Path, Circle } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const RegisterDeviceScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Register Device</Text>
      </View>
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.headerSubtitle}>We will register this device for{'\n'}your secure banking</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Device Card */}
        <View style={styles.cardContainer}>
          {/* Top Section (White) */}
          <View style={styles.cardTop}>
            <View style={styles.phoneIconContainer}>
              <Svg width={scaleH(32)} height={scaleV(44)} viewBox="0 0 24 36" fill="none" stroke="#000000" strokeWidth="1.5">
                <Rect x="2" y="2" width="20" height="32" rx="4" />
                <Path d="M9 30h6" />
              </Svg>
            </View>
            <View style={styles.cardTopText}>
              <Text style={styles.deviceModel}>Iphone 14</Text>
              <Text style={styles.deviceOS}>IOS 14.2</Text>
            </View>
          </View>

          {/* Bottom Section (Gray) */}
          <View style={styles.cardBottom}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Device Name</Text>
              <Text style={styles.rowValue}>iphone 14</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Device Type</Text>
              <Text style={styles.rowValue}>Mobile</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>OS Version</Text>
              <Text style={styles.rowValue}>IOS 14.2</Text>
            </View>
            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.rowLabel}>Registered On</Text>
              <Text style={[styles.rowValue, { textAlign: 'right' }]}>22 May 2026,{'\n'}10:30 AM</Text>
            </View>
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <View style={styles.lockIconContainer}>
            <Svg width={scaleH(20)} height={scaleV(20)} viewBox="0 0 24 24" fill="#000000">
              <Path d="M19 11H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zm-7 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
              <Path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </Svg>
          </View>
          <Text style={styles.infoText}>
            you can manage registered devices{'\n'}later from security center.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CreateAccount')}
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
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: scaleV(10),
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
    fontSize: scaleF(20),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: scaleV(30),
  },
  headerSubtitle: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
    textAlign: 'center',
    lineHeight: scaleV(20),
  },
  scrollContent: {
    paddingBottom: scaleV(100),
  },
  cardContainer: {
    borderRadius: scaleH(12),
    overflow: 'hidden',
    marginBottom: scaleV(20),
  },
  cardTop: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleV(20),
    paddingHorizontal: scaleH(20),
  },
  phoneIconContainer: {
    marginRight: scaleH(15),
    marginLeft: scaleH(5),
  },
  cardTopText: {
    justifyContent: 'center',
  },
  deviceModel: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '500',
    marginBottom: scaleV(2),
  },
  deviceOS: {
    color: '#666666',
    fontSize: scaleF(14),
  },
  cardBottom: {
    backgroundColor: '#EBEBEB',
    paddingVertical: scaleV(10),
    paddingHorizontal: scaleH(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleV(12),
  },
  rowLabel: {
    color: '#666666',
    fontSize: scaleF(14),
  },
  rowValue: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: '500',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(12),
    paddingVertical: scaleV(15),
    paddingHorizontal: scaleH(20),
    alignItems: 'center',
  },
  lockIconContainer: {
    marginRight: scaleH(15),
  },
  infoText: {
    color: '#333333',
    fontSize: scaleF(13),
    lineHeight: scaleV(18),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: scaleV(20),
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: scaleV(50),
    borderRadius: scaleH(12),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
});
