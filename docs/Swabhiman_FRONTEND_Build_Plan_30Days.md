# Swabhiman Pawan Nidhi — Frontend Build Plan (30 Days)
**Stack: React Native CLI + TypeScript**
Version 1.0 | June 22, 2026 | Confidential

---

## Quick Reference

| Item | Detail |
|------|--------|
| Framework | React Native CLI 0.74.x |
| Language | TypeScript 5.x (strict mode) |
| State Management | Redux Toolkit + RTK Query |
| Navigation | React Navigation v7 (Native Stack + Bottom Tabs) |
| Secure Storage | react-native-keychain |
| Biometrics | react-native-biometrics |
| Local Cache | react-native-mmkv (AES-256 encrypted) |
| Camera / QR | react-native-vision-camera |
| Push Notifications | @react-native-firebase/messaging + @notifee/react-native |
| PDF | react-native-pdf + react-native-blob-util |
| Lists | react-native-flash-list |
| Images | react-native-fast-image |
| i18n | react-i18next + i18next |
| Permissions | react-native-permissions |
| Testing | Jest + React Native Testing Library + Detox |
| CI/CD | GitHub Actions + Fastlane |

---

## 30-Day Sprint Overview

| Week | Days | Focus |
|------|------|-------|
| Week 1 | Day 1–7 | Project setup, navigation, auth screens, onboarding |
| Week 2 | Day 8–14 | Dashboard, accounts, fund transfer, beneficiaries |
| Week 3 | Day 15–21 | FD, loans, BBPS, UPI, QR scanner, notifications |
| Week 4 | Day 22–30 | Security center, profile, KYC, disputes, testing, store submission |

---

## Day-by-Day Plan

### WEEK 1 — Setup, Auth & Onboarding (Days 1–7)

#### Day 1 — Project Bootstrap & Core Setup

**Initialize project:**
```bash
npx react-native@latest init SwabhimanApp --template react-native-template-typescript
cd SwabhimanApp
```

**Install all dependencies (run once):**
```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# State management
npm install @reduxjs/toolkit react-redux

# Security & storage
npm install react-native-keychain
npm install react-native-mmkv
npm install react-native-biometrics

# Camera
npm install react-native-vision-camera

# Firebase
npm install @react-native-firebase/app @react-native-firebase/messaging
npm install @notifee/react-native

# PDF & file
npm install react-native-pdf react-native-blob-util

# Device & permissions
npm install react-native-device-info
npm install react-native-permissions

# UI & UX
npm install react-native-flash-list
npm install react-native-fast-image
npm install react-native-splash-screen
npm install react-native-haptic-feedback

# i18n
npm install react-i18next i18next

# Networking & utils
npm install axios
npm install uuid

# WebSocket (support chat)
npm install @stomp/stompjs sockjs-client

# QR code generation
npm install react-native-qrcode-svg react-native-svg

# Date picker
npm install react-native-date-picker

# Config (env files)
npm install react-native-config

cd ios && pod install && cd ..
```

**Full folder structure:**
```
SwabhimanApp/
├── android/
├── ios/
├── src/
│   ├── api/
│   │   ├── baseApi.ts              # RTK Query base + JWT inject + refresh
│   │   ├── authApi.ts
│   │   ├── onboardingApi.ts
│   │   ├── dashboardApi.ts
│   │   ├── accountApi.ts
│   │   ├── transferApi.ts
│   │   ├── fdApi.ts
│   │   ├── loanApi.ts
│   │   ├── bbpsApi.ts
│   │   ├── upiApi.ts
│   │   ├── notificationApi.ts
│   │   ├── supportApi.ts
│   │   ├── profileApi.ts
│   │   ├── securityApi.ts
│   │   ├── kycApi.ts
│   │   ├── nomineeApi.ts
│   │   └── disputeApi.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── i18n/
│   │       ├── en.json
│   │       ├── hi.json
│   │       └── mr.json             # Add regional languages as needed
│   │
│   ├── components/                 # Reusable atoms & molecules
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   ├── Input/
│   │   │   └── Input.tsx
│   │   ├── Card/
│   │   │   └── Card.tsx
│   │   ├── OTPInput/
│   │   │   └── OTPInput.tsx        # 6-cell OTP input
│   │   ├── PinPad/
│   │   │   └── PinPad.tsx          # MPIN number pad
│   │   ├── SkeletonLoader/
│   │   │   └── SkeletonLoader.tsx
│   │   ├── AmountInput/
│   │   │   └── AmountInput.tsx     # INR formatted amount input
│   │   ├── TransactionRow/
│   │   │   └── TransactionRow.tsx
│   │   ├── BottomSheet/
│   │   │   └── BottomSheet.tsx
│   │   ├── EmptyState/
│   │   │   └── EmptyState.tsx
│   │   ├── ErrorBoundary/
│   │   │   └── ErrorBoundary.tsx
│   │   └── SecurityFAB/
│   │       └── SecurityFAB.tsx     # Always-visible emergency button
│   │
│   ├── features/
│   │   ├── splash/
│   │   │   └── SplashScreen.tsx
│   │   ├── onboarding/
│   │   │   ├── screens/
│   │   │   │   ├── LanguageSelectScreen.tsx
│   │   │   │   ├── WalkthroughScreen.tsx
│   │   │   │   ├── MobileVerifyScreen.tsx
│   │   │   │   ├── PANVerifyScreen.tsx
│   │   │   │   ├── AadhaarVerifyScreen.tsx
│   │   │   │   └── VideoKYCScreen.tsx
│   │   │   └── onboardingSlice.ts
│   │   ├── auth/
│   │   │   ├── screens/
│   │   │   │   ├── LoginScreen.tsx
│   │   │   │   ├── MPINScreen.tsx
│   │   │   │   ├── BiometricScreen.tsx
│   │   │   │   ├── OTPScreen.tsx
│   │   │   │   └── SetMPINScreen.tsx
│   │   │   ├── authSlice.ts
│   │   │   └── authApi.ts
│   │   ├── dashboard/
│   │   │   └── screens/HomeScreen.tsx
│   │   ├── accounts/
│   │   │   └── screens/
│   │   │       ├── AccountsScreen.tsx
│   │   │       ├── TransactionsScreen.tsx
│   │   │       ├── StatementScreen.tsx
│   │   │       └── PassbookScreen.tsx
│   │   ├── transfer/
│   │   │   └── screens/
│   │   │       ├── TransferHomeScreen.tsx
│   │   │       ├── BeneficiaryListScreen.tsx
│   │   │       ├── AddBeneficiaryScreen.tsx
│   │   │       ├── TransferAmountScreen.tsx
│   │   │       ├── TransferReviewScreen.tsx
│   │   │       └── TransferSuccessScreen.tsx
│   │   ├── upi/
│   │   ├── qrScanner/
│   │   ├── fd/
│   │   ├── loan/
│   │   ├── billPayment/
│   │   ├── notifications/
│   │   ├── support/
│   │   ├── profile/
│   │   ├── security/
│   │   ├── kyc/
│   │   ├── nominees/
│   │   └── disputes/
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx
│   │   ├── AuthStack.tsx
│   │   ├── OnboardingStack.tsx
│   │   ├── MainTabNavigator.tsx
│   │   ├── HomeStack.tsx
│   │   ├── PaymentsStack.tsx
│   │   ├── AccountsStack.tsx
│   │   └── ProfileStack.tsx
│   │
│   ├── store/
│   │   ├── index.ts
│   │   └── rootReducer.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   ├── useSecureStore.ts
│   │   ├── useBiometrics.ts
│   │   ├── useInactivityTimer.ts
│   │   └── useAppState.ts
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts       # ₹1,23,456.78 format
│   │   ├── formatDate.ts
│   │   ├── validators.ts
│   │   ├── idempotencyKey.ts       # UUID v4 generator
│   │   ├── cryptoHelpers.ts        # PBKDF2 for MPIN
│   │   └── deepLinkParser.ts       # UPI intent string parser
│   │
│   └── types/
│       ├── api.types.ts
│       ├── navigation.types.ts
│       └── auth.types.ts
│
├── __tests__/
├── e2e/
├── .env.development
├── .env.staging
└── .env.production
```

