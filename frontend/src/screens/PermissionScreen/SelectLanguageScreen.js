import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Svg, { Polyline, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

const languages = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'Hindi (हिंदी)' },
  { id: 'mr', label: 'Marathi (मराठी)' },
  { id: 'as', label: 'Assamese (অসমীয়া)' },
  { id: 'gu', label: 'Gujarati (ગુજરાતી)' },
  { id: 'ta', label: 'Tamil (தமிழ்)' },
  { id: 'te', label: 'Telugu (తెలుగు)' },
];

export const SelectLanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

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
        <Text style={styles.headerTitle}>Choose Language</Text>
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.headerSubtitle}>Select your preferred language</Text>
      </View>

      {/* Language List */}
      <ScrollView 
        style={styles.listContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scaleV(100) }}
      >
        {languages.map((lang) => {
          const isSelected = selectedLanguage === lang.id;
          return (
            <TouchableOpacity
              key={lang.id}
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => setSelectedLanguage(lang.id)}
            >
              <View style={styles.radioOuter}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.listText}>{lang.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Permission')}
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
    backgroundColor: AppTheme.colors.background, // Uses AppTheme updated background #041537
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
  },
  listContainer: {
    flex: 1,
    marginTop: scaleV(10),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(10),
    paddingVertical: scaleV(15),
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(10),
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  radioOuter: {
    width: scaleH(22),
    height: scaleH(22),
    borderRadius: scaleH(11),
    borderWidth: 3,
    borderColor: '#7A7A7A', // Gray border for radio
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleH(15),
    backgroundColor: '#505050',
  },
  radioInner: {
    width: scaleH(8),
    height: scaleH(8),
    borderRadius: scaleH(4),
    backgroundColor: '#FFB800', // Gold center when selected
  },
  listText: {
    fontSize: scaleF(16),
    color: '#000000',
    fontWeight: '500',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: scaleV(30),
    width: '100%',
    alignSelf: 'center',
  },
  button: {
    width: '100%',
    height: scaleV(50),
    borderRadius: scaleH(12),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures the SVG background corner radius is respected
  },
  buttonText: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
});
