import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Image
              source={require('../../Images/Logo/logo.jpeg')}
              style={styles.logoCircle}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity style={styles.infoIconContainer}>
            <Icon name="information-outline" size={scaleH(24)} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Top Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Bank</Text>
            <View style={styles.tabIndicatorActive} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabInactive}>
            <Text style={styles.tabTextInactive}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabInactive} onPress={() => navigation.navigate('FDRD')}>
            <Text style={styles.tabTextInactive}>FD/RD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabInactive}>
            <Text style={styles.tabTextInactive}>Others</Text>
          </TouchableOpacity>
        </View>

        {/* Account Info Section */}
        <View style={styles.accountInfoContainer}>
          <Text style={styles.accountTitle}>NIDHI111 X23456</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <View style={styles.balanceDots}>
              <View style={styles.balanceDot} />
              <View style={styles.balanceDot} />
              <View style={styles.balanceDot} />
              <View style={styles.balanceDot} />
            </View>
          </View>

          <View style={styles.accountActionsRow}>
            <TouchableOpacity style={styles.accountActionBtn}>
              <Icon name="plus-circle-outline" size={scaleH(18)} color="#FFFFFF" />
              <Text style={styles.accountActionText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountActionBtn}>
              <Icon name="magnify" size={scaleH(18)} color="#FFFFFF" />
              <Text style={styles.accountActionText}>Overview</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo Banner */}
        <TouchableOpacity style={styles.promoBanner}>
          <Text style={styles.promoText}>Get premium perks with Metal Debit Card in 5 colours</Text>
          <View style={styles.promoIconContainer}>
            <Icon name="chevron-right-circle-outline" size={scaleH(20)} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Debit Card Button */}
        <View style={[styles.debitCardButton, { overflow: 'hidden', backgroundColor: 'transparent', paddingHorizontal: 0 }]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="debitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor="#FDE863" />
                  <Stop offset="100%" stopColor="#BB8E20" />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#debitGrad)" />
            </Svg>
          </View>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: scaleH(20), width: '100%' }} activeOpacity={0.8}>
            <Text style={styles.debitCardText}>Debit Card</Text>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Grid Actions */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.gridIconWrapper}>
                <Icon name="bank-outline" size={scaleH(40)} color="#6BA4FF" />
              </View>
              <Text style={styles.gridText}>Bank Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.gridIconWrapper}>
                <Icon name="line-scan" size={scaleH(35)} color="#4B7BFF" />
              </View>
              <Text style={styles.gridText}>Scan & Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.gridIconWrapper}>
                <Icon name="receipt" size={scaleH(40)} color="#6BA4FF" />
              </View>
              <Text style={styles.gridText}>Recharge/Bills</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.gridRow}>
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.gridIconWrapper}>
                <Image
                  source={require('../../Images/bgImages/upi.webp')}
                  style={{ width: scaleH(40), height: scaleH(40), resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.gridText}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.gridIconWrapper}>
                <Image
                  source={require('../../Images/bgImages/piggyBank.webp')}
                  style={{ width: scaleH(40), height: scaleH(40), resizeMode: 'contain' }}
                />
              </View>
              <Text style={styles.gridText}>Send Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridItem}>
              <View style={styles.gridIconWrapper}>
                <Icon name="lock-outline" size={scaleH(40)} color="#FFB800" />
              </View>
              <Text style={styles.gridText}>Digilocker</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>TRANSACTIONS</Text>

          <TouchableOpacity style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View style={styles.transactionAvatar}>
                <Text style={styles.transactionAvatarText}>J</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>Johnny Jhon</Text>
                <Text style={styles.transactionMeta}>UPI . 23 June 2026, 11:01 AM</Text>
              </View>
            </View>
            <Text style={styles.transactionAmount}>-Rs.40.23</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.transactionCard}>
            <View style={styles.transactionLeft}>
              <View style={styles.transactionAvatar}>
                <Text style={styles.transactionAvatarText}>J</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>Johnny Jhon</Text>
                <Text style={styles.transactionMeta}>UPI . 23 June 2026, 11:01 AM</Text>
              </View>
            </View>
            <Text style={styles.transactionAmount}>-Rs.40.23</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.viewMoreText}>View more</Text>
          </TouchableOpacity>
        </View>

        {/* Activity Centre Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>ACTIVITY CENTRE</Text>
          <TouchableOpacity style={styles.activityCard}>
            <View style={styles.activityIconCircle} />
            <Text style={styles.activityText}>Account Statement</Text>
            <Icon name="chevron-right" size={scaleH(20)} color="#000000" style={styles.activityArrow} />
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Custom Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="home" size={scaleH(28)} color="#000000" />
          <Text style={styles.tabBarTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="credit-card-outline" size={scaleH(28)} color="#000000" />
          <Text style={styles.tabBarText}>Payments</Text>
        </TouchableOpacity>

        <View style={styles.tabBarSpacer} />

        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="sack-percent" size={scaleH(28)} color="#000000" />
          <Text style={styles.tabBarText}>Loans</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabBarItem}>
          <Icon name="view-grid-outline" size={scaleH(28)} color="#000000" />
          <Text style={styles.tabBarText}>Menu</Text>
        </TouchableOpacity>

        {/* Floating Scan Button */}
        <View style={[styles.scanButton, { overflow: 'hidden', backgroundColor: 'transparent' }]}>
          <View style={StyleSheet.absoluteFill}>
            <Svg height="100%" width="100%">
              <Defs>
                <LinearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <Stop offset="0%" stopColor={AppTheme.colors.premiumGradientStart} />
                  <Stop offset="100%" stopColor={AppTheme.colors.premiumGradientEnd} />
                </LinearGradient>
              </Defs>
              <Rect width="100%" height="100%" fill="url(#scanGrad)" />
            </Svg>
          </View>
          <TouchableOpacity style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} activeOpacity={0.8}>
            <Icon name="line-scan" size={scaleH(40)} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppTheme.colors.background,
  },
  scrollContent: {
    paddingBottom: scaleV(120), // Extra space for bottom tab bar
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
    paddingTop: scaleV(15),
    marginBottom: scaleV(20),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: scaleH(36),
    height: scaleH(36),
    borderRadius: scaleH(18),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleH(10),
  },
  logoText: {
    color: '#FFB800',
    fontSize: scaleF(24),
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  infoIconContainer: {
    padding: scaleH(5),
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(30),
  },
  tabActive: {
    alignItems: 'center',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '600',
    marginBottom: scaleV(6),
  },
  tabIndicatorActive: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFB800',
  },
  tabInactive: {
    alignItems: 'center',
  },
  tabTextInactive: {
    color: '#A0A5B5',
    fontSize: scaleF(14),
    fontWeight: '500',
    marginBottom: scaleV(6),
  },
  accountInfoContainer: {
    alignItems: 'center',
    marginBottom: scaleV(25),
  },
  accountTitle: {
    color: '#EBEBEB',
    fontSize: scaleF(16),
    fontWeight: 'bold',
    marginBottom: scaleV(20),
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleV(30),
  },
  rupeeSymbol: {
    color: '#FFFFFF',
    fontSize: scaleF(18),
    marginRight: scaleH(10),
  },
  balanceDots: {
    flexDirection: 'row',
  },
  balanceDot: {
    width: scaleH(10),
    height: scaleH(10),
    borderRadius: scaleH(5),
    backgroundColor: '#FFFFFF',
    marginHorizontal: scaleH(4),
  },
  accountActionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scaleH(40),
    marginBottom: scaleV(15),
  },
  accountActionText: {
    color: '#FFFFFF',
    fontSize: scaleF(16),
    fontWeight: 'bold',
    marginLeft: scaleH(8),
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(30),
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '400',
    flex: 1,
    paddingRight: scaleH(20),
    lineHeight: scaleV(20),
  },
  promoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  debitCardButton: {
    marginHorizontal: scaleH(20),
    height: scaleV(65),
    borderRadius: scaleH(16),
    backgroundColor: '#FDE863',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(25),
  },
  debitCardText: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  gridContainer: {
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(25),
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleV(25),
  },
  gridItem: {
    alignItems: 'center',
    width: '30%',
  },
  gridIconWrapper: {
    marginBottom: scaleV(8),
  },
  gridText: {
    color: '#FFFFFF',
    fontSize: scaleF(12),
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: scaleH(20),
    marginBottom: scaleV(25),
  },
  sectionTitle: {
    color: '#EBEBEB',
    fontSize: scaleF(14),
    fontWeight: 'bold',
    marginBottom: scaleV(15),
  },
  transactionCard: {
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(12),
    padding: scaleH(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleV(10),
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAvatar: {
    width: scaleH(45),
    height: scaleH(45),
    borderRadius: scaleH(22.5),
    backgroundColor: '#A0A5B5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleH(12),
    borderWidth: 1,
    borderColor: '#777',
  },
  transactionAvatarText: {
    color: '#000000',
    fontSize: scaleF(18),
    fontWeight: '400',
  },
  transactionDetails: {
    justifyContent: 'center',
  },
  transactionName: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: '400',
    marginBottom: scaleV(2),
  },
  transactionMeta: {
    color: '#555555',
    fontSize: scaleF(11),
  },
  transactionAmount: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: '400',
  },
  viewMoreText: {
    color: '#FFB800',
    fontSize: scaleF(14),
    fontWeight: '500',
    marginTop: scaleV(5),
  },
  activityCard: {
    backgroundColor: '#EBEBEB',
    borderRadius: scaleH(12),
    padding: scaleH(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconCircle: {
    width: scaleH(40),
    height: scaleH(40),
    borderRadius: scaleH(20),
    backgroundColor: '#A0A5B5',
    marginRight: scaleH(12),
    borderWidth: 1,
    borderColor: '#777',
  },
  activityText: {
    color: '#000000',
    fontSize: scaleF(14),
    fontWeight: '400',
    flex: 1,
  },
  activityArrow: {
    marginRight: scaleH(5),
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#EBEBEB',
    height: scaleV(70),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleH(15),
    borderTopLeftRadius: scaleH(20),
    borderTopRightRadius: scaleH(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scaleH(60),
  },
  tabBarTextActive: {
    color: '#000000',
    fontSize: scaleF(10),
    fontWeight: 'bold',
    marginTop: scaleV(2),
  },
  tabBarText: {
    color: '#000000',
    fontSize: scaleF(10),
    fontWeight: '600',
    marginTop: scaleV(2),
  },
  tabBarSpacer: {
    width: scaleH(70), // Leave space for the floating action button
  },
  scanButton: {
    position: 'absolute',
    bottom: scaleV(25),
    left: '55%',
    transform: [{ translateX: -scaleH(35) }],
    width: scaleH(70),
    height: scaleH(70),
    borderRadius: scaleH(35),
    backgroundColor: '#FDE863', // Gold/Yellow color
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});
