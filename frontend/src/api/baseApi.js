import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as Keychain from 'react-native-keychain';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: Config.API_BASE_URL || 'http://localhost:8080/api/v1',
  prepareHeaders: async (headers) => {
    try {
      const creds = await Keychain.getGenericPassword({
        service: 'access_token',
      });
      if (creds) {
        headers.set('Authorization', `Bearer ${creds.password}`);
      }
      const deviceId = await DeviceInfo.getUniqueId();
      headers.set('X-Device-ID', deviceId);
    } catch (e) {
      console.warn('Error preparing headers:', e);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try to get a new token
    try {
      const refreshCreds = await Keychain.getGenericPassword({
        service: 'refresh_token',
      });
      if (refreshCreds) {
        const refreshResult = await rawBaseQuery(
          {
            url: '/auth/refresh',
            method: 'POST',
            body: { refresh_token: refreshCreds.password },
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const { access_token, refresh_token } = refreshResult.data;
          // Store the new tokens
          await Keychain.setGenericPassword('token', access_token, {
            service: 'access_token',
          });
          if (refresh_token) {
            await Keychain.setGenericPassword('token', refresh_token, {
              service: 'refresh_token',
            });
          }
          // Retry the initial query
          result = await rawBaseQuery(args, api, extraOptions);
        } else {
          // Refresh failed
          api.dispatch({ type: 'auth/logout' });
        }
      } else {
        api.dispatch({ type: 'auth/logout' });
      }
    } catch (e) {
      console.error('Refresh token process failed:', e);
      api.dispatch({ type: 'auth/logout' });
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Account',
    'FD',
    'Loan',
    'Beneficiary',
    'Notification',
    'Nominee',
    'Dispute',
  ],
  endpoints: () => ({}),
});
