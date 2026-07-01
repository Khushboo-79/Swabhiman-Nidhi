import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../../constants/AppTheme';

export const BookFDScreen = ({ navigation }) => {
  const [selectedTenure, setSelectedTenure] = useState(35);

  const tenures = [
    { id: 35, months: 35, rate: '6.80% p.a.', earned: '₹5,431', maturity: '₹30,431' },
    { id: 23, months: 23, rate: '6.80% p.a.', earned: '₹3,568', maturity: '₹28,568' },
    { id: 14, months: 14, rate: '6.80% p.a.', earned: '₹2,172', maturity: '₹27,172' },
    { id: '14_2', months: 14, rate: '6.80% p.a.', earned: '₹2,172', maturity: '₹27,172' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
          <Icon name="chevron-left" size={scaleH(30)} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book FD</Text>
        <View style={{ width: scaleH(30) }} /> {/* Empty view for title centering */}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Amount Input Section */}
        <View style={styles.amountSection}>
          <Text style={styles.enterAmountLabel}>Enter FD amount</Text>
          <Text style={styles.amountValue}>₹5,000</Text>
          
          <TouchableOpacity style={styles.fdNamePill}>
            <Text style={styles.fdNameText}>Tap to enter FD name</Text>
          </TouchableOpacity>
        </View>

        {/* Select Tenure Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Select Tenure</Text>
          <Text style={styles.highestInterestLabel}>HIGHEST INTEREST</Text>

          {tenures.map((item, index) => {
            const isSelected = selectedTenure === item.id;
            return (
              <React.Fragment key={item.id}>
                <TouchableOpacity 
                  style={styles.tenureRowContainer} 
                  activeOpacity={0.7}
                  onPress={() => setSelectedTenure(item.id)}
                >
                  <View style={styles.tenureRowMain}>
                    <View>
                      <Text style={styles.tenureMonthsText}>{item.months} months</Text>
                      {isSelected && (
                        <Text style={styles.interestEarnedText}>Interest earned {item.earned}</Text>
                      )}
                    </View>
                    <View style={styles.tenureRightSide}>
                      <Text style={styles.interestRateText}>{item.rate}</Text>
                      <Icon 
                        name={isSelected ? "check-circle" : "checkbox-blank-circle-outline"} 
                        size={scaleH(24)} 
                        color="#2E88FF" 
                        style={styles.radioIcon} 
                      />
                    </View>
                  </View>
                  {isSelected && (
                    <View style={styles.maturityPill}>
                      <Text style={styles.maturityLabel}>Maturity amount</Text>
                      <Text style={styles.maturityValue}>{item.maturity}</Text>
                    </View>
                  )}
                </TouchableOpacity>
                
                {/* Render separator if not the last item */}
                {index < tenures.length - 1 && <View style={styles.separator} />}
              </React.Fragment>
            );
          })}
        </View>

        {/* Custom Tenure Button */}
        <TouchableOpacity style={styles.customTenureButton} onPress={() => navigation.navigate('SelectTenure')}>
          <Text style={styles.customTenureText}>Select a custom tenure</Text>
          <Icon name="chevron-right" size={scaleH(20)} color="#FFB800" />
        </TouchableOpacity>

      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomSection}>
        <View style={[styles.proceedButtonContainer, { overflow: 'hidden', backgroundColor: 'transparent' }]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="proceedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                  <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#proceedGrad)" />
            </Svg>
          </View>
          <TouchableOpacity style={styles.proceedButtonTouch} activeOpacity={0.8} onPress={() => navigation.navigate('ReviewDetails')}>
            <Text style={styles.proceedButtonText}>Proceed</Text>
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
    alignItems: 'center',
    paddingHorizontal: scaleH(15),
    paddingTop: scaleV(15),
    paddingBottom: scaleV(10),
  },
  backButton: {
    padding: scaleH(5),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: scaleF(20),
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: scaleV(120), // Leave space for bottom button
  },
  amountSection: {
    alignItems: 'center',
    marginTop: scaleV(30),
    marginBottom: scaleV(40),
  },
  enterAmountLabel: {
    color: '#E0E0E0',
    fontSize: scaleF(16),
    marginBottom: scaleV(10),
  },
  amountValue: {
    color: '#FFFFFF',
    fontSize: scaleF(38),
    fontWeight: 'bold',
    marginBottom: scaleV(20),
  },
  fdNamePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: scaleH(20),
    paddingVertical: scaleV(8),
    paddingHorizontal: scaleH(20),
  },
  fdNameText: {
    color: '#8A95A5',
    fontSize: scaleF(13),
  },
  cardContainer: {
    backgroundColor: '#EBEBEB',
    marginHorizontal: scaleH(15),
    borderRadius: scaleH(20),
    paddingVertical: scaleV(25),
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(20),
  },
  cardTitle: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '500',
    marginBottom: scaleV(15),
  },
  highestInterestLabel: {
    color: '#FF1E1E',
    fontSize: scaleF(14),
    fontWeight: '500',
    marginBottom: scaleV(15),
    textTransform: 'uppercase',
  },
  tenureRowContainer: {
    paddingVertical: scaleV(12),
  },
  tenureRowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tenureMonthsText: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
  interestEarnedText: {
    color: '#666666',
    fontSize: scaleF(12),
    marginTop: scaleV(4),
  },
  tenureRightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestRateText: {
    color: '#28A745', // Green color from ref image
    fontSize: scaleF(16),
    fontWeight: '500',
    marginRight: scaleH(10),
  },
  radioIcon: {
    marginLeft: scaleH(5),
  },
  maturityPill: {
    backgroundColor: '#C4C4C4', // Darker gray for the inner pill
    borderRadius: scaleH(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleV(10),
    paddingHorizontal: scaleH(15),
    marginTop: scaleV(12),
  },
  maturityLabel: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: '500',
  },
  maturityValue: {
    color: '#000000',
    fontSize: scaleF(16),
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#D1D1D1',
    width: '100%',
  },
  customTenureButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E2B4D', // Slightly lighter than background
    marginHorizontal: scaleH(15),
    borderRadius: scaleH(12),
    paddingVertical: scaleV(15),
    paddingHorizontal: scaleH(20),
    borderWidth: 1,
    borderColor: '#FFB800',
    marginBottom: scaleV(40),
  },
  customTenureText: {
    color: '#FFB800',
    fontSize: scaleF(16),
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
  proceedButtonContainer: {
    width: '100%',
    height: scaleV(55),
    borderRadius: scaleH(12),
  },
  proceedButtonTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: 'bold',
  },
});
