import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

export const useInactivityTimer = () => {
  const dispatch = useDispatch();
  const timerId = useRef(null);
  const appState = useRef(AppState.currentState);

  const resetTimer = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      dispatch(logout());
    }, INACTIVITY_LIMIT_MS);
  };

  useEffect(() => {
    resetTimer(); // Start timer initially

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to the foreground!
        resetTimer();
      }
      appState.current = nextAppState;
    });

    return () => {
      if (timerId.current) clearTimeout(timerId.current);
      subscription.remove();
    };
  }, []);

  return { resetTimer };
};
