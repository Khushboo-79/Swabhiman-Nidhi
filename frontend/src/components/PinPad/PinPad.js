import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect, Path } from 'react-native-svg';
import { AppTheme, scaleV, scaleH, scaleF } from '../../constants/AppTheme';

export const PinPad = ({ onPressKey, onDelete, onDone, showDone = false, bottomContent }) => {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    [showDone ? 'done' : '', '0', 'delete']
  ];

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="padGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FDE863" />
              <Stop offset="100%" stopColor="#BB8E20" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#padGrad)" rx={scaleH(12)} />
        </Svg>
      </View>

      <View style={styles.padContent}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key, colIndex) => {
              if (key === '') {
                return <View key={colIndex} style={styles.emptyKey} />;
              }
              if (key === 'done') {
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.doneKey}
                    onPress={onDone}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.doneKeyText}>Done</Text>
                  </TouchableOpacity>
                );
              }

              if (key === 'delete') {
                return (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.deleteKey}
                    onPress={onDelete}
                    activeOpacity={0.7}
                  >
                    <Svg width={scaleH(28)} height={scaleV(24)} viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                      <Path d="M18 9l-6 6" />
                      <Path d="M12 9l6 6" />
                    </Svg>
                  </TouchableOpacity>
                );
              }

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={styles.key}
                  onPress={() => onPressKey(key)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        {bottomContent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: scaleV(15),
    paddingBottom: scaleV(30),
    paddingHorizontal: scaleH(10),
    borderTopLeftRadius: scaleH(12),
    borderTopRightRadius: scaleH(12),
    overflow: 'hidden',
  },
  padContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: scaleV(10),
  },
  key: {
    width: scaleH(105),
    height: scaleV(55),
    backgroundColor: '#FFFDF6', // slightly warm white
    borderRadius: scaleH(8),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  keyText: {
    fontSize: scaleF(22),
    fontWeight: 'bold',
    color: '#06102B',
  },
  emptyKey: {
    width: scaleH(105),
    height: scaleV(55),
  },
  doneKey: {
    width: scaleH(105),
    height: scaleV(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneKeyText: {
    fontSize: scaleF(18),
    fontWeight: '600',
    color: '#06102B',
  },
  deleteKey: {
    width: scaleH(105),
    height: scaleV(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
