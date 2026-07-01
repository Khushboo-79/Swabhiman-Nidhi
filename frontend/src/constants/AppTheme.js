import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Standard design width and height (e.g., iPhone 11/12/13 Pro dimensions)
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

/**
 * Scale Horizontally (scaleH)
 * Use for width, paddingHorizontal, marginHorizontal, left/right
 */
export const scaleH = (size) => (SCREEN_WIDTH / DESIGN_WIDTH) * size;

/**
 * Scale Vertically (scaleV)
 * Use for height, paddingVertical, marginVertical, top/bottom
 */
export const scaleV = (size) => (SCREEN_HEIGHT / DESIGN_HEIGHT) * size;

/**
 * Scale Font (scaleF)
 * Scales the font based on the device pixel ratio to maintain readability
 */
export const scaleF = (size) => {
  // Increased base scale modifier by 15% to make all text globally larger as requested
  const baseScaleModifier = 1.15; 
  const newSize = size * (SCREEN_WIDTH / DESIGN_WIDTH) * baseScaleModifier;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    // Removed the previous -1 subtraction so Android text doesn't shrink unnecessarily
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
};

export const AppTheme = {
  colors: {
    primary: '#06102B',
    secondary: '#1A2A4C',
    accent: '#FFB800', // Gold/Yellow accent
    background: '#041537',
    textPrimary: '#000000',
    textSecondary: '#666666',
    error: '#FF3B30',
    success: '#34C759',
    border: '#E5E5E5',
    white: '#FFFFFF',
    premiumGradientStart: '#FDE863',
    premiumGradientEnd: '#BB8E20',
  },
  typography: {
    h1: scaleF(42),
    h2: scaleF(30),
    h3: scaleF(24),
    body: scaleF(18),
    caption: scaleF(16),
    small: scaleF(14),
  },
  spacing: {
    xs: scaleH(4),
    sm: scaleH(8),
    md: scaleH(16),
    lg: scaleH(24),
    xl: scaleH(32),
    xxl: scaleH(48),
  },
  dimensions: {
    screenWidth: SCREEN_WIDTH,
    screenHeight: SCREEN_HEIGHT,
  },
};