**Environment config (`.env.development`):**
```
API_BASE_URL=http://localhost:8080/api/v1
WS_URL=ws://localhost:8080/ws
UPI_ENABLED=false
VCIP_VENDOR=mock
APP_ENV=development
```

---

#### Day 2 — Theme System, Navigation Shell & Redux Store

**Theme system (`src/hooks/useTheme.ts`):**
```typescript
import { useColorScheme } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'app-storage', encryptionKey: 'loaded-from-keychain' });

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F5F7FA',
  primary: '#1A3C6E',        // Deep navy — brand color
  accent: '#F5A623',         // Gold — NBFC trust signal
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  border: '#E5E7EB',
  card: '#FFFFFF',
};

export const darkTheme = {
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#3B82F6',
  accent: '#F59E0B',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  success: '#34D399',
  error: '#F87171',
  warning: '#FBBF24',
  border: '#334155',
  card: '#1E293B',
};

export function useTheme() {
  const systemScheme = useColorScheme();
  const stored = storage.getString('theme_override');   // 'light' | 'dark' | null
  const isDark = stored ? stored === 'dark' : systemScheme === 'dark';
  return isDark ? darkTheme : lightTheme;
}
```

**Redux store (`src/store/index.ts`):**
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';
import authReducer from '../features/auth/authSlice';
import onboardingReducer from '../features/onboarding/onboardingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**RTK Query base API with JWT refresh (`src/api/baseApi.ts`):**
```typescript
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: Config.API_BASE_URL,
  prepareHeaders: async (headers) => {
    const creds = await Keychain.getGenericPassword({ service: 'access_token' });
    if (creds) headers.set('Authorization', `Bearer ${creds.password}`);
    const deviceId = await DeviceInfo.getUniqueId();
    headers.set('X-Device-ID', deviceId);
    return headers;
  },
});

// Wrap with refresh logic: on 401, try refresh → retry once
const baseQueryWithReauth: typeof rawBaseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const refreshCreds = await Keychain.getGenericPassword({ service: 'refresh_token' });
    if (refreshCreds) {
      const refreshResult = await rawBaseQuery(
        { url: '/auth/refresh', method: 'POST', body: { refresh_token: refreshCreds.password } },
        api, extraOptions
      );
      if (refreshResult.data) {
        const { access_token, refresh_token } = refreshResult.data as any;
        await Keychain.setGenericPassword('token', access_token, { service: 'access_token' });
        await Keychain.setGenericPassword('token', refresh_token, { service: 'refresh_token' });
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        // Refresh failed — force logout
        api.dispatch({ type: 'auth/logout' });
      }
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Account', 'FD', 'Loan', 'Beneficiary', 'Notification', 'Nominee', 'Dispute'],
  endpoints: () => ({}),
});
```

**Navigation shell (`src/navigation/RootNavigator.tsx`):**
```typescript
// Checks auth state on mount → routes to correct stack
// SplashScreen visible until Redux hydration + auth check complete
```

---

#### Day 3 — Auth Screens (Login, MPIN, OTP)

**`LoginScreen.tsx`** — method selector: tabs for Password / OTP / MPIN / Biometric

**`PinPad` component** (shared, used for MPIN + new MPIN setup):
```typescript
// 4 or 6 circular indicators (filled/empty)
// Custom number grid (0-9, backspace, biometric shortcut)
// No system keyboard — custom layout
// Shake animation on wrong MPIN (react-native-reanimated)
```

**MPIN hash before transmission (`src/utils/cryptoHelpers.ts`):**
```typescript
import { NativeModules } from 'react-native';

// Use react-native-quick-crypto or native module for PBKDF2
// salt = device_id + customer_id (both known client-side)
export async function hashMPIN(mpin: string, deviceId: string, customerId: string): Promise<string> {
  const salt = `${deviceId}${customerId}`;
  // PBKDF2: 100,000 iterations, SHA-256, 32-byte output
  // Return as hex string
}
```

**`OTPInput` component:**
```typescript
// 6 individual TextInput cells, auto-focus-next on digit entry
// Auto-submit on last digit filled
// Countdown timer (3:00 → 0:00 → show Resend button)
// Paste handler: detect 6-digit clipboard content → fill all cells
```

