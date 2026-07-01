import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../../constants/AppTheme';

export const ReviewDetailsScreen = ({ navigation }) => {
  const [autoRenew, setAutoRenew] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
          <Icon name="chevron-left" size={scaleH(30)} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review details</Text>
        <View style={{ width: scaleH(30) }} /> {/* Empty view for title centering */}
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Nominee Card (Expanded) */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Nominee</Text>
            <Icon name="chevron-up" size={scaleH(24)} color="#000000" />
          </View>
          <Text style={styles.nomineeDescription}>
            A nominee receives the proceeds of your FD in the unforeseen incident of your demise
          </Text>
          
          <View style={styles.nomineeSelectedRow}>
            <Text style={styles.nomineeName}>SHIKHA VERMA</Text>
            <View style={styles.nomineeRelationBadge}>
              <Text style={styles.nomineeRelationText}>MOTHER</Text>
              <Icon name="check-circle" size={scaleH(20)} color="#2E88FF" style={{ marginLeft: scaleH(5) }} />
            </View>
          </View>

          <View style={styles.nomineeActionsRow}>
            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.nomineeActionText}>Add new</Text>
            </TouchableOpacity>
            <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Text style={styles.nomineeActionText}>Skip for now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FD Card (Collapsed) */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>FD</Text>
            <Icon name="chevron-down" size={scaleH(24)} color="#000000" />
          </View>
          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>FD amount</Text>
            <Text style={styles.detailValueBold}>₹25,500</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>FD name</Text>
            <Text style={styles.detailValue}>----</Text>
          </View>
        </View>

        {/* FD amount Card (Expanded) */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>FD amount</Text>
            <Icon name="chevron-up" size={scaleH(24)} color="#000000" />
          </View>
          
          <View style={{ marginTop: scaleV(15), borderRadius: scaleH(12), overflow: 'hidden' }}>
            <View style={StyleSheet.absoluteFill}>
              <Svg height="100%" width="100%">
                <Defs>
                  <LinearGradient id="fdAmountGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#A0A4AF" />
                    <Stop offset="50%" stopColor="#E1E3E8" />
                    <Stop offset="100%" stopColor="#A0A4AF" />
                  </LinearGradient>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#fdAmountGrad)" />
              </Svg>
            </View>
            <View style={{ paddingVertical: scaleV(25), paddingHorizontal: scaleH(20), alignItems: 'center' }}>
              <Text style={{ color: '#000000', fontSize: scaleF(15), fontWeight: '600', marginBottom: scaleV(8) }}>Enter amount</Text>
              <Text style={{ color: '#000000', fontSize: scaleF(26), fontWeight: 'bold', marginBottom: scaleV(15) }}>₹ 2,500</Text>
              <Text style={{ color: '#4A5568', fontSize: scaleF(12) }}>Tap to enter RD name</Text>
            </View>
          </View>
        </View>

        {/* TENURE & INTEREST Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>TENURE & INTEREST</Text>
            <Icon name="chevron-down" size={scaleH(24)} color="#000000" />
          </View>
          <View style={styles.separator} />
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tenure</Text>
            <Text style={styles.detailValue}>35 months</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interest rate</Text>
            <Text style={styles.detailValue}>6.55%</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interest earned</Text>
            <Text style={[styles.detailValue, { color: '#28A745' }]}>₹2,394</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Maturity amount</Text>
            <Text style={styles.detailValue}>₹47,394</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Maturing on</Text>
            <Text style={styles.detailValue}>23 December 2027</Text>
          </View>
        </View>

        {/* Maturity Card */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Maturity</Text>
          </View>
          <View style={styles.separator} />
          
          <View style={[styles.detailRow, { alignItems: 'center' }]}>
            <Text style={styles.detailLabel}>Auto-renew FD at maturity</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#2E88FF' }}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setAutoRenew(!autoRenew)}
              value={autoRenew}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        </View>

        {/* Scrollable Bottom Section */}
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
            <TouchableOpacity style={styles.proceedButtonTouch} activeOpacity={0.8} onPress={() => navigation.navigate('AddFunds')}>
              <View style={styles.arrowCircle}>
                <Icon name="arrow-right" size={scaleH(24)} color="#FFB800" />
              </View>
              <Text style={styles.proceedButtonText}>Add fund and Book FD</Text>
              <View style={{ width: scaleH(40) }} /> {/* Spacer to perfectly center the text */}
            </TouchableOpacity>
          </View>

          {/* Terms text */}
          <Text style={styles.termsText}>
            By continuing, I agree and accept to have read and{'\n'}understood all <Text style={styles.termsLink}>Terms and Conditions</Text>
          </Text>
        </View>

      </ScrollView>
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
    paddingBottom: scaleV(15),
  },
  backButton: {
    padding: scaleH(5),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: scaleF(20),
    fontWeight: '500',
  },
  scrollContent: {
    paddingTop: scaleV(10),
    paddingBottom: scaleV(30), 
  },
  cardContainer: {
    backgroundColor: '#D9D9D9',
    marginHorizontal: scaleH(15),
    borderRadius: scaleH(12),
    paddingHorizontal: scaleH(20),
    paddingVertical: scaleV(15),
    marginBottom: scaleV(20),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#1E2B4D',
    fontSize: scaleF(16),
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#A0A5B5',
    width: '100%',
    marginVertical: scaleV(12),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleV(8),
  },
  detailLabel: {
    color: '#1E2B4D',
    fontSize: scaleF(14),
  },
  detailValue: {
    color: '#1E2B4D',
    fontSize: scaleF(14),
  },
  detailValueBold: {
    color: '#1E2B4D',
    fontSize: scaleF(14),
    fontWeight: 'bold',
  },
  nomineeDescription: {
    color: '#4A5568',
    fontSize: scaleF(13),
    marginTop: scaleV(10),
    lineHeight: scaleV(18),
  },
  nomineeSelectedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleV(20),
    marginBottom: scaleV(25),
  },
  nomineeName: {
    color: '#1E2B4D',
    fontSize: scaleF(15),
    fontWeight: 'bold',
  },
  nomineeRelationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nomineeRelationText: {
    color: '#4A5568',
    fontSize: scaleF(13),
    fontWeight: 'bold',
  },
  nomineeActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomineeActionText: {
    color: '#2E88FF',
    fontSize: scaleF(14),
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: scaleH(15),
    paddingTop: scaleV(10),
    paddingBottom: scaleV(25), 
  },
  proceedButtonContainer: {
    width: '100%',
    height: scaleV(60),
    borderRadius: scaleH(12),
    marginBottom: scaleV(15),
  },
  proceedButtonTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(10),
  },
  arrowCircle: {
    width: scaleH(40),
    height: scaleH(40),
    borderRadius: scaleH(20),
    backgroundColor: '#041537', // Deep Navy background
    justifyContent: 'center',
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: 'bold',
  },
  termsText: {
    color: '#FFFFFF',
    fontSize: scaleF(11),
    textAlign: 'center',
    lineHeight: scaleV(16),
  },
  termsLink: {
    color: '#2E88FF',
  },
});
