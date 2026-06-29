import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

const permissions = [
  { id: 'sms', icon: '✉️', title: 'SMS', desc: 'To read OTP for auto-verification' },
  { id: 'phone', icon: '📞', title: 'Phone', desc: 'To verify your mobile number' },
  { id: 'contacts', icon: '👥', title: 'Contacts', desc: 'To fetch & add beneficiaries easily' },
  { id: 'location', icon: '📍', title: 'Location', desc: 'To help you find nearby ATMs & branches' },
  { id: 'camera', icon: '📷', title: 'Camera', desc: 'For QR scan & document upload' },
];

export const PermissionScreen = ({ navigation }) => {
  const [toggles, setToggles] = useState({
    sms: true,
    phone: true,
    contacts: true,
    location: true,
    camera: true,
  });

  const togglePermission = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
        <Text style={styles.headerTitle}>Permission Setup</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.headerSubtitle}>We need a few permissions to{'\n'}Provide you a seamless experience</Text>
      </View>

      {/* Permissions List */}
      <ScrollView 
        style={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleV(150) }}
      >
        {permissions.map((perm) => {
          const isOn = toggles[perm.id];
          return (
            <View key={perm.id} style={styles.listItem}>
              <Text style={styles.icon}>{perm.icon}</Text>
              
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{perm.title}</Text>
                <Text style={styles.itemDesc}>{perm.desc}</Text>
              </View>

              <TouchableOpacity 
                activeOpacity={0.8} 
                onPress={() => togglePermission(perm.id)}
                style={[styles.toggleTrack, isOn ? styles.toggleTrackOn : styles.toggleTrackOff]}
              >
                <View style={[styles.toggleThumb, isOn ? styles.toggleThumbOn : styles.toggleThumbOff]} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('RegisterDevice')}
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

        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => {
             // Skip logic
          }}
        >
          <Text style={styles.skipText}>Skip</Text>
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
  listContainer: {
    flex: 1,
    marginTop: scaleV(10),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(12),
    paddingVertical: scaleV(15),
    paddingHorizontal: scaleH(15),
    marginBottom: scaleV(12),
  },
  icon: {
    fontSize: scaleF(28),
    marginRight: scaleH(15),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
    marginBottom: scaleV(2),
  },
  itemDesc: {
    color: '#666666',
    fontSize: scaleF(12),
    fontWeight: '400',
  },
  toggleTrack: {
    width: scaleH(46),
    height: scaleV(24),
    borderRadius: scaleH(12),
    borderWidth: 2,
    justifyContent: 'center',
    paddingHorizontal: scaleH(2),
  },
  toggleTrackOn: {
    borderColor: '#FFB800',
  },
  toggleTrackOff: {
    borderColor: '#A0A5B5',
  },
  toggleThumb: {
    width: scaleH(16),
    height: scaleH(16),
    borderRadius: scaleH(8),
  },
  toggleThumbOn: {
    backgroundColor: '#FFB800',
    alignSelf: 'flex-end',
  },
  toggleThumbOff: {
    backgroundColor: '#A0A5B5',
    alignSelf: 'flex-start',
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
    marginBottom: scaleV(15),
  },
  buttonText: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: scaleV(10),
    paddingHorizontal: scaleH(20),
  },
  skipText: {
    color: '#FFB800',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
});