**`authSlice.ts`:**
```typescript
interface AuthState {
  customerId: string | null;
  isAuthenticated: boolean;
  deviceId: string | null;
  sessionId: string | null;
  requires2FA: boolean;
}

// Actions: loginSuccess, logout, set2FARequired, clearSession
// On logout: clear Keychain (access + refresh tokens), clear MMKV flags, navigate to Login
```

**Auto-logout (`src/hooks/useInactivityTimer.ts`):**
```typescript
// 5 min inactivity timer
// Reset on any touch event (TouchableOpacity, ScrollView, TextInput)
// Use AppState listener to detect background → start aggressive timer (2 min in background)
// On timeout: dispatch logout action
```

---

#### Day 4 — Biometric Auth + Secure Storage

**`BiometricScreen.tsx`:**
```typescript
import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

// Setup (first time):
async function registerBiometric(customerId: string) {
  const { publicKey } = await rnBiometrics.createKeys();
  // POST /auth/biometric/register { publicKey, device_id }
}

// Login:
async function biometricLogin(deviceId: string) {
  // GET /auth/biometric/challenge → { challenge }
  const { signature } = await rnBiometrics.createSignature({
    promptMessage: 'Verify to login to Swabhiman',
    payload: challenge,
  });
  // POST /auth/biometric/verify { signature, challenge, device_id }
}

// Graceful fallback: if biometric not available → show MPIN option
```

**Secure storage helpers (`src/hooks/useSecureStore.ts`):**
```typescript
import * as Keychain from 'react-native-keychain';

// RULE: Keychain ONLY for secrets. Never AsyncStorage, never MMKV for tokens.
export const SecureStore = {
  saveAccessToken: (token: string) =>
    Keychain.setGenericPassword('token', token, { service: 'access_token' }),
  getAccessToken: () =>
    Keychain.getGenericPassword({ service: 'access_token' }),
  saveRefreshToken: (token: string) =>
    Keychain.setGenericPassword('token', token, { service: 'refresh_token' }),
  clearAll: () => Promise.all([
    Keychain.resetGenericPassword({ service: 'access_token' }),
    Keychain.resetGenericPassword({ service: 'refresh_token' }),
    Keychain.resetGenericPassword({ service: 'biometric_key' }),
  ]),
};
```

**Screenshot prevention:**
```typescript
// Android: in MainActivity.java
// import android.view.WindowManager;
// getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);

// iOS: in AppDelegate.mm
// Add UIScreen.isCaptured guard for financial screens
// Use a library: react-native-prevent-screenshot or manual native code
```

---

#### Day 5 — Onboarding Screens (Language, Walkthrough, Device Register)

**`LanguageSelectScreen.tsx`:**
```typescript
// Show flag + language name grid
// On select: i18next.changeLanguage('hi') → persist to MMKV
// No restart required — all Text components use t() hook
// Navigate to Walkthrough

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/i18n/en.json';
import hi from '../assets/i18n/hi.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: MMKV.getString('selected_language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});
```

**`WalkthroughScreen.tsx`:**
```typescript
// 3-4 swipeable screens using FlatList with pagingEnabled
// Screens: "Safe Banking", "Easy Transfers", "FD & Loans", "Complete Security"
// Dot indicator at bottom
// Skip button (top right) → navigates directly to Login/Register
// Next / Get Started button
```

**Device registration (on walkthrough completion):**
```typescript
import DeviceInfo from 'react-native-device-info';

async function registerDevice() {
  const payload = {
    device_id: await DeviceInfo.getUniqueId(),
    device_name: await DeviceInfo.getDeviceName(),
    platform: Platform.OS.toUpperCase(),
    os_version: DeviceInfo.getSystemVersion(),
    app_version: DeviceInfo.getVersion(),
    fcm_token: await messaging().getToken(),
  };
  const result = await dispatch(deviceApi.registerDevice(payload));
  await SecureStore.save('device_token', result.device_token);
}
```

---

#### Day 6 — Onboarding KYC Screens (Mobile OTP → PAN → Aadhaar → V-CIP)

**`MobileVerifyScreen.tsx`:**
```typescript
// Input: mobile number (10 digits, Indian validation)
// POST /onboarding/start → triggers OTP
// Navigate to OTPScreen with { purpose: 'ONBOARDING', ref_id }
```

**`PANVerifyScreen.tsx`:**
```typescript
// Input: PAN number (AAAAA0000A format, regex validate)
// POST /onboarding/verify-pan
// On success: navigate to AadhaarVerifyScreen
```

**`AadhaarVerifyScreen.tsx`:**
```typescript
// Input: Aadhaar number (12 digits — shown during entry, masked after confirm)
// POST /onboarding/aadhaar-otp → triggers Aadhaar OTP to registered mobile
// Show OTP screen → POST /onboarding/aadhaar-verify
// DO NOT store full Aadhaar in local state after verification
```

**`VideoKYCScreen.tsx`:**
```typescript
// 1. Pre-check: Location permission must be granted
// 2. Launch V-CIP vendor (deep-link or native bridge)
// 3. Poll GET /onboarding/{ref_id}/status every 10s
// 4. On APPROVED: navigate to success screen → POST /onboarding/create-account
// 5. On REJECTED: show rejection reason + option to retry or contact support
```

**Onboarding resume (app kill → restart):**
```typescript
// On app launch: check MMKV for saved ref_id
// GET /onboarding/{ref_id} → returns current_step
// Navigate to correct screen in OnboardingStack
```

---

#### Day 7 — Permissions Setup + Splash Screen + i18n Integration

**`SplashScreen.tsx`:**
```typescript
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

// 1. App mounts (native splash visible)
// 2. Redux hydration: check Keychain for token
// 3. Verify token validity (decode expiry locally)
// 4. Determine route: Onboarding | Login | Dashboard
// 5. Navigate programmatically
// 6. Call SplashScreen.hide() → transition to first screen
// Target: hide in < 1.5s
```

**Permission request flow:**
```typescript
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// During onboarding (walkthrough screen):
// Camera → request upfront (needed for QR scanner + document upload)
// Notifications → request upfront (needed for push alerts)

// Deferred until first use:
// Location → request before launching V-CIP
// Contacts → request before beneficiary add-from-contacts
```

