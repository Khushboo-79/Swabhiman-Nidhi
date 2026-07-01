import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../../constants/AppTheme';

const chartData = [
  { label: '6m', heightFactor: 0.25 },
  { label: '1y', heightFactor: 0.4 },
  { label: '18m', heightFactor: 0.6 },
  { label: '2y', heightFactor: 0.8 },
  { label: '3y', heightFactor: 1.0 },
  { label: '4y', heightFactor: 1.0 },
  { label: '5y', heightFactor: 0.45 },
  { label: '6y', heightFactor: 0.45 },
  { label: '7y', heightFactor: 0.45 },
  { label: '8y', heightFactor: 0.45 },
  { label: '9y', heightFactor: 0.45 },
  { label: '10y', heightFactor: 0.45 },
];

export const SelectTenureScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(3); // 2y is index 3

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
          <Icon name="chevron-down" size={scaleH(30)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.title}>Select tenure</Text>
        <Text style={styles.subtitle}>Select a suitable tenure to earn the best interest</Text>

        <View style={styles.tenureLabelRow}>
          <Text style={styles.tenureLabel}>Tenure</Text>
          <Icon name="information-outline" size={scaleH(20)} color="#FFFFFF" style={{ marginLeft: scaleH(8) }} />
        </View>

        {/* Custom Input Boxes */}
        <View style={styles.inputBoxesRow}>
          <View style={styles.inputBox}>
            <Text style={styles.inputBoxLabel}>Years</Text>
            <Text style={styles.inputBoxValue}>1</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputBoxLabel}>Months</Text>
            <Text style={styles.inputBoxValue}>6</Text>
          </View>
        </View>

        <Text style={styles.maturingText}>Maturing on 23 Dec 2027</Text>

        <View style={styles.separator} />

        <Text style={styles.interestRateLabel}>Interest rate</Text>
        <Text style={styles.interestRateValue}>6.55 % p.a.</Text>

        {/* Custom Bar Chart */}
        <View style={styles.chartContainer}>
          {chartData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <TouchableOpacity 
                key={index} 
                style={styles.chartColumn} 
                activeOpacity={0.8}
                onPress={() => setActiveIndex(index)}
              >
                {/* The Bar */}
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: scaleV(120 * item.heightFactor), 
                        backgroundColor: isActive ? '#FFFFFF' : '#8A8D9B' 
                      }
                    ]} 
                  />
                </View>
                
                {/* Axis Line Segments */}
                <View style={styles.axisLineContainer}>
                  <View style={[styles.axisHalfLine, { backgroundColor: index <= activeIndex ? '#2E88FF' : '#4A5568' }]} />
                  {isActive && <View style={styles.axisDot} />}
                  <View style={[styles.axisHalfLine, { backgroundColor: index < activeIndex ? '#2E88FF' : '#4A5568' }]} />
                </View>

                {/* X-Axis Label */}
                <Text style={[styles.chartLabel, { color: isActive ? '#FFFFFF' : '#8A8D9B' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomSection}>
        <View style={[styles.confirmButtonContainer, { overflow: 'hidden', backgroundColor: 'transparent' }]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="confirmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                  <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#confirmGrad)" />
            </Svg>
          </View>
          <TouchableOpacity style={styles.confirmButtonTouch} activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
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
    alignItems: 'center',
    paddingHorizontal: scaleH(15),
    paddingTop: scaleV(15),
    paddingBottom: scaleV(10),
  },
  backButton: {
    padding: scaleH(5),
  },
  scrollContent: {
    paddingHorizontal: scaleH(20),
    paddingBottom: scaleV(120), // Space for bottom button
  },
  title: {
    color: '#FFFFFF',
    fontSize: scaleF(24),
    fontWeight: 'bold',
    marginTop: scaleV(10),
    marginBottom: scaleV(8),
  },
  subtitle: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
    lineHeight: scaleV(20),
    marginBottom: scaleV(25),
  },
  tenureLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleV(15),
  },
  tenureLabel: {
    color: '#E0E0E0',
    fontSize: scaleF(16),
  },
  inputBoxesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleV(20),
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4A5568',
    borderRadius: scaleH(8),
    paddingVertical: scaleV(12),
    alignItems: 'center',
    marginHorizontal: scaleH(5),
  },
  inputBoxLabel: {
    color: '#E0E0E0',
    fontSize: scaleF(16),
    marginBottom: scaleV(5),
  },
  inputBoxValue: {
    color: '#E0E0E0',
    fontSize: scaleF(16),
  },
  maturingText: {
    color: '#E0E0E0',
    fontSize: scaleF(14),
    marginBottom: scaleV(20),
    marginLeft: scaleH(5),
  },
  separator: {
    height: 1,
    backgroundColor: '#4A5568',
    width: '100%',
    marginBottom: scaleV(20),
  },
  interestRateLabel: {
    color: '#E0E0E0',
    fontSize: scaleF(16),
    marginBottom: scaleV(10),
  },
  interestRateValue: {
    color: '#FFFFFF',
    fontSize: scaleF(28),
    fontWeight: 'bold',
    marginBottom: scaleV(30),
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: scaleV(160),
    justifyContent: 'space-between',
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: scaleH(1),
  },
  barWrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
  },
  axisLineContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  axisHalfLine: {
    flex: 1,
    height: 2,
  },
  axisDot: {
    position: 'absolute',
    width: scaleH(10),
    height: scaleH(10),
    borderRadius: scaleH(5),
    backgroundColor: '#2E88FF',
    zIndex: 2,
  },
  chartLabel: {
    fontSize: scaleF(8),
    marginTop: scaleV(8),
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: scaleH(20),
    paddingBottom: scaleV(35), // accounting for safe area on iOS
    backgroundColor: AppTheme.colors.background, // Block scrolling content
  },
  confirmButtonContainer: {
    width: '100%',
    height: scaleV(55),
    borderRadius: scaleH(12),
  },
  confirmButtonTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: 'bold',
  },
});
