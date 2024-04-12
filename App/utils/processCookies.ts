import {getCookie} from '../utils/functionString';
import {updateAccessToken} from '../utils/cmpStoreManager';
import {getIsConnected, getToken} from '../utils/getUserInformations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const processCookies = event => {
    let cookie = event?.nativeEvent?.data;
    if (cookie.includes('atPrivacy')) {
      const atPrivacy = getCookie(cookie, 'atPrivacy');
      updateAccessToken(atPrivacy); 
    } 
    if (!getIsConnected() && cookie.includes('refresh-token') && cookie.includes('access-token')) {
      storeConnectionData(getCookie(cookie, 'refresh-token'), getCookie(cookie, 'access-token'));
    } else if (getIsConnected() && !cookie.includes('refresh-token')) {
      removeConnectionData();
    }
  };

  const storeConnectionData = async (refreshToken: string, accessToken: string) => {
    try {
      await AsyncStorage.setItem('refreshToken', refreshToken);
      await AsyncStorage.setItem('accessToken', accessToken);
      globalThis.refreshToken = refreshToken;
      globalThis.accessToken = accessToken;
    } catch (e) {
      // saving error
    }
  };

  const removeConnectionData = () => {
    AsyncStorage.removeItem('refreshToken');
    AsyncStorage.removeItem('accessToken');
    globalThis.refreshToken = null;
    globalThis.token = null;
  };