**i18n translation keys structure (`src/assets/i18n/en.json`):**
```json
{
  "auth": {
    "login": "Login",
    "enter_mpin": "Enter your {{digits}}-digit MPIN",
    "invalid_mpin": "Incorrect MPIN. {{remaining}} attempts left",
    "account_locked": "Account locked until {{time}}"
  },
  "transfer": {
    "cooling_period": "This beneficiary can receive transfers in {{time}}",
    "insufficient_balance": "Insufficient balance. Available: ₹{{amount}}"
  }
}
```

---

### WEEK 2 — Dashboard, Accounts & Fund Transfer (Days 8–14)

#### Day 8 — Home Dashboard Screen

**`HomeScreen.tsx`:**
```typescript
// RTK Query: useGetDashboardSummaryQuery()
// While loading: show SkeletonLoader (account cards + quick action strip + transaction rows)
// Never show blank screen

// Account cards: FlatList with server-provided order (customer segment-driven)
// Quick actions: horizontal ScrollView with icon buttons
// Recent transactions: FlashList (last 5 rows)
// Pull-to-refresh: RTK Query refetch()

// LCP target: ≤ 2s on 4G — batched API call fetches everything in one round-trip

// Balance visibility toggle:
// Eye icon → mask balance as ••••••
// State in MMKV (persists across sessions)
```

**`SkeletonLoader` component:**
```typescript
// Use react-native-reanimated loop animation (shimmer effect)
// Match exact layout of real content (same heights, same spacing)
// Animated.loop with interpolation on opacity/backgroundColor
```

**Security Emergency FAB (render in `App.tsx`):**
```typescript
// CRITICAL: Mounted ABOVE NavigationContainer — always visible on every screen
// position: 'absolute', bottom: 24, right: 24, zIndex: 9999
// Red shield icon (Lucide or custom SVG)
// On tap: open Modal with shortcuts:
//   - Freeze Account
//   - Freeze UPI
//   - Panic Logout (all sessions)
// Test: visible during mid-payment flow, during keyboard open, during loading states
```

---

#### Day 9 — Accounts Module (Balances, Transactions, Passbook)

**`AccountsScreen.tsx`:**
```typescript
// List all linked accounts
// Each card: account number (masked), type, available balance, ledger balance
// Tap card → TransactionsScreen
// Balance toggle (show/hide)
```

**`TransactionsScreen.tsx`:**
```typescript
// FlashList with pagination (load more on scroll end)
// 300ms debounce on search TextInput
// DateTimePicker for date range filter (max 12 months)
// Filter chips: All / Debit / Credit / Pending
// Each row: TransactionRow component (icon, description, amount, date, status badge)
// onEndReached: fetch next page via RTK Query
```

**`StatementScreen.tsx`:**
```typescript
// Date range picker (max 12 months)
// Download PDF button:
//   1. GET /accounts/{id}/statement → streaming PDF response
//   2. react-native-blob-util downloads to app cache directory
//   3. Open with react-native-pdf viewer in-app
//   4. Show tooltip: "Your date of birth (DDMMYYYY) is the password"
// Email Statement button: POST /accounts/{id}/statement/email → success toast
```

---

#### Day 10 — Fund Transfer (Part 1: Beneficiary List + Add)

**`BeneficiaryListScreen.tsx`:**
```typescript
// FlashList, paginated (20/page), searchable by name + account number
// Tabs: All Beneficiaries | Favourites
// Each row: avatar initial, name, bank + account (masked), status badge
//   - COOLING: show countdown timer (cooling_expires_at from API)
//   - ACTIVE: green dot
// Swipe left on row → Delete / Favourite toggle
// FAB: Add New Beneficiary
```

**`AddBeneficiaryScreen.tsx`:**
```typescript
// Fields: Account Number, IFSC Code, Name
// IFSC lookup: auto-fetch bank name from public IFSC API on valid code entry
// Validation: account number 9-18 digits; IFSC regex [A-Z]{4}0[A-Z0-9]{6}
// Submit requires MPIN verification
// On success: navigate back to list; show "Cooling period active" banner
// Cooling countdown: pull expires_at from API response; render live countdown
```

---

#### Day 11 — Fund Transfer (Part 2: Amount, Review, Execute)

**`TransferAmountScreen.tsx`:**
```typescript
// AmountInput: INR formatted, 2 decimal places, max per-channel limit pre-validated
// Channel selector: NEFT / RTGS / IMPS (RTGS shows minimum ₹2,00,000 note)
// Show available balance below input
// Schedule toggle: use DatePicker for future date
// Remarks field (optional, 100 char limit)
```

**`TransferReviewScreen.tsx`:**
```typescript
// Show: From account, To beneficiary, Amount, Channel, Remarks, Estimated time
// MPIN entry (PinPad component)
// High-value transfer: OTP entry after MPIN
// Transfer button disabled until MPIN entered
// Generate UUID v4 idempotency key HERE (once per attempt)
// On submit: POST /transfer/initiate with Idempotency-Key header
// On 2FA_REQUIRED from server: show OTP screen mid-flow
```

**`TransferSuccessScreen.tsx`:**
```typescript
// Lottie animation (checkmark) or React Native Animated
// Show: Transaction Reference, Amount, Beneficiary, Status, Timestamp
// Buttons: Go to Dashboard, New Transfer, Download Receipt
// Back navigation should NOT allow going back to review screen (replace stack)
```

**Idempotency key management:**
```typescript
// src/utils/idempotencyKey.ts
import { v4 as uuidv4 } from 'uuid';

let currentKey: string | null = null;

export const IdempotencyKey = {
  get: () => {
    if (!currentKey) currentKey = uuidv4();
    return currentKey;
  },
  reset: () => { currentKey = null; },  // Call only on explicit user retry
};
// IMPORTANT: Do NOT reset on network error — same key must be used on auto-retry
// ONLY reset when user explicitly taps "Retry" after seeing a failure screen
```

---

#### Day 12 — Fixed Deposit Module

**`FDDashboardScreen.tsx`:**
```typescript
// Tabs: Active FDs | Matured | Closed
// FlashList of FD cards
// Each card: FD Number, Principal, Rate, Maturity Date, Interest Earned, Status
// FAB: Open New FD
```

**`OpenFDScreen.tsx`:**
```typescript
// Amount input + Tenure selector (1m / 3m / 6m / 12m / 24m / 36m / custom)
// Live interest rate: GET /fd/rates on mount (no cache — always fresh)
// Client-side maturity calculator: update instantly on amount/tenure change
//   maturity = principal * (1 + rate/100 * months/12)  [simple] or compound as per backend
// Show: Rate, Maturity Amount, Maturity Date
// Two-factor confirmation: MPIN → OTP → POST /fd/create
// Idempotency key required
```

