import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppTheme, scaleV, scaleH, scaleF } from '../../../constants/AppTheme';

export const AddFundsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
          <Icon name="chevron-left" size={scaleH(30)} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add funds via</Text>
        <TouchableOpacity hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} style={styles.backButton}>
          <Icon name="dots-horizontal" size={scaleH(30)} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* USE A UPI APP SECTION */}
        <Text style={styles.sectionTitle}>USE A UPI APP</Text>

        <View style={styles.cardContainer}>
          {/* PhonePe Row */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <View style={styles.phonepeIconContainer}>
                <Text style={styles.phonepeIconText}>पे</Text>
              </View>
              <Text style={styles.rowText}>PhonePe</Text>
            </View>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </TouchableOpacity>

          <View style={styles.separator} />

          {/* Other UPI Apps Row */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <View style={styles.placeholderIconSpacing} />
              <Text style={styles.rowText}>Other UPI Apps</Text>
            </View>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Generate QR Row */}
        <TouchableOpacity style={styles.cardContainer} activeOpacity={0.7}>
          <View style={styles.rowItem}>
            <View style={styles.rowLeft}>
              <Icon name="qrcode-scan" size={scaleH(24)} color="#000000" style={styles.leftIcon} />
              <Text style={styles.rowText}>Generate UPI QR code</Text>
            </View>
            <Icon name="chevron-right" size={scaleH(24)} color="#000000" />
          </View>
        </TouchableOpacity>

        {/* OTHER FUNDING OPTIONS SECTION */}
        <Text style={[styles.sectionTitle, { marginTop: scaleV(30) }]}>OTHER FUNDING OPTIONS</Text>

        <View style={styles.warningBanner}>
          <Icon name="alert" size={scaleH(24)} color="#FFB800" />
          <Text style={styles.warningText}>
            Available only for transacttions above{'\n'}Rs.2000
          </Text>
        </View>

        <View style={styles.cardContainer}>
          {/* Debit Card Row */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Icon name="credit-card-outline" size={scaleH(24)} color="#000000" style={styles.leftIcon} />
              <Text style={styles.rowText}>Debit Card</Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.separator, { marginLeft: scaleH(50) }]} />

          {/* Net Banking Row */}
          <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Icon name="credit-card-multiple-outline" size={scaleH(24)} color="#000000" style={styles.leftIcon} />
              <Text style={styles.rowText}>Net Banking</Text>
            </View>
          </TouchableOpacity>
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
    paddingTop: scaleV(20),
    paddingBottom: scaleV(40),
    paddingHorizontal: scaleH(15),
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: scaleF(14),
    fontWeight: '500',
    marginBottom: scaleV(12),
    textTransform: 'uppercase',
  },
  cardContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: scaleH(12),
    marginBottom: scaleV(20),
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleV(18),
    paddingHorizontal: scaleH(20),
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phonepeIconContainer: {
    backgroundColor: '#5F259F', // PhonePe Purple
    width: scaleH(32),
    height: scaleH(32),
    borderRadius: scaleH(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleH(15),
  },
  phonepeIconText: {
    color: '#FFFFFF',
    fontSize: scaleF(18),
    fontWeight: 'bold',
  },
  placeholderIconSpacing: {
    width: scaleH(32),
    marginRight: scaleH(15),
  },
  leftIcon: {
    marginRight: scaleH(15),
    width: scaleH(32),
    textAlign: 'center',
  },
  rowText: {
    color: '#1E2B4D',
    fontSize: scaleF(16),
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#A0A5B5',
    width: '100%',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleV(10),
    paddingHorizontal: scaleH(5),
  },
  warningText: {
    color: '#FFFFFF',
    fontSize: scaleF(12),
    marginLeft: scaleH(10),
    lineHeight: scaleV(20),
    marginBottom: scaleV(10),
  },
});
