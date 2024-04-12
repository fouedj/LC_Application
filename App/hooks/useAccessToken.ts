import {Platform} from 'react-native';
import {refreshTokenApi} from '../api';
import * as Sentry from '@sentry/react-native';

export const getAccessTokenApi = async (body: any, callback: any) => {
  const {refreshToken} = body;

  const devicePlatform = Platform.OS === 'android' ? 'android' : 'ios';
  try {
    refreshTokenApi.interceptors.request.use((req: any) => {
      return req;
    });
    await refreshTokenApi
      .post(
        'authenticate/user',
        {refreshToken: refreshToken},
        {
          headers: {
            Accept: '*/*',
            'x-client-source': `classified:${devicePlatform}:lcpab`,
          },
        },
      )
      .then(response => {
        if (callback) {
          callback(response);
        }
      })
      .catch(error => {
        Sentry.captureException(error);
        callback(error);
      });
  } catch (err) {
    Sentry.captureException(err);
    callback(err);
  }
};