**`FDDetailScreen.tsx`:**
```typescript
// Full FD details
// Premature closure flow:
//   1. Tap "Close FD Early"
//   2. GET /fd/{id}/closure-preview → show penalty amount in warning modal
//   3. User confirms → MPIN → POST /fd/{id}/close
```

---

#### Day 13 — Loan Module

**`LoanDashboardScreen.tsx`:**
```typescript
// Tabs: Home Loan | Personal Loan | Vehicle Loan
// Each tab: loan card with outstanding, EMI amount, next EMI date, interest rate
// Tap card → LoanDetailScreen
// Apply for Loan button
```

**`LoanDetailScreen.tsx`:**
```typescript
// Loan details + EMI schedule (amortization table)
// Paginated FlatList for schedule (24 rows/page)
// Columns: EMI #, Due Date, Principal, Interest, Balance
```

**`LoanApplicationScreen.tsx`:**
```typescript
// react-native-step-indicator (5 steps)
// Steps: Personal Info → Employment → Income → Documents → Review & Submit
// Each step: form validation before Next
// Document upload: react-native-document-picker (PDF) + react-native-image-picker
//   1. GET /upload/presign → S3 pre-signed URL
//   2. Upload file directly to S3 (PUT request, not through backend)
//   3. Save returned object_key for final submission

// Resume on app restart:
//   GET /loans/application/draft → returns current_step + draft_data
//   Navigate directly to correct step, pre-fill saved data
```

---

#### Day 14 — Bill Payment (BBPS)

**`BillPaymentScreen.tsx`:**
```typescript
// Category grid: Electricity, Water, Gas, Broadband, Insurance, Municipal Tax, etc.
// Category tap → BillerListScreen
```

**`BillerListScreen.tsx`:**
```typescript
// Search billers by name
// react-native-fast-image for biller logos (CDN cached)
// Paginated FlashList
```

**`BillDetailScreen.tsx`:**
```typescript
// Consumer number input
// POST /bbps/fetch-bill → show: bill amount, due date, period
// If overdue: show warning banner
// Pay button → ReviewPayment → MPIN → POST /bbps/pay → Confirmation
// Show CRN (BBPS reference number) on success
// Autopay: toggle to set up autopay mandate
```

---

### WEEK 3 — UPI, QR, Notifications, Support (Days 15–21)

#### Day 15 — UPI Module

**UPI NativeModule bridge (`src/modules/upi/UPIModule.ts`):**
```typescript
// Build bridge now with mock implementation
// Replace internals with real PSP SDK when confirmed by business
import { NativeModules } from 'react-native';

const { UPIBridge } = NativeModules;

export const UPIModule = {
  registerVPA: async (mobile: string, accountId: string): Promise<{ vpa: string }> => {
    if (Config.UPI_ENABLED !== 'true') throw new Error('UPI_NOT_ENABLED');
    return UPIBridge.registerVPA({ mobile, accountId });
  },
  pay: async (payload: UPIPayPayload): Promise<{ status: string; txnId: string }> => {
    return UPIBridge.pay(payload);
  },
};

// Mock implementation for dev (in MockUPIBridge.ts):
// Returns { status: 'SUCCESS', txnId: 'mock_txn_' + Date.now() } after 2s delay
```

**UPI screens:**
```typescript
// UPIHomeScreen: VPA display, QR code (react-native-qrcode-svg), recent UPI transactions
// UPIPayScreen: VPA / mobile / phone contact input → amount → MPIN → pay
// UPI feature flag: Remote Config check → hide entire UPI tab when UPI_ENABLED = false
// PENDING state: poll GET /upi/status/{txnId} every 10s, max 30 min → show spinner
```

---

#### Day 16 — QR Scanner

**`QRScannerScreen.tsx`:**
```typescript
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useBarcodeScanner } from 'vision-camera-code-scanner';

export default function QRScannerScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  const [torch, setTorch] = useState(false);
  const [scanned, setScanned] = useState(false);

  const frameProcessor = useBarcodeScanner((barcodes) => {
    if (scanned || !barcodes.length) return;
    setScanned(true);

    const payload = barcodes[0].displayValue;
    HapticFeedback.trigger('impactMedium');

    // Parse payload:
    if (payload?.startsWith('upi://pay')) {
      const parsed = parseUPIIntent(payload);
      navigation.replace('UPIPay', { prefilled: parsed });
    } else {
      // Show raw content in bottom sheet
      showBottomSheet(payload);
    }
  });

  return (
    <Camera
      device={device}
      isActive={!scanned}
      frameProcessor={frameProcessor}
      torch={torch ? 'on' : 'off'}
    />
    // Overlay: crosshair, torch toggle button, cancel button
  );
}
```

**UPI intent parser (`src/utils/deepLinkParser.ts`):**
```typescript
// Parse: upi://pay?pa=merchant@upi&pn=Merchant Name&am=100.00&cu=INR&tn=Payment
export function parseUPIIntent(uri: string) {
  const url = new URL(uri);
  return {
    vpa: url.searchParams.get('pa'),
    name: url.searchParams.get('pn'),
    amount: url.searchParams.get('am'),
    note: url.searchParams.get('tn'),
  };
}
```

Camera permission: pre-requested during onboarding → no dialog interrupts scan flow. Target: camera open ≤ 1s, decode ≤ 500ms.

---

#### Day 17 — Notifications Center

**`NotificationsScreen.tsx`:**
```typescript
// FlashList, paginated (30/page), 90-day retention
// Each row: icon by type (DEBIT_ALERT, FD_MATURITY, EMI_REMINDER, SECURITY_ALERT)
// Unread: bold title + colored left border
// Tap: deep-link to relevant screen + mark as read
// Swipe left: delete single notification
// Header: "Mark all as read" button
// Empty state: "No notifications yet" with illustration
```

