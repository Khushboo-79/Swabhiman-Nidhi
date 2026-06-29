import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    loginSuccess: (state, action) => {
      state.customerId = action.payload.customerId;
      state.sessionId = action.payload.sessionId;
      state.isAuthenticated = true;
      state.requires2FA = action.payload.requires2FA || false;
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
});

export const { logout, loginSuccess, setDeviceId } = authSlice.actions;
export default authSlice.reducer;
