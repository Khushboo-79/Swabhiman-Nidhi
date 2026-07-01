import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../../constants/AppTheme';

export const FDRDScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
            <Icon name="arrow-left" size={scaleH(24)} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Deposits</Text>
            <TouchableOpacity style={styles.interestRatesBtn}>
              <Text style={styles.headerSubtitle}>View Interest rates</Text>
              <Icon name="chevron-right" size={scaleH(16)} color="#A0A5B5" style={{ marginLeft: scaleH(4) }} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.infoButton}>
          <Icon name="information-outline" size={scaleH(20)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Logo and Intro Text */}
        <View style={styles.introSection}>
          <Image
            source={require('../../../Images/Logo/logo.jpeg')}
            style={styles.logoImage}
            resizeMode="cover"
          />
          <Text style={styles.headsUpText}>Heads Up!</Text>
          <Text style={styles.rateDropText}>6.80% may drop soon</Text>

          <Text style={styles.descriptionText}>
            Book an FD before interest rates drop.{'\n'}
            Lock 6.80% p.a. and secure higher interst
          </Text>
        </View>

        {/* Deposit Options Card */}
        <View style={styles.cardContainer}>

          {/* FD Button */}
          <TouchableOpacity style={styles.optionButton} activeOpacity={0.8} onPress={() => navigation.navigate('BookFD')}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIconBadge, { overflow: 'hidden' }]}>
                <View style={StyleSheet.absoluteFill}>
                  <Svg height="100%" width="100%">
                    <Defs>
                      <LinearGradient id="fdGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                        <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                      </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#fdGrad)" />
                  </Svg>
                </View>
                <Text style={styles.optionIconText}>FD</Text>
              </View>
              <Text style={styles.optionTitle}>Fixed Deposit</Text>
            </View>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </TouchableOpacity>

          {/* RD Button */}
          <TouchableOpacity style={[styles.optionButton, { marginBottom: 0 }]} activeOpacity={0.8}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIconBadge, { overflow: 'hidden' }]}>
                <View style={StyleSheet.absoluteFill}>
                  <Svg height="100%" width="100%">
                    <Defs>
                      <LinearGradient id="rdGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                        <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                      </LinearGradient>
                    </Defs>
                    <Rect width="100%" height="100%" fill="url(#rdGrad)" />
                  </Svg>
                </View>
                <Text style={styles.optionIconText}>RD</Text>
              </View>
              <Text style={styles.optionTitle}>Recurring Deposit</Text>
            </View>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </TouchableOpacity>

        </View>

      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomSection}>
        <View style={[styles.goalButtonContainer, { overflow: 'hidden', backgroundColor: 'transparent' }]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="goalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                  <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#goalGrad)" />
            </Svg>
          </View>
          <TouchableOpacity style={styles.goalButtonTouch} activeOpacity={0.8}>
            <Text style={styles.goalButtonText}>Goal-Based saving</Text>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background, // Deep Navy (#041537)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: scaleH(20),
    paddingTop: scaleV(15),
    paddingBottom: scaleV(10),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  backButton: {
    marginTop: scaleV(6),
  },
  headerTextContainer: {
    marginLeft: scaleH(15),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: scaleF(24),
    fontWeight: 'bold',
    marginBottom: scaleV(4),
  },
  interestRatesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
  },
  infoButton: {
    padding: scaleH(3),
    // borderWidth: 1.5,
    // borderColor: '#FFFFFF',
    // borderRadius: scaleH(16),
    width: scaleH(28),
    height: scaleH(28),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleV(4),
  },
  scrollContent: {
    paddingBottom: scaleV(130), // Leave space for bottom button
  },
  introSection: {
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
    marginTop: scaleV(20),
    marginBottom: scaleV(30),
  },
  logoImage: {
    width: scaleH(80),
    height: scaleH(80),
    borderRadius: scaleH(20),
    marginBottom: scaleV(15),
  },
  headsUpText: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    marginBottom: scaleV(2),
  },
  rateDropText: {
    color: '#FFFFFF',
    fontSize: scaleF(18),
    fontWeight: 'bold',
    marginBottom: scaleV(12),
  },
  descriptionText: {
    color: '#A0A5B5',
    fontSize: scaleF(13),
    textAlign: 'center',
    lineHeight: scaleV(20),
  },
  cardContainer: {
    backgroundColor: '#091A42', // Slightly lighter than background
    marginHorizontal: scaleH(15),
    borderRadius: scaleH(20),
    paddingVertical: scaleV(35),
    paddingHorizontal: scaleH(15),
    borderWidth: 1,
    borderColor: '#132859', // subtle border
  },
  optionButton: {
    backgroundColor: '#F3F4F6', // Light gray/off-white background
    borderRadius: scaleH(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleV(18),
    paddingHorizontal: scaleH(18),
    marginBottom: scaleV(30),
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIconBadge: {
    width: scaleH(44),
    height: scaleH(44),
    borderRadius: scaleH(22),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleH(15),
  },
  optionIconText: {
    color: '#000000',
    fontWeight: '900',
    fontSize: scaleF(16),
  },
  optionTitle: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: '500',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scaleH(15),
    paddingBottom: scaleV(35), // accounting for safe area on iOS
    backgroundColor: AppTheme.colors.background, // Block scrolling content
  },
  goalButtonContainer: {
    width: '100%',
    height: scaleV(65),
    borderRadius: scaleH(16),
  },
  goalButtonTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(25),
  },
  goalButtonText: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: 'bold',
  },
});
