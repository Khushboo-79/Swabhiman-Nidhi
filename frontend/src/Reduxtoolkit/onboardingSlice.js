import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 0,
  refId: null,
  isCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    setRefId: (state, action) => {
      state.refId = action.payload;
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
    },
  },
});

export const { nextStep, setRefId, completeOnboarding } =
  onboardingSlice.actions;
export default onboardingSlice.reducer;