**FCM push setup (`src/features/notifications/pushSetup.ts`):**
```typescript
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';

// Background + quit-state handler (call in index.js, before App renders):
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // DO NOT show notification here — notifee handles display
  // Log to analytics only
});

// Foreground handler (in App.tsx useEffect):
messaging().onMessage(async (remoteMessage) => {
  const { type, ref_id, title, body } = remoteMessage.data!;
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'banking_alerts',
      importance: AndroidImportance.HIGH,
    },
  });
});

// On notification tap (deep link):
messaging().onNotificationOpenedApp((remoteMessage) => {
  const deepLink = remoteMessage.data?.deep_link;
  if (deepLink) navigateFromDeepLink(deepLink);
});

// Create Android notification channels:
await notifee.createChannel({ id: 'banking_alerts', name: 'Banking Alerts', importance: AndroidImportance.HIGH });
await notifee.createChannel({ id: 'reminders', name: 'Reminders', importance: AndroidImportance.DEFAULT });
```

---

#### Day 18 — Customer Support (Chat + Tickets)

**`SupportHomeScreen.tsx`:**
```typescript
// Options: Live Chat | Raise Ticket | Call Us | FAQ
// Active tickets summary at top
```

**`LiveChatScreen.tsx`:**
```typescript
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// WebSocket connection with exponential backoff reconnect:
const client = new Client({
  webSocketFactory: () => new SockJS(Config.WS_URL + '/chat'),
  reconnectDelay: 1000,          // Start at 1s
  heartbeatIncoming: 10000,
  heartbeatOutgoing: 10000,
  onConnect: () => {
    client.subscribe(`/topic/chat/${customerId}`, (message) => {
      addMessage(JSON.parse(message.body));
    });
  },
});
// Reconnect backoff: 1s → 2s → 4s → 8s → 16s → 30s max
// If WS fails after 3 attempts: switch to long-poll fallback
```

**`RaiseTicketScreen.tsx`:**
```typescript
// Category picker: Transaction Dispute / Account Issue / Card Issue / Other
// Subject + Description fields
// POST /support/ticket → show ticket_id immediately in success screen
// "Your ticket ID is TICK20260622001 — save this for reference"
```

**Click-to-call:**
```typescript
import { Linking } from 'react-native';
// Append IVR code based on last known context
const ivrCode = lastTransaction ? `,,1` : `,,0`;
Linking.openURL(`tel:+918800000000${ivrCode}`);
```

---

#### Day 19 — Security Center

**`SecurityCenterScreen.tsx`:**
```typescript
// Sections:
// 1. Freeze Controls (independent toggles for Account / UPI / Internet Banking)
// 2. Device Management (list of trusted devices)
// 3. Active Sessions (masked IP, device, last activity)
// 4. Change MPIN
// 5. Change Password
// 6. Panic Logout (all devices)
```

**Freeze controls:**
```typescript
// Each toggle: Switch component with confirmation BottomSheet before action
// "Are you sure you want to freeze UPI payments? This will prevent all UPI transactions."
// Confirm → MPIN entry → POST /security/freeze
// On success: SMS + email sent by backend (show "We've sent you a confirmation" toast)
// Independent states: freezing account does NOT freeze UPI (separate CBS targets)
```

**Device list:**
```typescript
// GET /security/devices
// Each row: device name, platform (Android/iOS icon), app version, last active
// Current device: highlighted with "This device" badge
// Other devices: "Remove" button → POST /security/logout-other-devices
```

**Panic logout:**
```typescript
// PROMINENT red button: "Emergency: Log out all devices"
// Double-confirmation: "This will immediately log you out of ALL devices. Are you sure?"
// POST /security/panic-logout
// On success: clear Keychain + MMKV + Redux state → navigate to Login screen
// Show: "You have been securely logged out of all devices. Please login again."
```

---

#### Day 20 — Profile, KYC Center, Nominees

**`ProfileScreen.tsx`:**
```typescript
// Customer photo placeholder (initials avatar)
// Fields (read-only): Name, Customer ID, Mobile, Email, Segment, RM Name
// Edit requests: tap field → "Raise Service Request" bottom sheet
// Language preference: picker → instant switch (no restart)
// Dark mode toggle
```

**`KYCCenterScreen.tsx`:**
```typescript
// KYC status banner (VERIFIED / PENDING / EXPIRED)
// Options: Update Aadhaar, Update PAN, Video Re-KYC
// Re-KYC trigger: if backend sends re-kyc_due flag → show prominent banner on all screens
```

**`NomineeManagementScreen.tsx`:**
```typescript
// List nominees per account (max 3 per account)
// Show allocation % per nominee (must total 100%)
// Add nominee: form with Name, Relationship, DOB, Allocation %
//   - Client-side validate: sum of existing + new = 100
//   - Server validates too (final authority)
//   - Requires MPIN + OTP → POST /nominees
// Edit / Delete: requires MPIN + OTP
```

---

#### Day 21 — Dispute Management + App Settings

**`DisputeManagementScreen.tsx`:**
```typescript
// List existing disputes with status
// Raise New Dispute: linked from TransactionRow "Report" button
// DisputeFormScreen:
//   - Auto-populated: transaction details, amount, date
//   - Reason picker: Unauthorized Transaction / Amount Mismatch / Not Received / Other
//   - Evidence upload: max 5 files, 5MB each
//     1. GET /upload/presign → S3 URL
//     2. PUT file directly to S3
//     3. Store object_keys for form submission
//   - POST /disputes → show dispute_id + expected_resolution_date
```

**`AppSettingsScreen.tsx`:**
```typescript
// Dark Mode: Switch (system default + manual override)
// Language: Picker (English, Hindi, regional)
// Notification Preferences:
//   - Transaction Alerts: CANNOT be disabled (greyed toggle with tooltip)
//   - Security Alerts: CANNOT be disabled
//   - Marketing: can toggle
//   - FD Reminders: can toggle
//   - EMI Reminders: can toggle
// Biometric Login: toggle (enable/disable)
// Change MPIN shortcut
// Privacy Policy / Terms of Service (WebView)
// App Version
// Logout
```

---

### WEEK 4 — Testing, Polish & Deployment (Days 22–30)

#### Day 22 — Unit Tests (Jest + RNTL)

