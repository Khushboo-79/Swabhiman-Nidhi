import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  customerId: string | null;
  isAuthenticated: boolean;
  deviceId: string | null;
  sessionId: string | null;
  requires2FA: boolean;
}

const initialState: AuthState = {
  customerId: null,
  isAuthenticated: false,
  deviceId: null,
  sessionId: null,
  requires2FA: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.customerId = null;
      state.isAuthenticated = false;
      state.sessionId = null;
      state.requires2FA = false;
    },
    loginSuccess: (state, action: PayloadAction<{ customerId: string; sessionId: string; requires2FA?: boolean }>) => {
      state.customerId = action.payload.customerId;
      state.sessionId = action.payload.sessionId;
      state.isAuthenticated = true;
      state.requires2FA = action.payload.requires2FA || false;
    },
    setDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
  },
});

export const { logout, loginSuccess, setDeviceId } = authSlice.actions;
export default authSlice.reducer;
