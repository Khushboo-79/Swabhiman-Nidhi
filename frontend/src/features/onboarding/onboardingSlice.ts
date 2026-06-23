import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingState {
  currentStep: number;
  refId: string | null;
  isCompleted: boolean;
}

const initialState: OnboardingState = {
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
    setRefId: (state, action: PayloadAction<string>) => {
      state.refId = action.payload;
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
    },
  },
});

export const { nextStep, setRefId, completeOnboarding } = onboardingSlice.actions;
export default onboardingSlice.reducer;