```typescript
// Test coverage targets: ≥ 80% for slices, utils, API transforms

// authSlice.test.ts
test('sets authenticated state on loginSuccess', () => {});
test('clears all state on logout', () => {});
test('sets requires2FA on 2FA_REQUIRED response', () => {});

// cryptoHelpers.test.ts
test('MPIN hash is deterministic for same inputs', () => {});
test('different device IDs produce different hashes', () => {});

// formatCurrency.test.ts
test('formats 1234567 as ₹12,34,567.00', () => {});
test('masks balance when hidden flag is true', () => {});

// deepLinkParser.test.ts
test('parses UPI intent with all parameters', () => {});
test('handles missing optional amount parameter', () => {});

// idempotencyKey.test.ts
test('returns same key on repeated get() calls', () => {});
test('returns new key after reset()', () => {});

// Component tests (RNTL):
// PinPad: renders 10 digit buttons, calls onChange on digit press
// OTPInput: auto-advances to next cell, calls onComplete when all 6 filled
// TransactionRow: renders debit with red amount, credit with green amount
// SkeletonLoader: renders correct number of skeleton rows
```

---

#### Day 23 — Integration Tests (RTK Query + MSW)

```typescript
// Use msw (Mock Service Worker) to intercept network calls in tests

// handlers.ts:
import { rest } from 'msw';
export const handlers = [
  rest.get('/api/v1/dashboard/summary', (req, res, ctx) =>
    res(ctx.json({ accounts: [], quick_actions: [], recent_transactions: [] }))
  ),
  rest.post('/api/v1/transfer/initiate', (req, res, ctx) =>
    res(ctx.json({ txn_reference: 'TXN123', status: 'SUCCESS', amount: 1000 }))
  ),
  // 401 scenario: test that refresh is triggered
  // 423 scenario: test lockout UI is shown
  // Idempotency: same key → same response
];

// Test: Dashboard loads with skeleton then real data
// Test: Transfer with 401 → triggers refresh → retries → succeeds
// Test: Cooling period beneficiary shows countdown, blocks transfer
// Test: OTP max attempts shows error and disables resend
```

---

#### Day 24 — E2E Tests (Detox)

```javascript
// e2e/auth.e2e.js
describe('Authentication', () => {
  it('logs in with MPIN', async () => {
    await element(by.id('mpin-tab')).tap();
    await element(by.id('pin-1')).tap();
    // ... enter MPIN
    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('shows lockout after 3 failed MPIN attempts', async () => {
    // 3 wrong MPINs
    await expect(element(by.id('lockout-timer'))).toBeVisible();
  });
});

// e2e/transfer.e2e.js
describe('Fund Transfer', () => {
  it('completes full transfer flow', async () => {
    await element(by.id('quick-action-send')).tap();
    await element(by.id('beneficiary-active-row-0')).tap();
    await element(by.id('amount-input')).typeText('5000');
    await element(by.id('next-btn')).tap();
    // MPIN entry
    await element(by.id('transfer-success-screen')).toBeVisible();
  });

  it('shows cooling countdown for new beneficiary', async () => {
    await expect(element(by.id('cooling-countdown'))).toBeVisible();
    await expect(element(by.id('transfer-btn'))).toBeDisabled();
  });
});

// Critical E2E flows to cover:
// ✓ Onboarding: Language → Walkthrough → OTP → PAN → Aadhaar → Account created
// ✓ MPIN login → Dashboard loads
// ✓ Biometric login → Dashboard loads
// ✓ Full transfer: select beneficiary → amount → MPIN → success
// ✓ Open FD: amount + tenure → MPIN + OTP → FD in list
// ✓ Pay bill: biller → consumer no → fetch → pay → CRN shown
// ✓ Panic logout: FAB → Emergency → Panic → redirected to Login
// ✓ QR scan: scan UPI QR → UPI pay screen pre-filled
// ✓ Dark mode toggle: theme applied without restart
// ✓ Language switch: all text changes without restart
// ✓ Security FAB: visible on every screen including mid-payment
```

---

#### Day 25 — Performance Optimisation

**JS bundle size (target < 10 MB):**
```typescript
// metro.config.js
module.exports = {
  transformer: {
    minifierConfig: { compress: { reduce_funcs: false } },
  },
};

// Enable Hermes in android/app/build.gradle:
// project.ext.react = [ enableHermes: true ]

// Enable inline requires in babel.config.js:
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [['@babel/plugin-transform-modules-commonjs', { lazy: true }]],
};
```

**List performance:**
```typescript
// Replace ALL FlatList with FlashList for:
// - Transactions list
// - Beneficiaries list
// - Notifications list
// - FD list
// Set estimatedItemSize accurately for each list
```

**Image optimization:**
```typescript
// All network images → react-native-fast-image (CDN cached, prioritized)
// Bundle images → optimised PNG/WebP (run through imageoptim before bundling)
// No SVG in lists — convert to PNG for performance
```

**Dashboard LCP verification:**
```bash
# Verify with Flipper (dev) → Performance → JS FPS, UI FPS
# Confirm batched API response arrives within 2s on 4G emulation
```

---

#### Day 26 — Security Hardening & Final Checklist

**Security checklist:**
- [ ] All secrets in Keychain (never MMKV, never AsyncStorage)
- [ ] MMKV: encryption key loaded from Keychain at app init
- [ ] Screenshot prevention: FLAG_SECURE (Android) active on all financial screens
- [ ] No PII/tokens in any console.log or crash report (use masked references)
- [ ] Certificate pinning: configured in OkHttp (Android) + URLSession (iOS)
- [ ] Root/jailbreak: react-native-device-info heuristics → degraded view-only mode
- [ ] No sensitive data in push notification payloads (only type + ref_id)
- [ ] Biometric private key: Android StrongBox / iOS Secure Enclave confirmed
- [ ] MPIN: PBKDF2 hash client-side; bcrypt server-side; raw MPIN never logged
- [ ] Inactivity auto-logout: tested at 5 min on device
- [ ] Emergency FAB: tested visible on every screen + keyboard-open states

---

#### Day 27 — Android Build & Play Store Prep

```bash
# Generate release keystore (do once, store securely in AWS Secrets Manager):
keytool -genkeypair -v -storetype PKCS12 -keystore swabhiman-release.keystore \
  -alias swabhiman -keyalg RSA -keysize 2048 -validity 10000

# Configure android/app/build.gradle:
signingConfigs {
  release {
    storeFile file(MYAPP_UPLOAD_STORE_FILE)
    storePassword MYAPP_UPLOAD_STORE_PASSWORD
    keyAlias MYAPP_UPLOAD_KEY_ALIAS
    keyPassword MYAPP_UPLOAD_KEY_PASSWORD
  }
}

# Build release APK / AAB:
cd android
./gradlew bundleRelease     # Preferred: AAB for Play Store
./gradlew assembleRelease   # APK for direct distribution/testing
```

