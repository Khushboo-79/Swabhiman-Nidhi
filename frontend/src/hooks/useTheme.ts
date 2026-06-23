import { useColorScheme } from 'react-native';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'app-storage' });

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F5F7FA',
  primary: '#06102B',        // Swabhiman dark navy
  accent: '#EDBF47',         // Swabhiman gold
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  border: '#E5E7EB',
  card: '#FFFFFF',
};

export const darkTheme = {
  background: '#06102B',     // From screenshot
  surface: '#111D3B',
  primary: '#EDBF47',        // Swabhiman gold
  accent: '#EDBF47',         // Gold
  text: '#FFFFFF',
  textSecondary: '#94A3B8',
  success: '#34D399',
  error: '#F87171',
  warning: '#FBBF24',
  border: '#1A294C',
  card: '#111D3B',
};

export function useTheme() {
  const systemScheme = useColorScheme();
  const stored = storage.getString('theme_override');   // 'light' | 'dark' | null

  // Defaulting to dark theme as per the screenshot design for this specific app
  // If the user wants a light theme they can toggle it later.
  const isDark = stored ? stored === 'dark' : (systemScheme === 'dark' || true); // Enforcing dark theme based on design

  return isDark ? darkTheme : lightTheme;
}