**Play Store checklist:**
- [ ] App ID: `in.swabhimannidhi.app`
- [ ] Version name + version code incremented
- [ ] Privacy policy URL ready
- [ ] Data safety form filled (declare: financial data, device ID, camera usage)
- [ ] Content rating questionnaire completed
- [ ] Screenshots for all required phone sizes

---

#### Day 28 — iOS Build & App Store Prep

```bash
# Fastlane Match for certificate management:
fastlane match appstore

# Build:
cd ios
fastlane gym --scheme SwabhimanApp --configuration Release

# Or via Xcode:
# Product → Archive → Distribute App → App Store Connect
```

**App Store checklist:**
- [ ] Bundle ID: `in.swabhimannidhi.app`
- [ ] App Store Connect app record created
- [ ] Provisioning profiles: Distribution certificate installed
- [ ] Usage descriptions in Info.plist:
  - NSCameraUsageDescription: "Required for QR scanning and document upload"
  - NSFaceIDUsageDescription: "Used for biometric login"
  - NSLocationWhenInUseUsageDescription: "Required for Video KYC verification"
- [ ] App Privacy questionnaire filled (Financial data, Device ID, Camera)
- [ ] TestFlight build uploaded for internal testing

---

#### Day 29 — Staging QA + Bug Fix

- Full regression on staging environment (connected to staging APIs)
- Test all 21 modules with real API responses (not mocks)
- Verify: dark mode, language switch, push notifications (send test push)
- Device matrix: test on Android 12, 13 + iPhone 13, 14
- Fix all P0/P1 bugs found

---

#### Day 30 — Production Submission & Go-Live

**Final go-live checklist:**
- [ ] Play Store: Production release submitted (or phased rollout 10%)
- [ ] App Store: Binary submitted, passed review
- [ ] Firebase Crashlytics: confirmed receiving events from production build
- [ ] Push notifications: production FCM config active
- [ ] Sentry / Crashlytics crash-free rate baseline: target ≥ 99.9%
- [ ] Emergency FAB: tested on production build on physical device
- [ ] Rollback plan: previous app version AAB/IPA kept ready

---

## Complete Dependency Reference

```json
{
  "dependencies": {
    "react-native": "0.74.x",
    "@reduxjs/toolkit": "^2.x",
    "react-redux": "^9.x",
    "@react-navigation/native": "^7.x",
    "@react-navigation/native-stack": "^7.x",
    "@react-navigation/bottom-tabs": "^7.x",
    "react-native-screens": "^3.x",
    "react-native-safe-area-context": "^4.x",
    "react-native-keychain": "^8.x",
    "react-native-mmkv": "^2.x",
    "react-native-biometrics": "^3.x",
    "react-native-vision-camera": "^4.x",
    "@react-native-firebase/app": "^20.x",
    "@react-native-firebase/messaging": "^20.x",
    "@notifee/react-native": "^9.x",
    "react-native-pdf": "^6.x",
    "react-native-blob-util": "^0.19.x",
    "react-native-device-info": "^11.x",
    "react-native-permissions": "^4.x",
    "react-native-flash-list": "^1.x",
    "react-native-fast-image": "^8.x",
    "react-native-splash-screen": "^3.x",
    "react-native-haptic-feedback": "^2.x",
    "react-i18next": "^14.x",
    "i18next": "^23.x",
    "axios": "^1.x",
    "uuid": "^9.x",
    "@stomp/stompjs": "^7.x",
    "sockjs-client": "^1.x",
    "react-native-qrcode-svg": "^6.x",
    "react-native-svg": "^15.x",
    "react-native-date-picker": "^4.x",
    "react-native-config": "^1.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "jest": "^29.x",
    "@testing-library/react-native": "^12.x",
    "detox": "^20.x",
    "msw": "^2.x",
    "@types/react-native": "^0.74.x"
  }
}
```

---

## Navigation Map (Complete)

```
RootNavigator (NativeStack)
  ├── Splash
  ├── OnboardingStack (NativeStack)
  │   ├── LanguageSelect
  │   ├── Walkthrough
  │   ├── MobileVerify
  │   ├── OTP (purpose: ONBOARDING)
  │   ├── PANVerify
  │   ├── AadhaarVerify
  │   ├── AadhaarOTP
  │   └── VideoKYC
  ├── AuthStack (NativeStack)
  │   ├── Login
  │   ├── OTP (purpose: LOGIN)
  │   ├── MPIN
  │   ├── Biometric
  │   └── SetMPIN
  └── MainTabNavigator (BottomTabs)
      ├── Home Tab → HomeStack
      │   └── HomeScreen
      ├── Payments Tab → PaymentsStack
      │   ├── TransferHome
      │   ├── BeneficiaryList
      │   ├── AddBeneficiary
      │   ├── TransferAmount
      │   ├── TransferReview
      │   ├── TransferSuccess
      │   ├── BillPayment
      │   ├── BillerList
      │   ├── BillDetail
      │   ├── UPIHome
      │   └── UPIPay
      ├── Scan Tab → QRScanner (modal)
      ├── Accounts Tab → AccountsStack
      │   ├── AccountsList
      │   ├── Transactions
      │   ├── Statement
      │   ├── Passbook
      │   ├── FDDashboard
      │   ├── FDDetail
      │   ├── OpenFD
      │   ├── LoanDashboard
      │   ├── LoanDetail
      │   └── LoanApplication
      └── Profile Tab → ProfileStack
          ├── Profile
          ├── SecurityCenter
          ├── KYCCenter
          ├── NomineeManagement
          ├── DisputeManagement
          ├── DisputeForm
          ├── CustomerSupport
          ├── LiveChat
          ├── RaiseTicket
          ├── Notifications
          └── AppSettings

[Security Emergency FAB — mounted in App.tsx, above NavigationContainer, zIndex 9999]
```

---

*Frontend Build Plan — Swabhiman Pawan Nidhi | 30 Days | React Native CLI + TypeScript*
*Version 1.0 | June 22, 2026 | Confidential*
